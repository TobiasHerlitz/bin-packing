import { Parcel } from '@components';
import { Bin as BinEntity } from '@entities';
import { Coordinate } from '@types';
import { sizeToMeters } from '@utils';
import { BackSide } from 'three';

const parcelColors = [
  '#9FE7F5',
  '#429EBD',
  '#053F5C',
  '#F7AD19',
  '#F27F0C',
  '#f5983c',
  '#f7b26d',
  '#facb9d',
  '#fce5ce',
  '#d954c5',
  '#e27ed3',
  '#eba8e1',
  '#f5d1ef',
];

interface BinProps {
  bin: BinEntity;
  position?: Coordinate;
}

export const Bin = ({ bin, position }: BinProps) => {
  const { width, height, depth } = sizeToMeters(bin.size);
  const { x, y, z } = position ?? { x: 0, y: height / 2, z: 0 };
  const color = '#6F8C90';

  const parcels = bin.parcels.map((parcel, index) => (
    <Parcel
      id={parcel.id}
      key={parcel.name}
      color={parcelColors[index % parcelColors.length]}
      size={sizeToMeters(parcel.getRotatedSize())}
      position={{
        x: (parcel.getPosition().x + parcel.getRotatedSize().width / 2) / 100,
        y: (parcel.getPosition().y + parcel.getRotatedSize().height / 2) / 100,
        z: (parcel.getPosition().z + parcel.getRotatedSize().depth / 2) / 100,
      }}
    />
  ));

  const binStart: Coordinate = {
    x: -width / 2,
    y: -height / 2,
    z: -depth / 2,
  };

  return (
    <mesh receiveShadow position={[x, y, z]} castShadow>
      <boxGeometry attach="geometry" args={[width, height, depth]} />
      {parcels.map((parcel, index) => {
        return (
          <mesh key={index} position={[binStart.x, binStart.y, binStart.z]}>
            {parcel}
          </mesh>
        );
      })}
      <meshStandardMaterial attach="material-0" color={color} side={BackSide} />
      <meshStandardMaterial attach="material-1" color={color} side={BackSide} />
      <meshStandardMaterial attach="material-2" color={color} side={BackSide} />
      <meshStandardMaterial attach="material-3" color={color} side={BackSide} />
      <meshStandardMaterial attach="material-4" color={color} side={BackSide} />
      <meshStandardMaterial attach="material-5" color={color} side={BackSide} />
    </mesh>
  );
};
