import { DefaultReporter } from 'vitest/reporters';

type Files = Parameters<DefaultReporter['onFinished']>[0];
type Errors = Parameters<DefaultReporter['onFinished']>[1];

export default class MetaReporter extends DefaultReporter {
  onFinished(files: Files, errors: Errors) {
    super.onFinished(files, errors);

    const results: object[] = [];
    files?.forEach(({ tasks }) => {
      tasks.forEach(({ meta: { performanceMetrics }, name, result }) => {
        if (result?.state !== 'pass') {
          results.push({
            Name: name,
            'Avg fill rate (%)': '-',
            'Bins used': '-',
            'Number of problems': '-',
            State: 'FAIL',
          });
          return;
        }

        if (!performanceMetrics) {
          throw new Error('No performance metrics found for passed test');
        }

        results.push({
          Name: name,
          'Avg fill rate (%)': (
            performanceMetrics.averageFillRate * 100
          ).toPrecision(3),
          'Bins used': performanceMetrics.totalBinsUsed,
          'Number of problems': performanceMetrics.problemCount,
          State: 'PASS',
        });
      });
    });

    console.table(results);
  }
}
