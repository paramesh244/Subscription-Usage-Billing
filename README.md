# Subscription Usage & Billing System

A backend service built using **Node.js, TypeScript, Express, Prisma, and PostgreSQL** that tracks user usage, enforces subscription quotas, and calculates monthly billing with overage charges.

---

## Features

- User subscription management
- Monthly usage tracking
- Quota-based billing
- Extra charge calculation for over-usage
- REST APIs for usage and billing summary
- Prisma ORM with PostgreSQL

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **pgAdmin** (DB management)

---


## ⚙️ Setup Instructions

Install dependencies
```bash
npm install
```
Configure environment variables

Create a .env file:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/subscription_billing"
```

Run database migrations
```bash
npx prisma migrate dev --name init
```

Start the server
```bash
npm run dev
```
Server runs on:
http://localhost:3000



---

## 🧱 Database Schema

### Users
- `id` (PK)
- `name`

### Plans
- `id` (PK)
- `name`
- `monthlyQuota`
- `extraChargePerUnit`

### Subscriptions
- `id` (PK)
- `userId` (FK → Users)
- `planId` (FK → Plans)
- `startDate`
- `isActive`

### UsageRecords
- `id` (PK)
- `userId` (FK → Users)
- `action`
- `usedUnits`
- `createdAt`

---




