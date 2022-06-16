import axios from 'axios';
import { UNDEFINED_ERROR } from '../constants';

export default function handleError(e: unknown) {
  if (axios.isAxiosError(e)) {
    if (!e.response?.data.message) {
      return UNDEFINED_ERROR;
    }
    return `${e.response?.data.message}`;
  }
  return String(e);
}
