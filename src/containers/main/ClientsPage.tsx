import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Theme, Typography,
} from '@mui/material';
import React, {
  ChangeEvent, useCallback, useEffect, useState, VFC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

import Header from '../../components/common/Header';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import loadClients from '../../store/actions/loadClientsData/loadClientsData';
import UserCard from '../../components/common/UserCard';
import Container from '../../components/common/Container';
import { selectClientsState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  controlsGrid: {
    marginBottom: theme.spacing(5),
  },
  searchGrid: {
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  linkGrid: {
    marginBottom: theme.spacing(3),
  },
  controlLink: {
    textDecoration: 'none',
  },
}));

const ClientsPage: VFC = () => {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState('super-admin');
  const [blocked, setBlocked] = useState('0');
  const [title, setTitle] = useState('');
  const { t } = useTranslation();
  const classes = useStyles();

  const { data, error, loading } = useSelector(selectClientsState);
  const dispatch = useDispatch();

  const onTitleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value as string);
  }, []);

  const onPageChange = useCallback((evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const onRoleSelectChange = useCallback((evt: SelectChangeEvent) => {
    setRole(evt.target.value as string);
    setPage(1);
  }, []);

  const onStatusSelectChange = useCallback((evt: SelectChangeEvent) => {
    setBlocked(evt.target.value as string);
    setPage(1);
  }, []);

  const onSearchClick = useCallback(() => {
    dispatch(loadClients(page, role, blocked, title));
  }, [title]);

  useEffect(() => {
    dispatch(loadClients(page, role, blocked, title));
  }, [page, role, blocked]);

  if (loading) {
    return (
      <Grid>
        <Header />
        <Container>
          <LinearProgress />
        </Container>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid>
        <Header />
        <Container>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">
              {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
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
        <Grid container direction="column">
          <Grid container className={classes.controlsGrid} justifyContent="space-between">
            <Grid item lg={3.5} md={5} sm={8} xs={12}>
              <Grid container justifyContent="space-between">
                <FormControl>
                  <InputLabel id="roleSelect">Role</InputLabel>
                  <Select
                    labelId="roleSelect"
                    value={role}
                    label="Role"
                    onChange={onRoleSelectChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="super-admin">Super admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel id="statusSelect">Status</InputLabel>
                  <Select
                    labelId="statusSelect"
                    value={blocked}
                    label="Status"
                    onChange={onStatusSelectChange}
                  >
                    <MenuItem value="0">Not blocked</MenuItem>
                    <MenuItem value="1">Blocked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item lg={5} md={6} xs={12} className={classes.searchGrid}>
              <Grid container>
                <Grid flexGrow="1">
                  <TextField
                    value={title}
                    onChange={onTitleChange}
                    label="Search by name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <IconButton onClick={onSearchClick}>
                  <SearchIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.linkGrid}>
            <Link to={ROUTE_PAGES.importClients} className={classes.controlLink}>
              <Button
                variant="contained"
                type="button"
              >
                Import clients
              </Button>
            </Link>
          </Grid>

          <Grid container>
            {data?.users.slice(0).map(
              (client) => (
                <UserCard
                  userFirstName={client.firstName}
                  userLastName={client.lastName}
                  key={client.id}
                  link={`${ROUTE_PAGES.client}/${client.id}`}
                  linkText="Show profile"
                />
              ),
            )}
          </Grid>
        </Grid>
      </Container>
      {data?.users.length === 0
        ? (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">
              No users found
            </Typography>
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <Pagination count={data?.pageCount} page={page} onChange={onPageChange} />
          </Grid>
        )}
    </Grid>
  );
};

export default ClientsPage;
