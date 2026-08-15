### Demonstrates:

* Database management using **PostgreSQL/Supabase and Prisma**
* Authentication implementation using **NextAuth**
* Payment flow integration using **Stripe**
* End-to-end flow including post creation, editing, and deletion, session-based access control, and secure webhook handling after payment

### Technologies & Deployment

* **Database:** PostgreSQL (hosted on Supabase / `DIRECT_URL`)
* **ORM:** Prisma — schema defined in `prisma/schema.prisma`; Prisma Client is generated using `prisma generate` and used for all database operations
* **Authentication:** NextAuth (sessions/tokens) with server-side access control
* **Payments:** Stripe (test mode is used for demonstration)
* **Frontend:** React, Tailwind CSS, Next.js (App Router)
* **Deployment:** Vercel (application build and deployment)

### Key Features

* Create, edit, and delete posts
* Filter posts by category
* Transfer post ownership to another user only after successful payment using **Stripe Checkout** and webhook validation
* Different permissions and features based on the user's session (authenticated/unauthenticated)


Дальнейшие шаги:
- Устранение уязвимостей, создание unit и интеграционных тестов.

Ссылка на сайт: 
https://nextjs-app-wine-six.vercel.app/

