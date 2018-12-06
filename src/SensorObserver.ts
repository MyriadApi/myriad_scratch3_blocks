import { ResoponseSensorData } from './SensorConstants';
import { State } from './store';

export default class SensorObserver {
  private observingId?: NodeJS.Timeout;

  startObserving(address: string, newState: (s: State) => void) {
    this.observingId = setInterval(
        () => {
          fetch(`${address}/sensor`)
            .then((res) => {
              return res.json();
            })
            .then((data: ResoponseSensorData) => {
              newState({
                isConnected: true,
                sensor: data,
              });
            })
            .catch(() => {
              console.log('error');
              newState({ isConnected: false });
            });
        },
        50);
  }

  stopObserving() {
    if (this.observingId) {
      clearInterval(this.observingId);
    }
  }
}
