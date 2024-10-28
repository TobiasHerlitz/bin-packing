import { Size } from '@types';
import { v4 as UUIDv4 } from 'uuid';

import { Parcel } from './parcel';

interface BinArgs {
  name: string;
  size: Size;
  cost?: number;
  parcels?: Parcel[];
}

export class Bin {
  id: string;
  name: string;
  size: Size;
  cost?: number;
  parcels: Parcel[];

  constructor({ name, size, cost, parcels = [] }: BinArgs) {
    this.id = UUIDv4();
    this.name = name;
    this.size = size;
    this.cost = cost;
    this.parcels = parcels;
  }

  /**
   * Checks if passed parcel fits into the bin with relation to its position, size and the bins walls
   */
  fits(parcel: Parcel) {
    if (!parcel.isPosed()) {
      throw new Error('Requires a parcel with rotation and position');
    }

    const { width, height, depth } = parcel.getRotatedSize();
    const { x, y, z } = parcel.getPosition();

    return (
      this.size.width > width + x &&
      this.size.height > height + y &&
      this.size.depth > depth + z
    );
  }
}
