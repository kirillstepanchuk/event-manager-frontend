import React, {
  useCallback, useEffect, VFC, useState,
} from 'react';
import io from 'socket.io-client';
import {
  Button, Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import { createStyles, makeStyles } from '@mui/styles';

import Header from '../../components/common/Header';
import Container from '../../components/common/Container';
import { selectUserState } from '../../store/selectors/selectors';
import { UNDEFINED_ERROR } from '../../constants';
import InputWrapper from '../../components/common/InputWrapper';

const socket = io(process.env.API_URL as string);

const useStyles = makeStyles((theme: Theme) => createStyles({
  ownMessage: {
    textAlign: 'end',
  },
  otherMessage: {
    textAlign: 'start',
  },
}));

enum InputFieldNames {
  CURRENT_MESSAGE = 'currentMessage',
}

interface FormData {
  [InputFieldNames.CURRENT_MESSAGE]: string
}

interface Message {
  date: string
  text: string
  userId: number
}

const EventConversation: VFC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const { eventId } = useParams<{ eventId: string }>();
  const classes = useStyles();
  const userReducer = useSelector(selectUserState);
  const {
    handleSubmit, control, reset, watch,
  } = useForm({
    defaultValues: {
      [InputFieldNames.CURRENT_MESSAGE]: '',
    },
  });

  useEffect(() => {
    if (eventId && userReducer.data) {
      socket.emit('join_chat', {
        id: eventId,
        role: userReducer.data?.role,
      });
    }
  }, [eventId, userReducer.data]);

  const sendMessage = useCallback((formData: FormData) => {
    if (userReducer.data) {
      const newMessage = {
        date: `${new Date().getHours()}:${(new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()}`,
        text: formData[InputFieldNames.CURRENT_MESSAGE],
        userId: userReducer.data.userId,
      };
      socket.emit('send_message', {
        ...newMessage,
        room: eventId,
        userRole: userReducer.data.role,
      });
      setMessages((list: Message[]) => [...list, newMessage]);
    }
    reset();
  }, [userReducer.data]);

  useEffect(() => {
    socket.on('receive_message', (data: Message) => {
      setMessages((list: Message[]) => [...list, data]);
    });
  }, [socket]);

  const currentMessage = watch(InputFieldNames.CURRENT_MESSAGE);

  if (userReducer.loading) {
    return (
      <Grid>
        <Header />
        <Container>
          <LinearProgress />
        </Container>
      </Grid>
    );
  }

  if (userReducer.error) {
    return (
      <Grid>
        <Header />
        <Container>
          <Grid textAlign="center">
            <Typography variant="h5">
              {userReducer.error === UNDEFINED_ERROR ? t('request.error.undefinedError') : userReducer.error}
            </Typography>
          </Grid>
        </Container>
      </Grid>
    );
  }

  return (
    <Grid>
      <Header />
      <Container>
        <Typography variant="h5">
          Event conversation
        </Typography>
        <Grid container justifyContent="center">
          <Grid item lg={5.5} md={7} sm={9} xs={11}>
            <Grid container direction="column">
              {messages.map((message: Message) => (
                <Grid
                  item
                  xs={6}
                  className={
                    message.userId === userReducer.data?.userId
                      ? classes.ownMessage : classes.otherMessage
                  }
                >
                  <Typography variant="subtitle1" key={message.date}>{message.text}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid component="form" container onSubmit={handleSubmit(sendMessage)} justifyContent="center" alignItems="center">
          <Grid item lg={5} md={6} sm={8} xs={9}>
            <InputWrapper
              name={InputFieldNames.CURRENT_MESSAGE}
              control={control}
              placeholder="Send a message..."
              fullWidth
            />
          </Grid>
          <Button
            type="submit"
            disabled={!currentMessage}
          >
            <SendIcon />
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

export default EventConversation;
