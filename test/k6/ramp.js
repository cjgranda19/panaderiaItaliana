import { sleep } from 'k6';
import { smokeGet, handleSummary, THRESHOLDS } from './lib.js';

export const options = {
  thresholds: THRESHOLDS,
  scenarios: {
    ramp_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 10 },
        { duration: '5m', target: 100 }, // 10 → 100 VUs
        { duration: '2m', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
  },
  summaryTrendStats: ['avg','min','med','max','p(90)','p(95)'],
};

export default function () {
  smokeGet('/api/health');   // cambia por tus endpoints críticos
  sleep(1);
}

export function handleSummaryWrap(data) { return handleSummary(data); }
export const handleSummary = handleSummaryWrap;
