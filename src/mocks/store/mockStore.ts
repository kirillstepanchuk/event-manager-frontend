import configureStore from 'redux-mock-store';
import { RootState } from '../../store/reducers/root';

export type InitialMockState = Partial<RootState>;

const createMockStore = (state: InitialMockState) => {
  const mockStore = configureStore();
  const store = mockStore(state);
  return store;
};

export default createMockStore;
