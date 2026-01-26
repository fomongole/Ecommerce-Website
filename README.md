# Enterprise Ecommerce Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

A production-ready, full-stack e-commerce application built with **Next.js 15 (App Router)**. This project features a high-performance storefront for customers and a comprehensive "Back Office" admin dashboard for business management, powered by Firebase and Cloudinary.

## 🚀 Key Features

### 🛒 Storefront (Customer Experience)
* **Real-Time Inventory:** Browse products fetched instantly from Firestore.
* **Dynamic Product Pages:** SEO-friendly individual product details `[id]` pages.
* **Persistent Cart:** Robust cart system using Zustand (persisted to local storage).
* **Checkout Flow:** Validated checkout forms using `react-hook-form` and `zod`.
* **Smart Stock Management:** Automatic stock deduction upon purchase using Firestore Transactions/Batch writes.
* **User Profiles:** Order history tracking and detailed receipt views.
* **Search & Filter:** Instant search capability via URL parameters.

### 🛡️ Admin Dashboard (Business Logic)
* **Role-Based Access Control (RBAC):** Secure Admin Guard that strictly enforces `admin` roles via Firestore.
* **Analytics Dashboard:** Real-time overview of Total Revenue, Orders Count, and Active Inventory.
* **Product Management:** Full CRUD (Create, Read, Update, Delete) for products with image uploads.
* **Order Management:** View customer orders, update status (Pending -> Processing -> Completed), and view shipping details.
* **Customer Insights:** Track customer lifetime value and order frequency.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn UI (Radix Primitives)
* **Backend / Database:** Firebase (Firestore & Authentication)
* **State Management:** Zustand
* **Form Validation:** React Hook Form + Zod
* **Image Storage:** Cloudinary
* **Icons:** Lucide React

---