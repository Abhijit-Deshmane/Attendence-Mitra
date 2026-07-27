# 🎓 Attendance-Mitra

A modern, full-stack **Student Attendance Management System** built with **Next.js 15**, **Prisma**, **PostgreSQL**, and **NextAuth.js**. It provides a secure and scalable platform for educational institutions to manage students, classes, subjects, and attendance while offering insightful analytics through an intuitive dashboard.

---

## ✨ Features

- 🔐 Secure Authentication (Credentials + OAuth Ready)
- 👥 Role-Based Access Control (Admin / Teacher)
- 👨‍🎓 Student Management (Add / Edit / Delete)
- 🏫 Class & Subject Management
- 📅 Date-Based Attendance Marking
- 📊 Attendance Analytics Dashboard
- 📈 Interactive Charts & Reports
- 🗃️ Advanced Data Tables with AG Grid
- 🌙 Dark & Light Theme Support
- ⚡ Optimized with Next.js 15 App Router & Turbopack

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Radix UI**
- **React Hook Form**
- **Zod**
- **Recharts**
- **AG Grid**
- **Lucide React**

### Backend

- **Next.js Server Components & API Routes**
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth.js**
- **bcrypt**

---

## 📂 Project Structure

```text
Attendance-Mitra/
├── app/                  # Next.js App Router
├── components/           # Reusable UI Components
├── lib/                  # Utility functions & configurations
├── prisma/               # Prisma Schema & Migrations
├── public/               # Static Assets
├── types/                # TypeScript Types
├── hooks/                # Custom React Hooks
├── middleware.ts         # Authentication Middleware
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 20+
- PostgreSQL
- npm / pnpm / yarn / bun

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/attendance-mitra.git
```

Move into the project directory:

```bash
cd attendance-mitra
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

NEXTAUTH_SECRET="your-secret"

NEXTAUTH_URL="http://localhost:3000"
```

---

## 🗄️ Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

(Optional) Open Prisma Studio:

```bash
npx prisma studio
```

---

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

## 📊 Core Modules

### Authentication

- Secure login with NextAuth.js
- Password hashing using bcrypt
- OAuth-ready architecture
- Protected routes

### Student Management

- Add students
- Update student details
- Delete students
- Search & filter students

### Attendance Management

- Daily attendance marking
- Class-wise attendance
- Subject-wise attendance
- Date-based records

### Analytics

- Attendance statistics
- Interactive charts
- Student attendance reports
- Performance insights

---

## 🔒 Security

- Password hashing with bcrypt
- Protected API routes
- Role-based authorization
- Server-side validation
- Zod schema validation
- Secure database access using Prisma

---

## 📈 Performance

- Server Components
- App Router
- Turbopack
- Optimized database queries
- Efficient data fetching
- Modern React architecture

---

## 🧰 Built With

- Next.js
- React
- Prisma
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- Radix UI
- AG Grid
- Recharts
- Zod
- React Hook Form

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push the branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

## 👨‍💻 Author

**Abhijit Deshmane**

If you found this project helpful, consider giving it a ⭐ on GitHub.
