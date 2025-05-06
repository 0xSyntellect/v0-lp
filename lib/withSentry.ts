import * as Sentry from '@sentry/node';
import type { NextRequest, NextResponse } from 'next/server';

export const withSentry =
  <T extends (req: NextRequest) => Promise<NextResponse>>(handler: T) =>
  async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (e) {
      Sentry.captureException(e);
      throw e;
    }
  };
