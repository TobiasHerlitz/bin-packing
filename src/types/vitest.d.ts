import type {} from 'vitest';

import { PerformanceMetrics } from './testing';

declare module 'vitest' {
  interface TaskMeta {
    performanceMetrics?: PerformanceMetrics;
  }
}
