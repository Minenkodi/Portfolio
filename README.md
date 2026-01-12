# Fin-Track: Personal Finance Tracker

A robust, full-stack personal finance application designed to help users track expenses, income, and financial goals. Built with modern web technologies and best practices.

![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Features

*   **Expense & Income Tracking**: Categorize and visualize your financial flow.
*   **Interactive Dashboard**: Real-time charts (Pie, Bar) displaying financial health.
*   **Goal Management**: Set financial targets and track progress automatically.
*   **Secure Authentication**: JWT-based user session management.
*   **Responsive Design**: Built with Material UI for a seamless mobile and desktop experience.

## 🛠️ Technology Stack

*   **Frontend**: React, TypeScript, Vite, Redux Toolkit, Material UI, Recharts.
*   **Backend**: Node.js, Express, TypeScript.
*   **Database**: PostgreSQL.
*   **DevOps**: Docker, Docker Compose.

## 📦 Installation & Setup

### Prerequisites

*   Docker & Docker Compose
*   *Or* Node.js v18+ and PostgreSQL 15+

### fast Start (Docker)

The easiest way to run the application is using Docker:

```bash
# Clone the repository
git clone https://github.com/Minenkodi/Portfolio.git

# Navigate to directory
cd Portfolio

# Start the application
docker-compose up --build
```

Access the application at `http://localhost:5173`.

### Manual Development Setup

1.  **Server**:
    ```bash
    cd server
    npm install
    npm run dev
    ```

2.  **Client**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

## 🧪 Testing & Verification

The project includes automated verification scripts:
*   `verify_balance.ps1`: Validates core transaction logic and balance updates.
*   `verify_categories.ps1`: Ensures category management integrity.

## 📄 License

This project is licensed under the MIT License.
