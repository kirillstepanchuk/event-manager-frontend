import React, { FC } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import addEventInCalendar from '../store/actions/addEventInCalendar/addEventInCalendar';

interface Props {
  id: string;
}

const AddEventToCalButton: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();

  const responseGoogle = async (response: any) => {
    const { code } = response;

    dispatch(addEventInCalendar(id, code));
  };

  return (
    <div>
      <GoogleLogin
        clientId="887240701374-gtgdnnkv9ekqu5bgm6j00lsqm5kq8obo.apps.googleusercontent.com"
        buttonText="Add event in calendar"
        onSuccess={responseGoogle}
        cookiePolicy="single_host_origin"
        accessType="offline"
        responseType="code"
        prompt="consent"
        scope="openid email profile https://www.googleapis.com/auth/calendar"
      />
    </div>
  );
};

export default AddEventToCalButton;
