/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useEffect } from 'react';
import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useJsApiLoader } from '@react-google-maps/api';

import { Position } from '../../types/events';

enum Libraries {
  PLACES = 'places',
}

const libraries = [Libraries.PLACES];

interface AutocompleteProps {
  onSelect: (coords: Position) => void,
  placeholder: string
  onAddressChange: (value: string) => void
}

interface InputEventType {
  target: {
    value: string
  }
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    padding: `${theme.spacing(3.6)} ${theme.spacing(3)}`,
    width: '100%',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '5px',
    outline: 'none',
  },
  suggestions: {
    position: 'absolute',
    top: '0',
    width: '100%',
    transform: 'translateY(55px)',
    background: theme.palette.secondary.light,
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '5px',
    zIndex: '10',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    textAlign: 'left',
  },
  listItem: {
    padding: `${theme.spacing(3.6)} ${theme.spacing(3)}`,
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.secondary.light,
    },
  },
}));

const Autocomplete: FC<AutocompleteProps> = ({ onSelect, placeholder, onAddressChange }) => {
  const classes = useStyles();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
    },
    initOnMount: false,
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: InputEventType) => {
    setValue(e.target.value);
    onAddressChange(e.target.value);
  };

  const handleSelect = (description: string) => {
    setValue(description, false);
    onAddressChange(description);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        onSelect({ lat, lng });
      });
  };

  const renderSuggestions = () => data.map((suggestion) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    const onSuggestionClick = () => {
      handleSelect(suggestion.description);
    };

    return (
      <li className={classes.listItem} key={place_id} onClick={onSuggestionClick}>
        <strong>{main_text}</strong>
        {' '}
        <small>{secondary_text}</small>
      </li>
    );
  });

  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  return (
    <div className={classes.container} ref={ref}>
      <input
        className={classes.input}
        type="text"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
      />
      {status === 'OK' && <ul className={classes.suggestions}>{renderSuggestions()}</ul>}
    </div>
  );
};

export default Autocomplete;
