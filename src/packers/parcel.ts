import { Rotation, Size } from '@types';
import { v4 as UUIDv4 } from 'uuid';

interface ParcelArgs {
  name: string;
  originalSize: Size;
  quantity?: number;
  rotation?: Rotation;
  position?: Position;
}

export class Parcel {
  id: string;
  name: string;
  originalSize: Size;
  quantity: number;
  #rotation?: Rotation;
  #position?: Position;

  constructor({
    name,
    originalSize,
    quantity = 1,
    rotation,
    position,
  }: ParcelArgs) {
    if (!!position && !rotation) {
      throw new Error('Rotation is required in order to set position');
    }

    if (!!position && quantity !== 1) {
      throw new Error('Can only place single parcels');
    }

    this.id = UUIDv4();
    this.name = name;
    this.originalSize = originalSize;
    this.quantity = quantity;
    this.#rotation = rotation;
    this.#position = position;
  }

  isRotated() {
    return !!this.#rotation;
  }

  isPositioned() {
    return !!this.#position;
  }

  getRotatedSize() {
    switch (this.#rotation) {
      case Rotation.WHD:
        return {
          width: this.originalSize.width,
          height: this.originalSize.height,
          depth: this.originalSize.depth,
        };
      case Rotation.HWD:
        return {
          height: this.originalSize.height,
          width: this.originalSize.width,
          depth: this.originalSize.depth,
        };
      case Rotation.HDW:
        return {
          height: this.originalSize.height,
          depth: this.originalSize.depth,
          width: this.originalSize.width,
        };
      case Rotation.DHW:
        return {
          depth: this.originalSize.depth,
          height: this.originalSize.height,
          width: this.originalSize.width,
        };
      case Rotation.DWH:
        return {
          depth: this.originalSize.depth,
          width: this.originalSize.width,
          height: this.originalSize.height,
        };
      case Rotation.WDH:
        return {
          width: this.originalSize.width,
          depth: this.originalSize.depth,
          height: this.originalSize.height,
        };
    }
  }

  getRotation() {
    return this.#rotation;
  }

  setRotation(rotation: Rotation) {
    this.#rotation = rotation;
  }

  getPosition() {
    return this.#position;
  }

  setPosition(position: Position) {
    if (!this.#rotation) {
      throw new Error('Rotation is required in order to set position');
    }

    if (this.quantity !== 1) {
      throw new Error('Can only place single parcels');
    }

    this.#position = position;
  }
}
