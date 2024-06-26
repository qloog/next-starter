This is a Next-starter project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Init Project

1.Create a new project: `npx create-next-app@latest`

```bash
❯ npx create-next-app@latest next-starter
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
Creating a new Next.js app in /Users/next/codes/next-starter.

Using npm.

Initializing project with template: app-tw


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- autoprefixer
- postcss
- tailwindcss
- eslint
- eslint-config-next


added 368 packages in 17s
Initialized a git repository.

Success! Created next-starter at /Users/next/codes/next-starter
```

2.Install shadcn-ui: `npx shadcn-ui init`

```bash
❯ npx shadcn-ui init
Need to install the following packages:
shadcn-ui@0.8.0
Ok to proceed? (y) y
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Would you like to use CSS variables for colors? … no / yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed. You may now add components.
```

## Tech Stack

- Next.js
- Tailwind CSS
- TypeScript
- shadcn-ui

## Features

- [x] Base directory structure
- [x] Common clients
  - [x] MySQL, PostgreSQL
  - [x] Redis
  - [x] MongoDB

- [] Sign-up/Login
  - [x] next-auth(v5)
    - [x] login
    - [x]sign-up
    - [x]forgot password
    - [x]reset password

> https://authjs.dev/guides/upgrade-to-v5
> https://www.freecodecamp.org/news/how-to-authenticate-users-with-nextauth-in-nextjs-app-and-pages-router/
> https://github.com/AntonioErdeljac/next-auth-v5-advanced-guide

## Install dependencies

```bash
npm install mongodb mongoose
npm install @upstash/redis
npm install prisma
# v5
npm install next-auth@beta
npm install @auth/prisma-adapter

npm install zod
npm install @hookform/resolvers
npm install bcryptjs @types/bcryptjs

npm install react-icons
npm install @radix-ui/react-icons

# send email
npm install resend
npm install nodemailer
npm i --save-dev @types/nodemailer
npm install uuid
npm i --save-dev @types/uuid
npm install react-spinners
```

## Database operation

```bash
# init prisma, it will create directory prisma, including schema.prisma
npx prisma init
# create table in the database
npx prisma migrate dev --name init
# push data to the database
# pro tips: don't use this command if there are data in your database
# you should use `npx prisma migrate` instead
npx prisma db push
# generate prisma client if you have changed the schema
npx prisma generate
# GUI to view and edit data in your database
npx prisma studios

# help
npx prisma --help
```

## Plugins

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Eslint
- Prettier
- Prisma
- Prisma NextJS

## Auth

Server component, get user

```typescript
import { auth } from '@/libs/auth'

...
const session = await auth()
console.log(session?.user)
// Output
// {
//   name: 'John Doe',
//   email: 'john@example.com',
//   image: 'https://example.com/john.jpg',
// }
```

Client component, get user

```typescript
import { useSession } from "next-auth/react"

...
const { data: session, status } = useSession()
console.log(status)
// Output
// "authenticated" or "unauthenticated" or "loading"
console.log(session?.user)
// Output
// {
//   name: 'John Doe',
//   email: 'john@example.com',
//   image: 'https://example.com/john.jpg',
// }
```

## Templates

- https://www.tailwindawesome.com/
- https://www.tailwindawesome.com/resources/community/demo (Community)

## References

- https://nextjs.org/
- https://ui.shadcn.com/
- https://www.prisma.io/
- https://www.mongodb.com/
- https://mongoosejs.com/
- https://tailwindcomponents.com/gradient-generator/
- https://tailwindcss.com/docs/gradient-color-stops
- https://github.com/vercel-labs/gemini-chatbot
- https://github.com/weijunext/landing-page-boilerplate