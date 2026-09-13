# 🎟️ Nightshade Sessions — Event Seat Booking System

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://seat-reservation-app-brown.vercel.app/)

## 📌 About the Project
An interactive, browser-based seat booking system built for a live event venue. It handles a full 60-seat theater layout, category-based pricing, and complete booking lifecycle management — select, confirm, cancel — entirely on the client side, with no backend or database. All state is persisted through `localStorage`, so booked seats and booking history survive a page refresh.

The UI leans into the theater setting itself: seats are arranged in a genuine curved arc around a stage, rather than a flat grid, so the layout doubles as a small piece of visual storytelling for the brief.

## ✨ Features
* **Curved Seat Layout:** 60 seats across 6 rows (A–F), arranged in an arc that bows away from the stage — not just a plain grid.
* **Three Live Seat States:** Available, Selected, and Booked, each with a distinct visual treatment plus a legend.
* **Category-Based Pricing:** VIP — ₹500 (Rows A–B), Premium — ₹300 (Rows C–D), Regular — ₹150 (Rows E–F).
* **Real-Time Booking Summary:** Selected seats and the running total update instantly as seats are tapped.
* **Data Persistence:** `localStorage` keeps booked seats and booking history intact across refreshes.
* **My Bookings:** A running history of every booking with its status, seats, and total amount.
* **Cancellation:** Cancel any confirmed booking to instantly free its seats back to Available.
* **Filtering:** Filter the seat map by category (VIP / Premium / Regular) and by availability (Available / Booked).
* **Live Capacity Tracking:** Booked and remaining seat counts update dynamically as bookings are made or cancelled.
* **Responsive Layout:** Seat map and sidebar stack cleanly on tablet and mobile screens.

## 🛠️ Tech Stack
* **HTML5** — Semantic structure and layout.
* **CSS3** — Custom grid/flex layout, curved seat positioning, hover and selection states, responsive breakpoints.
* **JavaScript (ES6+)** — Core logic, DOM manipulation, event delegation, and state management.

No frameworks, build tools, or dependencies beyond two Google Fonts loaded via CDN (Fraunces + Manrope).

## 🧠 Key Concepts Demonstrated
* DOM Manipulation & Event Handling (including event delegation)
* Array & Object Data Structures
* Array Methods (`.filter()`, `.map()`, `.forEach()`, `.find()`, `.reduce()`)
* JSON Parsing & Stringification
* LocalStorage API
* Conditional Logic & Real-Time Calculations

## 📂 Project Structure
```
├── index.html      # Markup and page structure
├── style.css        # Layout, seat states, theming, responsive rules
├── script.js         # Seat data, booking logic, localStorage persistence
└── README.md