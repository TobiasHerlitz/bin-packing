import { Coordinate, Size } from '@types';
import { ReactNode } from 'react';
import { BackSide } from 'three';

interface BinProps {
  size: Size;
  position?: Coordinate;
  parcels: ReactNode[];
}

export const Bin = ({ size, position, parcels }) => {
  const { width, height, depth } = size;
  const { x, y, z } = position ?? { x: 0, y: height / 2, z: 0 };
  const color = '#6F8C90';

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
