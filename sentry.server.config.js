import * as Sentry from '@sentry/nextjs';

const { NEXT_PUBLIC_SENTRY_DSN } = process.env;

Sentry.init({
  dsn:
    NEXT_PUBLIC_SENTRY_DSN ||
    'https://77574d29964f42f8927a00bb6e6e53bf@o499663.ingest.sentry.io/5578670',
  environment: process.env.VERCEL_ENV,
});
