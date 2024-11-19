import { Bin, Parcel } from '@entities';

export interface PackingProblem {
  problemNumber: number;
  bin: Bin;
  parcels: Parcel[];
}

export type BRProblem = PackingProblem & {
  seed: number;
};
