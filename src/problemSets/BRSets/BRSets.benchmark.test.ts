// BRSets.benmchmark.test.js
import { multipleContainersMinimizeCost } from '@packers';
import { BRProblem } from '@types';
import { averageFillRate } from '@utils';
import { expect, test } from 'vitest';

import { BRSets } from './BRSets';

const testHandler = (problemSet: BRProblem[]) => {
  const solutions = problemSet.map(({ bin, parcels }) =>
    multipleContainersMinimizeCost([bin], parcels)
  );

  const allSolutionsValid = solutions.every((solution) =>
    solution.every((bin) => bin.isValid())
  );
  expect(allSolutionsValid).toBe(true);

  return {
    averageFillRate: averageFillRate(solutions.flat()),
    totalBinsUsed: solutions.reduce(
      (carry, solution) => carry + solution.length,
      0
    ),
    problemCount: solutions.length,
  };
};

test('BR problem set 1', ({ task }) => {
  task.meta.performanceMetrics = testHandler(BRSets.BR1);
});

test('BR problem set 2', ({ task }) => {
  task.meta.performanceMetrics = testHandler(BRSets.BR2);
});

test('BR problem set 3', ({ task }) => {
  task.meta.performanceMetrics = testHandler(BRSets.BR3);
});

test('BR problem set 4', ({ task }) => {
  task.meta.performanceMetrics = testHandler(BRSets.BR4);
});

test('BR problem set 5', ({ task }) => {
  task.meta.performanceMetrics = testHandler(BRSets.BR5);
});

test('BR problem set 6', ({ task }) => {
  task.meta.performanceMetrics = testHandler(BRSets.BR6);
});

test('BR problem set 7', ({ task }) => {
  task.meta.performanceMetrics = testHandler(BRSets.BR7);
});
