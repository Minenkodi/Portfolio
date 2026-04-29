# Fin-Track — Personal Finance Tracker

> Full-stack web app for tracking expenses, income, and financial goals.

🚀 **[Live Demo](https://fin-track-client.onrender.com)** | 📂 **[GitHub](https://github.com/Minenkodi/Portfolio)**

![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🧠 About this project

A collaborative full-stack project built with a teammate. My responsibilities covered the frontend: building React + TypeScript components, Redux Toolkit state management, Recharts visualisations, and responsive UI with Material UI. I also handled the Render deployment configuration (render.yaml, Docker setup) and CI workflow via GitHub Actions.

---

## 🚀 Features

- **Expense & Income Tracking** — categorize and visualize your financial flow
- **Interactive Dashboard** — real-time Pie and Bar charts (Recharts) displaying financial health
- **Goal Management** — set financial targets and track progress automatically
- **Secure Authentication** — JWT-based user session management
- **Responsive Design** — built with Material UI for seamless mobile and desktop experience

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Redux Toolkit, Material UI, Recharts |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| DevOps | Docker, Docker Compose, GitHub Actions CI, Render |

---

## 📦 Quick Start (Docker)

```bash
git clone https://github.com/Minenkodi/Portfolio.git
cd Portfolio
docker-compose up --build
```

Access the app at `http://localhost:5173`.

### Manual Setup

**Server:**
```bash
cd server && npm install && npm run dev
```

**Client:**
```bash
cd client && npm install && npm run dev
```

---

## 🧪 Testing & Verification

- `verify_balance.ps1` — validates core transaction logic and balance updates
- `verify_categories.ps1` — ensures category management integrity

---

## 📄 License

MIT
