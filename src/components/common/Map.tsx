import React, {
  FC, useCallback, useRef,
} from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import MapTheme from '../../containers/map/MapTheme';
import { Position } from '../../types/events';

enum Libraries {
  PLACES = 'places',
}

const libraries = [Libraries.PLACES];

interface Props {
  children: React.ReactNode,
  center: Position,
  containerStyle: {
    width: string,
    height: string,
  },
  zoom?: number,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  loading: {
    marginTop: theme.spacing(18),
  },
}));

const defaultOptions = {
  panControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: MapTheme,
};

const Map: FC<Props> = ({
  children, center, containerStyle, zoom = 12,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const mapRef = useRef(undefined);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
  }, []);

  return (
    <div>
      {isLoaded
        ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={defaultOptions}
          >
            {children}
          </GoogleMap>
        )
        : <Grid textAlign="center" className={classes.loading}><Typography variant="h4">{t('map.loading')}</Typography></Grid>}
    </div>
  );
};

export default Map;
