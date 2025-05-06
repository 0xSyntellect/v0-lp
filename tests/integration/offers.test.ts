// tests/integration/offers.test.ts
import request from 'supertest';

const API = 'http://localhost:3000';

describe('Offers → Payments flow', () => {
  let offerId: string;

  it('GET /api/offers/getOffer', async () => {
    const res = await request(API)
      .post('/api/offers/getOffer')
      .send({
        pickup: 'Kadıköy, Istanbul',
        dropoff: 'Beşiktaş, Istanbul',
        vehicle: 'sedan'
      })
      .expect(200);
    expect(res.body).toHaveProperty('offerId');
    offerId = res.body.offerId;
  });

  it('POST /api/offers/acceptOffer', async () => {
    await request(API)
      .post('/api/offers/acceptOffer')
      .send({ offerId })
      .expect(200);
  });

  it('POST /api/payments/create', async () => {
    const res = await request(API)
      .post('/api/payments/create')
      .send({ offerId })
      .expect(200);
    expect(res.body.paymentUrl).toMatch(/paytr\.com/);
  });
});
