// tests/unit/geo.test.ts
import { describe, it, expect } from 'vitest';
import { getDistanceKm } from '../../lib/geo';

describe('getDistanceKm', () => {
  it('computes zero for identical points', () => {
    const p = { lat: 41.0, lng: 29.0 };
    expect(getDistanceKm(p, p)).toBeCloseTo(0, 5);
  });
});
