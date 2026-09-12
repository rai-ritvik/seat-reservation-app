"use strict";

const ROWS = ["A", "B", "C", "D", "E", "F"];
const SEATS_PER_ROW = 10;

const CATEGORY_BY_ROW = {
    A: "vip",
    B: "vip",
    C: "premium",
    D: "premium",
    E: "regular",
    F: "regular"
};

const PRICE = {
    vip: 500,
    premium: 300,
    regular: 150
};

const STORAGE_SEATS = "eventBooking_seats";
const STORAGE_BOOKINGS = "eventBooking_bookings";

let seats = [];
let bookings = [];
let selectedIds = [];
let activeCatFilter = "all";
let activeAvailFilter = "all";

function buildDefaultSeats() {
    const arr = [];
    ROWS.forEach(row => {
        for (let i = 1; i <= SEATS_PER_ROW; i++) {
            const seatCategory = CATEGORY_BY_ROW[row];
            arr.push({
                id: row + i,
                row: row,
                number: i,
                category: seatCategory,
                price: PRICE[seatCategory],
                status: "available"
            });
        }
    });
    return arr;
}

function loadState() {
    try {
        const rawSeats = localStorage.getItem(STORAGE_SEATS);
        seats = rawSeats ? JSON.parse(rawSeats) : buildDefaultSeats();
    }
    catch (error) {
        seats = buildDefaultSeats();
    }

    try {
        const rawBookings = localStorage.getItem(STORAGE_BOOKINGS);
        bookings = rawBookings ? JSON.parse(rawBookings) : [];
    }
    catch (error) {
        bookings = [];
    }
}

function saveSeats() {
    localStorage.setItem(STORAGE_SEATS, JSON.stringify(seats));
}

function saveBookings() {
    localStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(bookings));
}

function arcOffset(index) {
    const center = (SEATS_PER_ROW - 1) / 2;
    const dist = Math.abs(index - center);
    return Math.round(dist * dist * 1.6);
}

function renderSeatMap() {
    const map = document.getElementById("seatMap");
    map.innerHTML = "";
    ROWS.forEach(row => {
        const rowEl = document.createElement("div");
        rowEl.className = "seat-row";
        const tag = document.createElement("div");
        tag.className = "row-tag";
        tag.textContent = row;
        rowEl.appendChild(tag);
        seats.filter(s => s.row === row).forEach((seat, idx) => {
            const btn = document.createElement("button");
            btn.className = "seat cat-" + seat.category;
            btn.style.setProperty("--arc", arcOffset(idx) + "px");
            btn.dataset.num = seat.number;
            btn.dataset.id = seat.id;
            rowEl.appendChild(btn);
        });
        map.appendChild(rowEl);
    });
}
loadState();
renderSeatMap();