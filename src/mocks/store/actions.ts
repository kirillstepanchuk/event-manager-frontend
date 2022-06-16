import { LocationChangeAction, LocationChangePayload, LOCATION_CHANGE } from 'connected-react-router';

const locationChangeAction = (data: LocationChangePayload): LocationChangeAction => ({
  type: LOCATION_CHANGE,
  payload: data,
});

export default locationChangeAction;
