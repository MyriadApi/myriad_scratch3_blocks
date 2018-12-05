import store from './store';
import { stat } from 'fs';

describe('store test', () => {

  it('checnk init state', () => {
    const state = store.getState();
    expect(state.isConnected).toBeFalsy();
    expect(state.sensor).toBeUndefined();
  });

  it('update state', () => {
    store.newState({ isConnected: true });
    expect(store.getState().isConnected).toBeTruthy();
  });
});
