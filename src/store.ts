import { ResoponseSensorData } from './SensorConstants';

export interface State {
  address?: string;
  sensor?: ResoponseSensorData;
  isConnected: boolean;
}

const initState: State = { isConnected :false };

const store = ((state) => {
  let accState = Object.freeze(state);
  const newState = (ns: State|{}) => {
    const merged = Object.assign({}, accState, ns);
    accState = Object.freeze(merged);
  };
  const getState = () => {
    return accState;
  };
  return {
    newState,
    getState,
  };
})(initState);

export default store;
