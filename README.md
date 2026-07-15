# ShowGuard

Confirm. Predict. Rescue. Nurture. — an appointment show-rate platform for GoHighLevel-connected contractors.

This repo is currently a **project scaffold**: folder structure, data model, and stub modules that mirror the phased roadmap. No pillar logic is implemented yet.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Prisma + PostgreSQL
- pnpm

## Getting started

```bash
pnpm install
cp .env.example .env   # fill in DATABASE_URL and GHL credentials
pnpm prisma migrate dev --name init
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    dashboard/            risk board (green/yellow/red) placeholder
    api/webhooks/ghl/     inbound GoHighLevel webhook (appointment.created, etc.)
    api/webhooks/sms/     inbound SMS reply webhook — must catch every YES/STOP
  lib/
    ghl/client.ts         GoHighLevel API client (OAuth, SMS send) — stub
    pillars/
      confirm.ts          Pillar 1 — confirmation sequence + reply handling
      predict.ts          Pillar 2 — risk scoring (rules now, ML in v2)
      rescue.ts           Pillar 3 — at-risk appointment recovery
      nurture.ts          Pillar 4 — pre/post-visit nurture sequences
    prisma.ts             Prisma client singleton
prisma/
  schema.prisma           Client, Contact, Appointment, Message, Outcome
```

## Roadmap context

See the product roadmap for the full phased plan (Version 1 go-to-market →
Version 2 ML brain → Version 3 white-label). The one thing every wave
depends on: **outcome capture must be correct from the first live
appointment** — see the `Outcome` model in `prisma/schema.prisma`.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
