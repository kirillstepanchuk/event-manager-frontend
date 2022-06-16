import {
  Alert,
  Button,
  CircularProgress,
  Grid, IconButton, MenuItem, Snackbar, TextField, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ClientsFormValues, Client } from '../../types/user';
import InputWrapper from '../../components/common/InputWrapper';
import importNewClients from '../../store/actions/sendRequest/importNewClients';
import { selectApiState } from '../../store/selectors/selectors';
import closeAlert from '../../store/actions/sendRequest/closeAlert';

const useStyles = makeStyles((theme: Theme) => createStyles({
  previewInput: {
    display: 'none',
  },
  previewButton: {
    textTransform: 'initial',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  clientInfo: {
    marginBottom: theme.spacing(5),
  },
}));

export default function App() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();
  const [array, setArray] = useState<Client[]>([]);
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(selectApiState);

  const fileReader = new FileReader();

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.currentTarget.files as FileList;
    setFile(files[0]);
  };

  const csvFileToArray = (CSVFile: string) => {
    const csvHeader = CSVFile.slice(0, CSVFile.indexOf('\n')).split(',');
    const csvRows = CSVFile.slice(CSVFile.indexOf('\n') + 1).split('\n');

    const clientList: Client[] = csvRows.filter((row) => row !== '').map((row) => {
      const values = row.split(',');
      const emptyClient = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        role: '',
      };
      const obj: Client = csvHeader.reduce((object, header, index) => {
        const head = header.replace(/(\r\n|\n|\r)/gm, '');
        object[head as keyof Client] = values[index].replace(/(\r\n|\n|\r)/gm, '');
        return object;
      }, emptyClient);
      return obj;
    });

    setArray(clientList);
  };

  const {
    register,
    control,
    handleSubmit,
  } = useForm<ClientsFormValues>({
    defaultValues: {
      clients: array,
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'clients',
    control,
  });

  const handleOnImport = () => {
    if (file) {
      fileReader.onload = (event) => {
        const text = event?.target?.result as string;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const onSubmit = useCallback((formData: ClientsFormValues) => {
    dispatch(importNewClients(formData));
  }, []);

  useEffect(() => {
    array.forEach((item) => {
      append(item);
    });
  }, [array]);

  const closeApiAlert = useCallback(() => {
    dispatch(closeAlert());
  }, []);

  return (
    <Grid>
      <Grid component="form">
        <Grid container direction="column">
          <Grid>
            <input
              accept=".csv"
              id="preview-button"
              name="preview-image"
              type="file"
              className={classes.previewInput}
              onChange={handleOnChange}
            />
            <Button
              type="button"
              variant="contained"
              className={classes.previewButton}
              fullWidth={false}
            >
              <label htmlFor="preview-button">
                {t('importClients.button.importFile')}
              </label>
            </Button>
          </Grid>

          <Grid>
            <Button
              type="button"
              variant="outlined"
              onClick={handleOnImport}
              fullWidth={false}
            >
              {t('importClients.button.showFileContent')}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {fields.map((field, index) => (
            <Grid item lg={3} md={6} sm={9} xs={12}>
              <Grid item xs={11}>
                <Grid container direction="column" component="section" key={field.id} className={classes.clientInfo}>
                  <Typography variant="h5">
                    {`Client info №${index + 1}`}
                  </Typography>
                  <InputWrapper
                    fullWidth
                    label={t('signup.input.firstName')}
                    {...register(`clients.${index}.firstName` as const, {
                      required: true,
                    })}
                    defaultValue={field.firstName}
                    variant="outlined"
                    control={control}
                    margin="normal"
                  />
                  <InputWrapper
                    fullWidth
                    label={t('signup.input.lastName')}
                    {...register(`clients.${index}.lastName` as const, {
                      required: true,
                    })}
                    defaultValue={field.lastName}
                    variant="outlined"
                    control={control}
                    margin="normal"
                  />
                  <InputWrapper
                    fullWidth
                    label={t('signup.login.emailForResetPage.input.email')}
                    {...register(`clients.${index}.email` as const, {
                      required: true,
                    })}
                    defaultValue={field.email}
                    variant="outlined"
                    control={control}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    select
                    defaultValue={field.role}
                    label={t('editClient.label.role')}
                    {...register(`clients.${index}.role` as const, {
                      required: true,
                    })}
                  >
                    <MenuItem value="admin">{t('editClient.select.admin')}</MenuItem>
                    <MenuItem value="super-admin">{t('editClient.select.superAdmin')}</MenuItem>
                    <MenuItem value="customer">{t('editClient.select.customer')}</MenuItem>
                  </TextField>
                  <InputWrapper
                    fullWidth
                    label={t('signup.login.resetPassword.input.password')}
                    {...register(`clients.${index}.password` as const, {
                      required: true,
                    })}
                    defaultValue={field.password}
                    variant="outlined"
                    control={control}
                    margin="normal"
                  />
                  <IconButton aria-label="delete" onClick={() => remove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>

            </Grid>
          ))}
        </Grid>

        <Grid>
          {loading ? (
            <Grid container direction="column" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
            <Grid container direction="column" alignItems="center">
              <Grid>
                <Button
                  type="button"
                  onClick={() => append({
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: '',
                    password: '',
                  })}
                >
                  {t('importClients.button.appendClient')}
                </Button>
              </Grid>
              <Grid>
                <Button
                  type="submit"
                >
                  {t('importClients.button.submit')}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!data}
        autoHideDuration={6000}
        onClose={closeApiAlert}
      >
        <Alert severity="success" onClose={closeApiAlert}>
          {data}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!error}
        autoHideDuration={6000}
        onClose={closeApiAlert}
      >
        <Alert severity="error" onClose={closeApiAlert}>
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
