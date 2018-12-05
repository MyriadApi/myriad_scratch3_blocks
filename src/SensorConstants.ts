export interface BaseParam {
  enabled: boolean;
  timeStamp: number;
}

export interface GyroParam extends BaseParam {
  x: number;
  y: number;
  z: number;
}

export interface AccParam  extends BaseParam {
  x: number;
  y: number;
  z: number;
}

export interface MagParam  extends BaseParam {
  x: number;
  y: number;
  z: number;
}

export interface ProxParam  extends BaseParam {
  maxRange: number;
  value: number;
  isNear: boolean;
}

export interface LightParam  extends BaseParam {
  value: number;
}

export interface ResoponseSensorData {
  accelerometer: AccParam;
  gyroscope: GyroParam;
  light: LightParam;
  magnetometer: MagParam;
  proximity: ProxParam;
}
