import { Size } from '@types';
import dockerNames from 'docker-names';
import { v4 as UUIDv4 } from 'uuid';

import { Parcel } from './parcel';

interface BinArgs {
  name?: string;
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
    this.name = name || dockerNames.getRandomName();
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
      this.size.width >= width + x &&
      this.size.height >= height + y &&
      this.size.depth >= depth + z
    );
  }

  /**
   * Checks if parcel fits within the bounds of the bin and does not intersect with already placed parcels
   */
  canPlaceParcel(parcel: Parcel) {
    return (
      this.fits(parcel) &&
      this.parcels.every((placedParcel) => !placedParcel.intersects(parcel))
    );
  }

  contains(proposedParcel: Parcel) {
    return this.parcels.some((parcel) => parcel.id === proposedParcel.id);
  }

  volume() {
    const { width, height, depth } = this.size;
    return width * height * depth;
  }

  usedWidth() {
    return this.parcels.reduce((carry, parcel) => {
      return Math.max(
        carry,
        parcel.getPosition().x + parcel.getRotatedSize().width
      );
    }, 0);
  }

  fillRate() {
    const parcelVolume = this.parcels.reduce((carry, parcel) => {
      carry += parcel.volume();
      return carry;
    }, 0);

    return parcelVolume / this.volume();
  }

  isValid() {
    return this.parcels.every((parcel) => this.fits(parcel));
    // return true
  }
}
