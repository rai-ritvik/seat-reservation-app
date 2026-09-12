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