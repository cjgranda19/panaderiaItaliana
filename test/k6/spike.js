import { sleep } from 'k6';
import { smokeGet, handleSummary, THRESHOLDS } from './lib.js';

export const options = {
  thresholds: THRESHOLDS,
  scenarios: {
    spike: {
      executor: 'per-vu-iterations',
      vus: 300,                 // 0 → 300 VUs
      iterations: 5,            // ~10–20 s de pico (ajusta)
      maxDuration: '3m',
    },
  },
};

export default function () {
  smokeGet('/api/health');
  sleep(0.3);
}

export function handleSummaryWrap(data) { return handleSummary(data); }
export const handleSummary = handleSummaryWrap;
