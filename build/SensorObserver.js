"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SensorObserver {
    startObserving(address, newState) {
        this.observingId = setInterval(() => {
            fetch(`${address}/sensor`)
                .then((res) => {
                return res.json();
            })
                .then((data) => {
                newState({
                    isConnected: true,
                    sensor: data,
                });
            })
                .catch(() => {
                console.log('error');
                newState({ isConnected: false });
            });
        }, 50);
    }
    stopObserving() {
        if (this.observingId) {
            clearInterval(this.observingId);
        }
    }
}
exports.default = SensorObserver;
