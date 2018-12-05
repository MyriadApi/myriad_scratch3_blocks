import { ResoponseSensorData } from './SensorConstants';
import store from './store';
import SensorObserver from './SensorObserver';

enum Axis {
  X = 'x',
  Y = 'y',
  Z = 'z',
}

enum Proximity{
  isNear = 'isNear',
  maxRange = 'maxRange',
  distance = 'distance',
}

class MyriadApiBlocks {
  private runtime: any;
  private sensorObserver: SensorObserver;

  constructor (runtime?: any) {
    this.runtime = runtime;
    this.sensorObserver = new SensorObserver();
  }

  checkServerConnected = (callback: (sensor: ResoponseSensorData)
                                => string|number): string|number => {
    const state = store.getState();
    if (state.sensor) {
      return callback(state.sensor);
    }
    return 'error: you should set ip address';
  }

  checkEnabledSensor = <K extends keyof ResoponseSensorData>
                    (callback: (param: ResoponseSensorData[K]) => string|number,
                     data: ResoponseSensorData,
                     key: K) => {
    const param = data[key];
    if (param.enabled) {
      return callback(param);
    }
    return `error: please enable ${key} in your app`;
  }

  getGyroscope(args: any) {
    return this.checkServerConnected((sensor) => {
      return this.checkEnabledSensor(
      (param) => {
        switch (args.AXIS as Axis) {
          case Axis.X:
            return param.x;
          case Axis.Y:
            return param.y;
          case Axis.Z:
            return param.z;
          default:
            return 'error';
        }
      },
      sensor,
      'gyroscope');
    });
  }
  getAccelerometer(args: any) {
    return this.checkServerConnected((sensor) => {
      return this.checkEnabledSensor(
      (param) => {
        switch (args.AXIS as Axis) {
          case Axis.X:
            return param.x;
          case Axis.Y:
            return param.y;
          case Axis.Z:
            return param.z;
          default:
            return 'error';
        }
      },
      sensor,
      'accelerometer');
    });
  }
  getMagnetometer(args: any) {
    return this.checkServerConnected((sensor) => {
      return this.checkEnabledSensor(
      (param) => {
        switch (args.AXIS as Axis) {
          case Axis.X:
            return param.x;
          case Axis.Y:
            return param.y;
          case Axis.Z:
            return param.z;
          default:
            return 'error';
        }
      },
      sensor,
      'magnetometer');
    });
  }
  getLight() {
    return this.checkServerConnected((sensor) => {
      return this.checkEnabledSensor(
      (param) => {
        return param.value;
      },
      sensor,
      'light');
    });
  }
  getProximity(args: any) {
    return this.checkServerConnected((sensor) => {
      return this.checkEnabledSensor(
      (param) => {
        switch (args.PROXIMITY as Proximity) {
          case Proximity.isNear:
            return param.isNear ? 'near' : 'far';
          case Proximity.distance:
            return param.value;
          case Proximity.maxRange:
            return param.maxRange;
          default:
            return 'error';
        }
      },
      sensor,
      'proximity');
    });
  }
  setIpAddress(args:any) {
    const ipaddress = (() => {
      const ip = args.IP as string;
      const http = 'http://';
      const https = 'https://';
      if (ip.includes(http) || ip.includes(https)) {
        return ip;
      }
      return http + ip;
    })();
    this.sensorObserver.stopObserving();
    this.sensorObserver.startObserving(ipaddress, store.newState, store.getState);
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

  getInfo() {
    return {
      id: 'myriadApiBlocks',
      name: 'Myriad api blocks',
      docsURI: 'https://....',
      blocks: [
        {
          opcode: 'setIpAddress',
          blockType: 'command',
          text: 'set ip address [IP]',
          arguments: {
            IP: {
              type: 'string',
              defaultValue: 'http://localhost:8080',
            },
          },
          filter: ['sprite', 'stage'],
        },
        {
          opcode: 'getGyroscope',
          blockType: Scratch.BlockType.REPORTER,
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
          blockType: Scratch.BlockType.REPORTER,
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
          blockType: Scratch.BlockType.REPORTER,
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
          blockType: Scratch.BlockType.REPORTER,
          branchCount: 0,
          isTerminal: true,
          blockAllThreads: false,
          text: 'Proximity',
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
          blockType: Scratch.BlockType.REPORTER,
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
      },
      translation_map: {
        ja: {
          extensionName: 'Myriad Api Blocks',
          getGyroscope: 'ジャイロスコープ [AXIS] 軸の値 ',
          'myReporter.TEXT_default': 'Text',
          menuA_item1: 'Artikel eins',
          menuB_example: 'Beispiel',
          'myReporter.result': 'Buchstabe {LETTER_NUM} von {TEXT} ist {LETTER}.',
        },
      },
      targetTypes: [],
    };
  }
}

Scratch.extensions.register(new MyriadApiBlocks());
