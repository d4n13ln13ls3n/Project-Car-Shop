"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vehicle_1 = require("./Vehicle");
class Car extends Vehicle_1.default {
    constructor(car) {
        super(car);
        this.doorsQty = car.doorsQty;
        this.seatsQty = car.seatsQty;
    }
    setDoorsQty(doorsQty) {
        this.doorsQty = doorsQty;
    }
    getDoorsQty() {
        return this.doorsQty;
    }
    setSeatsQty(seatsQty) {
        this.seatsQty = seatsQty;
    }
    getSeatsQty() {
        return this.seatsQty;
    }
}
exports.default = Car;
