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
            if (seat.status === "booked") btn.classList.add("booked");
            if (selectedIds.includes(seat.id)) btn.classList.add("selected");
            rowEl.appendChild(btn);
        });
        map.appendChild(rowEl);
    });
}


document.getElementById("seatMap").addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (!clickedElement.classList.contains("seat")) return;
    const seatId = clickedElement.dataset.id;
    const seatData = seats.find(s => s.id === seatId);
    if (seatData.status === "booked") return;
    const indexInSelected = selectedIds.indexOf(seatId);
    if (indexInSelected > -1) {
        selectedIds.splice(indexInSelected, 1);
    }
    else {
        selectedIds.push(seatId);
    }
    renderSeatMap();
    updateSummary();
});

function updateSummary() {
    const summaryContainer = document.getElementById("seatSummary");
    const totalAmountEl = document.querySelector(".total-row .amount");
    const confirmBtn = document.querySelector(".btn-confirm");
    summaryContainer.innerHTML = "";
    if (selectedIds.length === 0) {
        summaryContainer.innerHTML = '<span class="empty-note">No seats selected yet.</span>';
        totalAmountEl.textContent = "Rs.0";
        confirmBtn.disabled = true;
        return;
    }
    let totalPrice = 0;
    selectedIds.forEach(id => {
        const seat = seats.find(s => s.id === id);
        totalPrice += seat.price;
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = id;
        summaryContainer.appendChild(chip);
    });
    totalAmountEl.textContent = "Rs." + totalPrice;
    confirmBtn.disabled = false;
}

document.querySelector(".btn-clear").addEventListener("click", function () {
    selectedIds = [];
    renderSeatMap();
    updateSummary();
});

document.querySelector(".btn-confirm").addEventListener("click", function () {
    if (selectedIds.length === 0) return;
    let totalCost = 0;
    selectedIds.forEach(id => {
        const seat = seats.find(s => s.id === id);
        totalCost += seat.price;
        seat.status = "booked";
    });
    const newBooking = {
        id: "TXN-" + Date.now(),
        date: new Date().toLocaleString(),
        seats: [...selectedIds],
        total: totalCost,
        status: "confirmed"
    };
    bookings.push(newBooking);
    saveSeats();
    saveBookings();
    selectedIds = [];
    renderSeatMap();
    updateSummary();
    renderBookings();
});

function renderBookings() {
    const list = document.getElementById("bookingsList");
    list.innerHTML = "";
    if (bookings.length === 0) {
        list.innerHTML = '<div class="no-bookings">No past bookings found.</div>';
        return;
    }
    [...bookings].reverse().forEach(bkg => {
        const card = document.createElement("div");
        card.className = "booking-card";
        const pillClass = bkg.status === "confirmed" ? "confirmed" : "cancelled";
        card.innerHTML = `
            <div class="booking-top">
                <span class="booking-id">${bkg.id}</span>
                <span class="status-pill ${pillClass}">${bkg.status}</span>
            </div>
            <div class="booking-seats">
                Seats: <strong>${bkg.seats.join(", ")}</strong>
            </div>
            <div class="booking-bottom">
                <span class="booking-total">Rs.${bkg.total}</span>${bkg.status === "confirmed" ? `<button class="btn-cancel" data-id="${bkg.id}">Cancel</button>` : ""}
            </div>
        `;

        list.appendChild(card);
    });
}

document.getElementById("bookingsList").addEventListener("click", function (event) {
    const clickedBtn = event.target;
    if (!clickedBtn.classList.contains("btn-cancel")) return;
    const txnId = clickedBtn.dataset.id;
    const bkgData = bookings.find(b => b.id === txnId);
    if (!bkgData) return;
    bkgData.status = "cancelled";
    bkgData.seats.forEach(seatId => {
        const seatToFree = seats.find(s => s.id === seatId);
        if (seatToFree) {
            seatToFree.status = "available";
        }
    });
    saveSeats();
    saveBookings();
    renderSeatMap();
    renderBookings();
});

loadState();
renderSeatMap();
updateSummary();
renderBookings();