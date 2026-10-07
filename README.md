# CourShera

CourShera is a full-stack online learning platform developed for **CSE-326: Information System Design Sessional** at Bangladesh University of Engineering and Technology (BUET). It supports course discovery, authentication, enrollment, online payments, learning-progress tracking, quizzes, learner profiles, and personalized course recommendations.

The platform is built with **React**, **Vite**, **Express.js**, **Prisma**, and **PostgreSQL**, with integrations for **Google OAuth**, **Supabase Storage**, and **SSLCommerz**.

> **Disclaimer:** CourShera is an academic project inspired by Coursera. It is not affiliated with, endorsed by, or connected to Coursera.

## Features

### Course Discovery

* Browse popular courses
* Browse courses by category
* Search courses by title
* View detailed course information
* Display course ratings and enrollment information
* Personalized course recommendations based on previously enrolled course categories and skills

### Authentication

* Email/password registration and login
* Password hashing with bcrypt
* Google OAuth authentication
* Persistent Passport.js sessions
* Protected routes for authenticated learners

### Enrollment and Payments

* Purchase paid courses through **SSLCommerz**
* Support for payment methods exposed through the SSLCommerz gateway, including mobile banking and cards
* Server-side payment validation
* Automatic course enrollment after successful payment validation
* Prevention of duplicate active enrollments
* Payment success, failure, and cancellation handling

> The current integration uses the **SSLCommerz sandbox environment**.

#### Enrollment & Payment Flow

```mermaid
sequenceDiagram
    actor User
    participant FE as React Frontend
    participant API as Express API
    participant SSL as SSLCommerz
    participant DB as PostgreSQL

    User->>FE: Select course and proceed to checkout
    FE->>API: Create payment request
    API->>SSL: Initialize transaction
    SSL-->>User: Payment interface
    User->>SSL: Complete payment
    SSL-->>API: Payment result
    API->>SSL: Validate transaction
    SSL-->>API: Validation response

    alt Payment validated
        API->>DB: Create course enrollment
        API-->>FE: Enrollment successful
        FE-->>User: Course access granted
    else Payment failed or cancelled
        API-->>FE: Payment unsuccessful
        FE-->>User: Show failure/cancellation status
    end
```

### Learning Experience

* View enrolled courses under **My Learning**
* Separate in-progress and completed courses
* Display learning progress
* Resume enrolled courses
* Enrollment-protected course content
* Course organization by modules, topics, videos, readings, and transcripts

### Quiz Experience

* Quiz catalog
* Single-choice and multiple-choice questions
* Automatic grading
* Passing-score calculation
* Question-level feedback
* Quiz retakes
* Previous-attempt history
* Best-score tracking
* Automatically saved quiz drafts
* Result/certificate-style page after submission

Quiz drafts and attempts are currently stored in the browser using `localStorage`.

### Learner Profile

* View and update profile information
* Name, institution, country, and date-of-birth fields
* Profile-picture upload
* Supabase Storage integration for avatars
* Saved payment-card UI with masked card information

## Tech Stack

| Layer              | Technology                                    |
| ------------------ | --------------------------------------------- |
| Frontend           | React 19, Vite                                |
| Routing            | React Router                                  |
| Backend            | Node.js, Express.js                           |
| Database ORM       | Prisma                                        |
| Database           | PostgreSQL                                    |
| Authentication     | Passport.js, Google OAuth 2.0, Local Strategy |
| Password Security  | bcrypt                                        |
| Session Management | cookie-session                                |
| File Uploads       | Multer                                        |
| Object Storage     | Supabase Storage                              |
| Payments           | SSLCommerz                                    |
| API Documentation  | OpenAPI 3                                     |
| Containerization   | Docker                                        |

## Architecture

```mermaid
flowchart LR
    U[User] --> FE[React + Vite Frontend]
    FE --> API[Express.js API]

    API --> AUTH[Authentication]
    API --> COURSE[Course Management]
    API --> ENROLL[Enrollment]
    API --> PAY[Payments]
    API --> PROFILE[User Profiles]

    AUTH --> PRISMA[Prisma ORM]
    COURSE --> PRISMA
    ENROLL --> PRISMA
    PAY --> PRISMA
    PROFILE --> PRISMA

    PRISMA --> DB[(PostgreSQL)]

    AUTH --> GOOGLE[Google OAuth]
    PROFILE --> SUPABASE[Supabase Storage]
    PAY --> SSL[SSLCommerz]
```

## Project Structure

```text
CourShera/
├── .github/
│   └── workflows/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── routes/
│   ├── db.js
│   ├── passport.js
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   └── styles/
│   ├── package.json
│   └── Dockerfile
├── sqlfiles/
├── api_docs.yaml
├── docker-compose.yml
├── LICENSE
└── README.md
```

## Prerequisites

Before running the project locally, install:

* **Node.js 22+**
* **npm**
* **PostgreSQL**, or access to a hosted PostgreSQL database such as Supabase
* A **Google OAuth** application if Google sign-in is required
* A **Supabase** project if profile-image uploads are required
* **SSLCommerz sandbox credentials** if payment testing is required

Docker is optional.

## Database Setup

The backend uses PostgreSQL through Prisma.

SQL resources for the project are available under:

```text
sqlfiles/
```

Create or configure the PostgreSQL database and apply the required project SQL scripts before starting the application.

Then configure `DATABASE_URL` in the backend environment and generate the Prisma client:

```bash
cd backend
npx prisma db pull
npx prisma generate
```

## Environment Variables

Create:

```text
backend/.env
```

A typical backend configuration requires:

```env
PORT=5000
NODE_ENV=development

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

SESSION_SECRET=replace-with-a-secure-random-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_KEY=your-supabase-service-role-key

SSLCOMMERZ_STORE_ID=your-sandbox-store-id
SSLCOMMERZ_STORE_PASSWORD=your-sandbox-store-password
```

For the frontend, create:

```text
frontend/.env
```

with:

```env
VITE_API_URL=http://localhost:5000
```

Do not commit real credentials or `.env` files.

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/nazmul-islam00/CourShera.git
cd CourShera
```

### 2. Install and prepare the backend

```bash
cd backend
npm install
npx prisma db pull
npx prisma generate
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

### 3. Install and run the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local frontend URL, normally:

```text
http://localhost:5173
```

## Production Builds

Build the frontend with:

```bash
cd frontend
npm run build
```

Run the backend with:

```bash
cd backend
npm start
```

## Docker

Dockerfiles are included for both the frontend and backend.

### Backend

Because the backend image runs Prisma introspection and client generation during the build, provide the database URL as a build argument:

```bash
cd backend

docker build \
  --build-arg DATABASE_URL="your-database-url" \
  -t courshera-backend .
```

Run it with the required environment configuration:

```bash
docker run \
  --env-file .env \
  -p 5000:5000 \
  --name courshera-backend \
  courshera-backend
```

### Frontend

Build the frontend with its API URL:

```bash
cd frontend

docker build \
  --build-arg VITE_API_URL=http://localhost:5000 \
  -t courshera-frontend .
```

Run it with:

```bash
docker run \
  -p 3000:80 \
  --name courshera-frontend \
  courshera-frontend
```

Then open:

```text
http://localhost:3000
```

> The repository also contains a `docker-compose.yml`, but its configuration should be reviewed against the required application environment variables before using it as the primary local-development setup.

## Main Application Routes

The frontend includes routes for:

```text
/                              Home
/browse/category/:categoryId   Category browsing
/course/:courseId              Course details
/course/:courseId/content      Enrolled course content
/search                        Course search
/checkout                      Checkout
/payment/result                Payment result
/my-learning                   Learning dashboard
/me                            User profile
/quiz-center                   Quiz catalog
/quiz/:quizId                  Quiz overview
/quiz/:quizId/take             Take quiz
/quiz/:quizId/attempts         Previous attempts
/quiz/:quizId/certificate      Quiz results
```

## Backend Areas

The implemented Express backend is organized around four primary route groups:

```text
/auth       Authentication
/courses    Course discovery, recommendations and course content
/payment    SSLCommerz payment and enrollment handling
/me         User profile, saved cards and learning information
```

## API Documentation

An OpenAPI specification is included in:

```text
api_docs.yaml
```

It documents the intended API design for authentication, courses, enrollment, payments, course content, quizzes, progress tracking, and related functionality.

The application evolved during development, so the Express routes under `backend/` should currently be treated as the source of truth for implemented endpoints.

## Current Implementation Notes

* Authentication uses Passport.js sessions rather than a stateless frontend JWT flow.
* Course data, enrollments, profiles, recommendations, payments, and learning progress are backed by PostgreSQL.
* Course content is only returned to authenticated users with an active enrollment.
* Quiz data, drafts, evaluation, and attempts currently run on the frontend and persist through browser `localStorage`.
* SSLCommerz is configured for sandbox use in the current payment implementation.
* Supabase Storage is used for uploaded profile images.

## Security Notes

* Local passwords are hashed with bcrypt.
* Authentication cookies are HTTP-only.
* Production sessions use secure cookies.
* Course-content endpoints verify authentication and active enrollment.
* SSLCommerz transactions are validated by the backend before enrollment is activated.
* Profile uploads are handled server-side through Supabase Storage.
* Secrets and environment files should remain outside version control.

> **Note:** CourShera is an academic project. Additional security review and hardening would be required before using it in production with real payments or sensitive user information.

## License

This project is licensed under the **Apache License 2.0**.

See [`LICENSE`](LICENSE) for details.

## Academic Context

CourShera was developed for **CSE-326: Information System Design Sessional** at Bangladesh University of Engineering and Technology (BUET).

The project explores several end-to-end software engineering concerns, including authentication and session management, relational database design, course discovery, recommendation logic, enrollment and access control, third-party payment integration, profile management, learning-progress tracking, interactive assessments, object storage, REST-style backend APIs, and containerized deployment.
