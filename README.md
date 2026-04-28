# 🍪 Chunk'd — Cookie E-Commerce Website

> A production e-commerce website built for **Chunk'd**, a freshly baked cookie brand delivering across **Lahore, Pakistan**.

🌐 **Live Site:** [chunkdpk.com](https://www.chunkdpk.com)

---

## 🧩 Problem Statement

Chunk'd needed more than a storefront — they needed a complete business operating system. They sell multiple product types (individual cookies, bundles, and custom boxes), each requiring a completely different purchasing flow. On top of that, they needed tools to run real daily operations: delivery pricing by city, discount campaigns, order tracking, and revenue visibility — all without touching code.

The goal was a bold, personality-forward website that matched the brand, eliminated manual work for the client, and could scale as the business grew.

> 💬 *Client review (voice message):* **"I showed it to my family and friends and they said it's my first time I didn't waste money on something completely worth it."**

---

## ✨ Features

### Customer-Facing
- **3 distinct ordering flows** — Individual cookies, curated bundles, and a custom Build Your Box (4 or 6 cookies) — each with its own UX and cart logic
- **Build Your Box** — Interactive builder where customers pick box size then mix & match flavours, with real-time selection count and over-selection prevention
- **Limited Drops** — Small-batch exclusive flavours with scarcity-driven UX
- **Coupon Code system** — Customers can apply discount codes at checkout for different promotional offers
- **Live shop status** — Real-time open/closed banner with delivery window (11 AM – 6 PM) and next-delivery messaging
- **Drop list subscription** — Email signup so customers are first to know when new flavours launch
- **Review system** — Customer testimonials with moderation
- **SEO-ready** — Auto-generated sitemap via `next-sitemap`, optimized meta per page

### Admin Dashboard
- **Full CRUD** — Manage individual cookies, bundles, and limited drops
- **Order management** — View and handle all orders by type in one place
- **Delivery pricing** — Set different delivery charges per city
- **Coupon code management** — Create, edit, and deactivate discount codes
- **Business analytics** — Revenue tracking and order insights to monitor business performance
- **Review moderation** — Approve or remove customer testimonials
- **Media & Drop list** — Manage homepage gallery and email subscriber list
- **Secure access** — JWT authentication with bcrypt password hashing

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router, SSR & SSG |
| **React 19 + TypeScript** | Type-safe UI components |
| **Tailwind CSS v4 + tailwind-merge** | Utility-first styling with conditional class merging |
| **Framer Motion + GSAP** | Page transitions and scroll animations |
| **Swiper.js** | Product and media carousels |
| **MUI v7 + Data Grid** | Admin dashboard UI and tables |
| **Lucide React + React Icons** | Icon libraries |
| **next-sitemap** | Auto-generated XML sitemap |

### Backend (Next.js API Routes)
| Technology | Purpose |
|---|---|
| **MongoDB + Mongoose** | Products, orders, bundles, coupons, analytics, delivery config |
| **JWT + bcryptjs** | Secure admin authentication |
| **Nodemailer** | Order confirmation & notification emails |
| **Cloudinary** | Cloud image storage and CDN delivery |
| **browser-image-compression** | Client-side compression before upload |
| **Axios + UUID** | API calls and unique order ID generation |

---

## 🏗 Architecture Highlights

- **Multi-flow cart** — Each product type (cookie, bundle, box) has its own API endpoint, validation, and checkout flow
- **Real-time box builder** — Client-side state enforces box limits before any server call is made
- **Shop availability engine** — Open/closed status derived from configurable delivery windows, shown live across the site
- **City-based delivery pricing** — Delivery cost computed dynamically at checkout based on the customer's city
- **Revenue analytics** — Admin dashboard aggregates order data into actionable business insights

---

## 👨‍💻 Built By

Designed & developed by **[Mussadiq Khan](https://github.com/mussadiqkhan6886)** as a **[Scrupulous](https://scrupulous.vercel.app)** Agency project.

> *Shared for portfolio purposes with client permission. Environment variables and sensitive configuration are excluded.*

---

**Business:** Chunk'd · **Location:** Lahore, Pakistan · **Specialty:** Freshly baked stuffed cookies, custom boxes & bundles
