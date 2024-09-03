import { Size } from '@types';

export const sizeToMeters = (size: Size) => {
  return {
    width: size.width / 100,
    height: size.height / 100,
    depth: size.depth / 100,
  };
};
