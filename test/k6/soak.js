import { sleep } from 'k6';
import { smokeGet, handleSummary, THRESHOLDS } from './lib.js';

export const options = {
  thresholds: THRESHOLDS,
  scenarios: {
    soak: {
      executor: 'constant-vus',
      vus: 50,                // 40–60 VUs
      duration: '30m',        // 30–60 min (ajusta)
      gracefulStop: '30s',
    },
  },
};

export default function () {
  smokeGet('/api/health');
  sleep(1);
}

export function handleSummaryWrap(data) { return handleSummary(data); }
export const handleSummary = handleSummaryWrap;
