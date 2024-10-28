import { Axis, Coordinate, Rotation, Size } from '@types';
import { axisToCoordinate, axisToSize } from '@utils';
import { v4 as UUIDv4 } from 'uuid';

interface ParcelArgs {
  name: string;
  originalSize: Size;
  quantity?: number;
  rotation?: Rotation;
  position?: Coordinate;
}

export class Parcel {
  id: string;
  name: string;
  originalSize: Size;
  quantity: number;
  #rotation?: Rotation;
  #position?: Coordinate;

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
    if (!this.#rotation) {
      throw new Error('Cannot determine rotated size if no rotation is set');
    }

    switch (this.#rotation) {
      case Rotation.WHD:
        return {
          width: this.originalSize.width,
          height: this.originalSize.height,
          depth: this.originalSize.depth,
        };
      case Rotation.HWD:
        return {
          width: this.originalSize.height,
          height: this.originalSize.width,
          depth: this.originalSize.depth,
        };
      case Rotation.HDW:
        return {
          width: this.originalSize.height,
          height: this.originalSize.depth,
          depth: this.originalSize.width,
        };
      case Rotation.DHW:
        return {
          width: this.originalSize.depth,
          height: this.originalSize.height,
          depth: this.originalSize.width,
        };
      case Rotation.DWH:
        return {
          width: this.originalSize.depth,
          height: this.originalSize.width,
          depth: this.originalSize.height,
        };
      case Rotation.WDH:
        return {
          width: this.originalSize.width,
          height: this.originalSize.depth,
          depth: this.originalSize.height,
        };
      // default:
      //   throw new Error('Could not determine rotated size')
    }
  }

  getRotation() {
    return this.#rotation;
  }

  setRotation(rotation: Rotation) {
    this.#rotation = rotation;
  }

  /**
   * Attempts to set rotation on instance so resulting height matches passed layerHeight.
   */
  rotateToLayerHeight(layerHeight: number) {
    if (this.originalSize.height === layerHeight) {
      this.setRotation(Rotation.WHD);
      return;
    }

    if (this.originalSize.width === layerHeight) {
      this.setRotation(Rotation.HWD);
      return;
    }

    if (this.originalSize.depth === layerHeight) {
      this.setRotation(Rotation.HDW);
      return;
    }
  }

  getPosition() {
    if (!this.#position) {
      throw new Error('No position set');
    }
    return this.#position;
  }

  setPosition(position: Coordinate) {
    if (!this.#rotation) {
      throw new Error('Rotation is required in order to set position');
    }

    if (this.quantity !== 1) {
      throw new Error('Can only place single parcels');
    }

    this.#position = position;
  }

  isPosed() {
    return !!this.#rotation && this.#position;
  }

  unsetPose() {
    this.#rotation = undefined;
    this.#position = undefined;
  }

  /**
   * Checks if proposed parcel intersect with instance at proposed position
   */
  intersects(parcel: Parcel) {
    if (parcel.name === 'Item three') {
      console.log('any');
    }
    return (
      this.rectIntersect(parcel, Axis.Width, Axis.Height) &&
      this.rectIntersect(parcel, Axis.Height, Axis.Depth) &&
      this.rectIntersect(parcel, Axis.Width, Axis.Depth)
    );
  }

  rectIntersect(proposedParcel: Parcel, axisOne: Axis, axisTwo: Axis) {
    const binParcelSizeX = this.getRotatedSize()[axisToSize[axisOne]];
    const binParcelSizeY = this.getRotatedSize()[axisToSize[axisTwo]];
    const proposedParcelSizeX =
      proposedParcel.getRotatedSize()[axisToSize[axisOne]];
    const proposedParcelSizeY =
      proposedParcel.getRotatedSize()[axisToSize[axisTwo]];

    const binParcelCenter = {
      x: this.getPosition()[axisToCoordinate[axisOne]] + binParcelSizeX / 2,
      y: this.getPosition()[axisToCoordinate[axisTwo]] + binParcelSizeY / 2,
    };

    const proposedParcelCenter = {
      x:
        proposedParcel.getPosition()[axisToCoordinate[axisOne]] +
        proposedParcelSizeX / 2,
      y:
        proposedParcel.getPosition()[axisToCoordinate[axisTwo]] +
        proposedParcelSizeY / 2,
    };

    const distanceX =
      Math.max(binParcelCenter.x, proposedParcelCenter.x) -
      Math.min(binParcelCenter.x, proposedParcelCenter.x);
    const distanceY =
      Math.max(binParcelCenter.y, proposedParcelCenter.y) -
      Math.min(binParcelCenter.y, proposedParcelCenter.y);

    // TODO: Handle rounding better
    return (
      distanceX < (binParcelSizeX + proposedParcelSizeX - 0.00001) / 2 &&
      distanceY < (binParcelSizeY + proposedParcelSizeY - 0.00001) / 2
    );
  }
}
