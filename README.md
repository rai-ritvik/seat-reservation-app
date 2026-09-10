# 🎟️ Event Seat Booking System

## 📌 About the Project
This project is an interactive, browser-based Event Seat Booking System. Built as a practical frontend challenge, it handles dynamic UI rendering, state management, and data persistence without relying on a backend database. Users can view a 60-seat layout, select seats based on different pricing categories, and manage their bookings.

## ✨ Features
* **Dynamic Seat Layout:** An interactive grid of 60 seats with real-time visual states (Available, Selected, Booked).
* **Category-Based Pricing:** Seats are divided into VIP (₹500), Premium (₹300), and Regular (₹150) tiers.
* **Real-Time Cart Calculation:** Automatically calculates and displays the total amount based on the selected seats.
* **Data Persistence:** Utilizes browser `localStorage` to ensure booked seats and booking details remain saved even after a page refresh.
* **Booking Management:** Includes a "My Bookings" section to view previous reservations and an option to cancel bookings, instantly freeing up the seat.
* **Smart Filtering & Capacity:** Users can filter seats by category and availability, while a dynamic counter tracks booked and remaining seats.

## 🛠️ Tech Stack
* **HTML5:** Semantic structure and layout.
* **CSS3:** Custom grid layout, interactive hover states, and responsive design.
* **JavaScript:** Core logic, DOM manipulation, and state management.

## 🧠 Key Concepts Demonstrated
* DOM Manipulation & Event Handling
* Array & Object Data Structures
* Array Methods (`.filter()`, `.map()`, `.forEach()`, `.reduce()`)
* JSON Parsing & Stringification
* LocalStorage API
* Conditional Logic & Real-time Calculations