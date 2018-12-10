"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
const SensorObserver_1 = __importDefault(require("./SensorObserver"));
var Axis;
(function (Axis) {
    Axis["X"] = "x";
    Axis["Y"] = "y";
    Axis["Z"] = "z";
})(Axis || (Axis = {}));
var Toggle;
(function (Toggle) {
    Toggle["on"] = "ON";
    Toggle["off"] = "OFF";
})(Toggle || (Toggle = {}));
var ToggleSensor;
(function (ToggleSensor) {
    ToggleSensor["enable"] = "enable";
    ToggleSensor["disable"] = "disable";
})(ToggleSensor || (ToggleSensor = {}));
var Sensors;
(function (Sensors) {
    Sensors["gyroscope"] = "Gyroscope";
    Sensors["accelerometer"] = "Accelerometer";
    Sensors["proximity"] = "Proximity";
    Sensors["lightSensor"] = "Light";
    Sensors["magnetometer"] = "Magnetometer";
})(Sensors || (Sensors = {}));
var Proximity;
(function (Proximity) {
    Proximity["isNear"] = "isNear";
    Proximity["maxRange"] = "maxRange";
    Proximity["distance"] = "distance";
})(Proximity || (Proximity = {}));
const post = (address, obj) => {
    const method = 'POST';
    const body = JSON.stringify(obj);
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    return fetch(address, { method, body, headers });
};
const doToggleFlashLight = (toggle, baseAddress) => {
    const obj = { enabled: toggle };
    post(`${baseAddress}/device/light`, obj).then(() => {
        console.log(`${toggle} light`);
    })
        .catch((e) => {
        console.log(e);
    });
};
const doVibration = (duration, baseAddress) => {
    const obj = { duration };
    post(`${baseAddress}/device/vibration/vibrate`, obj).then(() => {
        console.log(`vibrate ${duration} msec`);
    })
        .catch((e) => {
        console.log(e);
    });
};
class MyriadApiBlocks {
    constructor(runtime) {
        this.mayBeServerConnected = (callback) => {
            const state = store_1.default.getState();
            if (state.sensor) {
                return callback(state.sensor);
            }
            return 'error: you should set ip address';
        };
        /**
         * if sensor is enabled, get value
         * if disabled, return error statement.
         */
        this.getSensorValueWhenEnabled = (callback, key) => {
            return this.mayBeServerConnected((data) => {
                const param = data[key];
                if (param.enabled) {
                    return callback(param);
                }
                return `error: please enable ${key} in your app`;
            });
        };
        this.runtime = runtime;
        this.sensorObserver = new SensorObserver_1.default();
    }
    toggleFlashLight(args) {
        const address = store_1.default.getState().address;
        if (address) {
            const toggle = args.TOGGLE;
            switch (toggle) {
                case Toggle.on:
                    doToggleFlashLight(true, address);
                    break;
                case Toggle.off:
                    doToggleFlashLight(false, address);
                    break;
                default:
                    console.log('something worng');
            }
        }
        else {
            console.log('plase set url');
        }
    }
    getGyroscope(args) {
        return this.getSensorValueWhenEnabled((param) => {
            switch (args.AXIS) {
                case Axis.X:
                    return param.x;
                case Axis.Y:
                    return param.y;
                case Axis.Z:
                    return param.z;
                default:
                    return 'error';
            }
        }, 'gyroscope');
    }
    getAccelerometer(args) {
        return this.getSensorValueWhenEnabled((param) => {
            switch (args.AXIS) {
                case Axis.X:
                    return param.x;
                case Axis.Y:
                    return param.y;
                case Axis.Z:
                    return param.z;
                default:
                    return 'error';
            }
        }, 'accelerometer');
    }
    getMagnetometer(args) {
        return this.getSensorValueWhenEnabled((param) => {
            switch (args.AXIS) {
                case Axis.X:
                    return param.x;
                case Axis.Y:
                    return param.y;
                case Axis.Z:
                    return param.z;
                default:
                    return 'error';
            }
        }, 'magnetometer');
    }
    getLight() {
        return this.getSensorValueWhenEnabled((param) => {
            return param.value;
        }, 'light');
    }
    getProximity(args) {
        return this.getSensorValueWhenEnabled((param) => {
            switch (args.PROXIMITY) {
                case Proximity.isNear:
                    return param.isNear ? 'near' : 'far';
                case Proximity.distance:
                    return param.value;
                case Proximity.maxRange:
                    return param.maxRange;
                default:
                    return 'error';
            }
        }, 'proximity');
    }
    setIpAddress(args) {
        const address = (() => {
            const ipStr = args.IP;
            // If the end of the character is a /, delete it
            const ip = (ipStr).slice(-1) === '/' ? ipStr.slice(0, -1) : ipStr;
            const http = 'http://';
            const https = 'https://';
            if (ip.includes(http) || ip.includes(https)) {
                return ip;
            }
            return http + ip;
        })();
        this.sensorObserver.stopObserving();
        this.sensorObserver.startObserving(address, store_1.default.newState);
        store_1.default.newState({ address });
    }
    toggleSensor(args) {
        const enabled = args.TOGGLE;
        const sensor = args.SENSORS;
        const getSensorPath = (sensor) => {
            switch (sensor) {
                case Sensors.accelerometer:
                    return '/accelerometer';
                case Sensors.gyroscope:
                    return '/gyroscope';
                case Sensors.lightSensor:
                    return '/light';
                case Sensors.magnetometer:
                    return '/magnetometer';
                case Sensors.proximity:
                    return '/proximity';
                default:
                    return '';
            }
        };
        const obj = {
            enabled: enabled === ToggleSensor.enable ? true : false,
        };
        const baseAddress = store_1.default.getState().address;
        if (baseAddress) {
            const path = `${baseAddress}/sensor${getSensorPath(sensor)}`;
            post(path, obj);
        }
    }
    doVibration(args) {
        const sec = args.DURATION;
        const msec = sec * 1000;
        const address = store_1.default.getState().address;
        if (address) {
            doVibration(msec, address);
        }
    }
    axisMenu() {
        return [
            {
                value: Axis.X,
                text: 'X',
            },
            {
                value: Axis.Y,
                text: 'Y',
            },
            {
                value: Axis.Z,
                text: 'Z',
            },
        ];
    }
    proximityMenu() {
        return [
            {
                value: Proximity.isNear,
                text: 'Near/Far',
            },
            {
                value: Proximity.maxRange,
                text: 'max range',
            },
            {
                value: Proximity.distance,
                text: 'distance',
            },
        ];
    }
    toggleMenu() {
        return [
            {
                value: Toggle.on,
                text: 'ON',
            },
            {
                value: Toggle.off,
                text: 'OFF',
            },
        ];
    }
    toggleSensorMenu() {
        return [
            {
                value: ToggleSensor.enable,
                text: ToggleSensor.enable,
            },
            {
                value: ToggleSensor.disable,
                text: ToggleSensor.disable,
            },
        ];
    }
    sensorsMenu() {
        return [
            {
                value: Sensors.accelerometer,
                text: Sensors.accelerometer,
            },
            {
                value: Sensors.magnetometer,
                text: Sensors.magnetometer,
            },
            {
                value: Sensors.gyroscope,
                text: Sensors.gyroscope,
            },
            {
                value: Sensors.lightSensor,
                text: Sensors.lightSensor,
            },
            {
                value: Sensors.proximity,
                text: Sensors.proximity,
            },
        ];
    }
    getInfo() {
        return {
            id: 'myriadApiBlocks',
            name: 'Myriad Scratch blocks',
            docsURI: '',
            blocks: [
                {
                    opcode: 'setIpAddress',
                    blockType: 'command',
                    text: 'set API URL [IP]',
                    arguments: {
                        IP: {
                            type: 'string',
                            defaultValue: 'http://localhost:8080',
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'toggleSensor',
                    blockType: 'command',
                    text: '[TOGGLE] [SENSORS] sensor',
                    arguments: {
                        TOGGLE: {
                            type: 'string',
                            menu: 'toggleSensors',
                            defaultValue: ToggleSensor.enable,
                        },
                        SENSORS: {
                            type: 'string',
                            menu: 'sensors',
                            defaultValue: Sensors.accelerometer,
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'doVibration',
                    blockType: 'command',
                    text: 'Vibrate for [DURATION] seconds.',
                    arguments: {
                        DURATION: {
                            type: 'number',
                            defaultValue: 1.0,
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'toggleFlashLight',
                    blockType: 'command',
                    text: 'Turn [TOGGLE] flash light',
                    arguments: {
                        TOGGLE: {
                            type: 'string',
                            menu: 'toggle',
                            defaultValue: Toggle.on,
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'getGyroscope',
                    blockType: 'reporter',
                    branchCount: 0,
                    isTerminal: true,
                    blockAllThreads: false,
                    text: '[AXIS] axis of gyroscope',
                    arguments: {
                        AXIS: {
                            type: 'string',
                            menu: 'axis',
                            defaultValue: Axis.X,
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'getAccelerometer',
                    blockType: 'reporter',
                    branchCount: 0,
                    isTerminal: true,
                    blockAllThreads: false,
                    text: '[AXIS] axis of accelerometer',
                    arguments: {
                        AXIS: {
                            type: 'string',
                            menu: 'axis',
                            defaultValue: Axis.X,
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'getMagnetometer',
                    blockType: 'reporter',
                    branchCount: 0,
                    isTerminal: true,
                    blockAllThreads: false,
                    text: '[AXIS] axis of magnetometer',
                    arguments: {
                        AXIS: {
                            type: 'string',
                            menu: 'axis',
                            defaultValue: Axis.X,
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'getProximity',
                    blockType: 'reporter',
                    branchCount: 0,
                    isTerminal: true,
                    blockAllThreads: false,
                    text: 'Proximity [PROXIMITY]',
                    arguments: {
                        PROXIMITY: {
                            type: 'string',
                            menu: 'proximity',
                            defaultValue: Proximity.isNear,
                        },
                    },
                    filter: ['sprite', 'stage'],
                },
                {
                    opcode: 'getLight',
                    blockType: 'reporter',
                    branchCount: 0,
                    isTerminal: true,
                    blockAllThreads: false,
                    text: 'Light sensor',
                    filter: ['sprite', 'stage'],
                },
            ],
            menus: {
                axis: this.axisMenu(),
                proximity: this.proximityMenu(),
                toggle: this.toggleMenu(),
                toggleSensors: this.toggleSensorMenu(),
                sensors: this.sensorsMenu(),
            },
            translation_map: {
                ja: {
                    extensionName: 'Myriad Api Blocks',
                    getGyroscope: 'ジャイロスコープ [AXIS] 軸の値 ',
                    'myReporter.TEXT_default': 'Text',
                    'myReporter.result': 'Buchstabe {LETTER_NUM} von {TEXT} ist {LETTER}.',
                },
            },
            targetTypes: [],
        };
    }
}
// Scratch.extensions.register(new MyriadApiBlocks());
module.exports = MyriadApiBlocks;
