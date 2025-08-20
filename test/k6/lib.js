import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

// BASE_URL configurable desde secrets/env del workflow (por defecto local)
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

// Test básico de GET (ajusta endpoints de tu API)
export function smokeGet(path = '/api/health') {
  const res = http.get(`${BASE_URL}${path}`);
  const ok = check(res, {
    'status is 2xx/3xx': (r) => r.status >= 200 && r.status < 400,
    'body not empty': (r) => (r.body || '').length > 0,
  });
  return { res, ok };
}

// Handler para guardar reports
export function handleSummary(data) {
  const fs = require('k6/fs');
  const reportDir = 'tests/k6/reports';
  fs.writeFile(`${reportDir}/summary.json`, JSON.stringify(data, null, 2));
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// Thresholds comunes (pide el enunciado)
export const THRESHOLDS = {
  http_req_duration: ['p(95)<500'],       // ajusta según contexto
  http_req_failed: ['rate<0.01'],
  checks: ['rate>0.99'],
};
