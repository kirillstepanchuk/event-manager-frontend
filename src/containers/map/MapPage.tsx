import React, { useCallback, useEffect, useState } from 'react';
import { InfoWindow, Circle, Marker } from '@react-google-maps/api';
import { createStyles, makeStyles } from '@mui/styles';
import {
  FormControl,
  Grid, InputLabel, LinearProgress, MenuItem, Select, Theme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/common/Header';
import Map from '../../components/common/Map';
import Autocomplete from './Autocomplete';
import { MapEvent, Position } from '../../types/events';
import CurrentLocationMarker from './CurrentLocationMarker';
import loadMapEventsData from '../../store/actions/loadEventsData/loadMapEventsData';
import getUserLocation from '../../store/actions/loadUserLocation/getUserLocation';
import { selectMapEventState, selectUserLocationState } from '../../store/selectors/selectors';

function noop() {}

interface SelectEvent {
  target: {
    value: string
  }
}

const defaultCenter: Position = {
  lat: 53.904541,
  lng: 27.561523,
};

const circleOptions = {
  strokeColor: '#0f8fd9',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#0f8fd9',
  fillOpacity: 0.35,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  autocomleteContainer: {
    position: 'absolute',
    marginTop: theme.spacing(3),
    zIndex: '10',
  },
  selectControl: {
    marginLeft: theme.spacing(6),
  },
  select: {
    background: theme.palette.secondary.light,
    '&:after': {
      background: theme.palette.secondary.light,
    },
    '&:hover': {
      background: theme.palette.secondary.light,
    },
    '&:focus': {
      background: theme.palette.secondary.light,
    },
  },
  loading: {
    marginTop: theme.spacing(18),
  },
}));

const containerStyle = {
  width: '100vw',
  height: '91vh',
};

const MapPage = () => {
  const [center, setCenter] = useState<Position>(defaultCenter);
  const [radius, setRadius] = useState<number>(10);
  const [selectedEvent, setSelectedEvent] = useState<MapEvent | null>(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data } = useSelector(selectMapEventState);
  const userLocation = useSelector(selectUserLocationState);
  const [zoom, setZoom] = useState<number>(12);

  const zoomFromKm = {
    10: 12,
    15: 11.75,
    20: 11.25,
    30: 10.75,
    40: 10.25,
  };

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
    dispatch(loadMapEventsData(radius, coordinates));
  }, []);

  useEffect(() => {
    dispatch(getUserLocation());
  }, []);

  useEffect(() => {
    if (userLocation.data) {
      dispatch(loadMapEventsData(radius, userLocation.data));
      setCenter(userLocation.data);
    } else if (userLocation.error) {
      dispatch(loadMapEventsData(radius, userLocation.error));
      setCenter(userLocation.error);
    }
  }, [userLocation.data, userLocation.error, radius]);

  const selectChangeHandler = (evt: SelectEvent) => {
    setRadius(+evt.target.value);
    // @ts-ignore
    setZoom(zoomFromKm[+evt.target.value]);
  };

  return (
    <Grid>
      <Header />
      <Grid className={classes.autocomleteContainer} container direction="row" justifyContent="center" alignItems="center">
        <Grid xs={5}>
          <Autocomplete onSelect={onPlaceSelect} placeholder={t('map.placeholder.whereAreYouGoing')} onAddressChange={noop} />
        </Grid>
        <FormControl className={classes.selectControl}>
          <InputLabel id="radius-label">{t('map.select.radius')}</InputLabel>
          <Select
            labelId="radius-label"
            className={classes.select}
            defaultValue="10"
            label="Radius"
            onChange={selectChangeHandler}
          >
            <MenuItem value="10">{t('map.select.tenKm')}</MenuItem>
            <MenuItem value="15">{t('map.select.fifteenKm')}</MenuItem>
            <MenuItem value="20">{t('map.select.twentyKm')}</MenuItem>
            <MenuItem value="30">{t('map.select.thirtyKm')}</MenuItem>
            <MenuItem value="40">{t('map.select.fourtyKm')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {userLocation.data
        ? (
          <Map
            containerStyle={containerStyle}
            center={center}
            zoom={zoom}
          >
            <CurrentLocationMarker position={center} />
            <Circle
              center={center}
              radius={radius * 700}
              options={circleOptions}
            />
            {data?.map((event) => (
              <Marker
                key={event.id}
                position={{ lat: event.lat, lng: event.lng }}
                onClick={() => {
                  setSelectedEvent(event);
                }}
              />
            ))}
            {selectedEvent && (
            <InfoWindow
              position={{ lat: selectedEvent.lat, lng: selectedEvent.lng }}
              onCloseClick={() => {
                setSelectedEvent(null);
              }}
            >
              <div>
                <h2>{selectedEvent.title}</h2>
                <p>{selectedEvent.address}</p>
                <a href={process.env.CLIENT_URL}>{t('map.showEvent')}</a>
              </div>
            </InfoWindow>
            )}
          </Map>
        ) : (
          <Grid>
            {userLocation.error
              ? (
                <Map
                  containerStyle={containerStyle}
                  center={center}
                >
                  <CurrentLocationMarker position={center} />
                  {data?.map((event) => (
                    <Marker
                      key={event.id}
                      position={{ lat: event.lat, lng: event.lng }}
                      onClick={() => {
                        setSelectedEvent(event);
                      }}
                    />
                  ))}

                  {selectedEvent && (
                  <InfoWindow
                    position={{ lat: selectedEvent.lat, lng: selectedEvent.lng }}
                    onCloseClick={() => {
                      setSelectedEvent(null);
                    }}
                  >
                    <div>
                      <h2>{selectedEvent.title}</h2>
                      <p>{selectedEvent.address}</p>
                      <a href={process.env.CLIENT_URL}>{t('map.showEvent')}</a>
                    </div>
                  </InfoWindow>
                  )}
                </Map>
              ) : (
                <LinearProgress />
              )}
          </Grid>
        )}
    </Grid>
  );
};

export default MapPage;
