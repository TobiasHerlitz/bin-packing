import { Coordinate, Size } from '@types';

export enum Rotation {
  WHD = 'WHD',
  HWD = 'HWD',
  HDW = 'HDW',
  DHW = 'DHW',
  DWH = 'DWH',
  WDH = 'WDH',
}

export interface Item {
  name: string;
  sides: [number, number, number];
  weight: number;
}

export type PlacedItem = Item & {
  // rotation: Rotation,
  position: Coordinate;
  size: Size;
};

export function getRotatedSize(item: Item, rotation: Rotation): Size {
  switch (rotation) {
    case Rotation.WHD:
      return {
        width: item.sides[0],
        height: item.sides[1],
        depth: item.sides[2],
      };
    case Rotation.HWD:
      return {
        height: item.sides[1],
        width: item.sides[0],
        depth: item.sides[2],
      };
    case Rotation.HDW:
      return {
        height: item.sides[1],
        depth: item.sides[2],
        width: item.sides[0],
      };
    case Rotation.DHW:
      return {
        depth: item.sides[2],
        height: item.sides[1],
        width: item.sides[0],
      };
    case Rotation.DWH:
      return {
        depth: item.sides[2],
        width: item.sides[0],
        height: item.sides[1],
      };
    case Rotation.WDH:
      return {
        width: item.sides[0],
        depth: item.sides[2],
        height: item.sides[1],
      };
  }
}

export function sortItems(items: Item[]) {
  return items.toSorted((itemOne: Item, itemTwo: Item) => {
    const itemOneVolume = itemOne.sides.reduce((a, b) => a * b);
    const itemTwoVolume = itemTwo.sides.reduce((a, b) => a * b);

    if (itemOneVolume > itemTwoVolume) {
      return -1;
    }

    if (itemOneVolume < itemTwoVolume) {
      return 1;
    }

    return 0;
  });
}
