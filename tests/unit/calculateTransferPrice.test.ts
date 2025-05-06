// tests/unit/calculateTransferPrice.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTransferPrice } from '../../lib/calculateTransferPrice';

describe('calculateTransferPrice', () => {
  it('adds distance‐based fee to base price', () => {
    const price = calculateTransferPrice(10, 'sedan');
    // assuming basePricing.sedan is, say, 50:
    expect(price).toBe(50 + 10 * 0.75);
  });
});
