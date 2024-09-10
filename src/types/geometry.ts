export interface Size {
  height: number;
  width: number;
  depth: number;
}

export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export enum Axis {
  Width = 'Width',
  Height = 'Height',
  Depth = 'Depth',
}

export enum Rotation {
  WHD = 'WHD',
  HWD = 'HWD',
  HDW = 'HDW',
  DHW = 'DHW',
  DWH = 'DWH',
  WDH = 'WDH',
}
