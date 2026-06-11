# 🏨 Hotel Room Booking — Frontend

A modern, responsive hotel booking single-page application built with **React 19 + TypeScript + Vite**, styled with **React-Bootstrap** and custom CSS, and powered by **Redux** for state management. The app currently runs on a mocked API layer so the full user flow can be demonstrated without a backend.

---

## ✨ Features

- 🔍 **Smart search** — find hotels by city with check-in / check-out date filtering.
- 🏨 **Hotel listings** — clickable cards with cover image, star rating, price-per-night and city.
- 📄 **Hotel detail page** — description, amenities, gallery and available room types filtered by selected dates.
- 🛏 **Room selection** — per-room pricing, bed configuration, occupancy, amenity chips and availability badges.
- 💳 **Booking flow** — review stay, see live total (subtotal + 12% taxes), enter guest details, confirm.
- ✅ **Booking confirmation** — auto-generated Booking ID, persisted to `localStorage`.
- 🔐 **Mock authentication** — login / register / forgot password / OTP flows (UI scaffolding).
- 🧑‍💼 **Dashboards** — Admin (hotels CRUD) and Manager (rooms + bookings) screens with tables, modals and pagination.
- 🎨 **Polished UI** — animated home page, gradient themes, glass-style empty states, fully responsive.

---

## 🛠 Tech Stack

| Layer            | Tools                                                |
| ---------------- | ---------------------------------------------------- |
| Framework        | React 19, TypeScript 6, Vite 8                       |
| Routing          | React Router v7                                      |
| State management | Redux + Redux Thunk                                  |
| UI               | React-Bootstrap 2, Bootstrap 5, custom CSS modules   |
| HTTP             | Axios (configured, mocked for now)                   |
| Linting          | ESLint 10 + typescript-eslint + react-hooks plugins  |

---

## 📁 Project Structure
src/
├── api/ # Axios config, endpoints, mock API layer
├── assets/ # Static assets
├── components/ # Feature-grouped components
│ ├── AdminDashboard/
│ ├── Auth/ # Login, Register, ForgotPassword, VerifyOtp, AuthLayout
│ ├── Booking/ # Confirm + Success containers
│ ├── common/ # Loader, EmptyState, TablePagination
│ ├── Home/ # Hero, search panel, feature highlights
│ ├── HotelDetail/ # Detail container, RoomTypeCard, mock data
│ ├── HotelList/ # List container, HotelCard, NoHotelsFound
│ └── ManagerDashboard/
├── pages/ # Route entry points
├── redux/ # store, rootReducer, feature slices (hotel/, booking/)
├── types/ # Shared TypeScript types
├── utils/ # auth.ts (mock session) and helpers
├── App.tsx
└── main.tsx
