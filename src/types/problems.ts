import { Bin, Parcel } from '@entities';

export interface BRProblem {
  problemNumber: number;
  seed: number;
  bin: Bin;
  parcels: Parcel[];
}

export type BRProblemSet = BRProblem[];
