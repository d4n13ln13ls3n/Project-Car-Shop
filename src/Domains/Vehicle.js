"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vehicle {
    constructor(vehicle) {
        this.status = false;
        this.id = vehicle.id;
        this.model = vehicle.model;
        this.year = vehicle.year;
        this.color = vehicle.color;
        if (vehicle.status) {
            this.status = vehicle.status;
        }
        this.buyValue = vehicle.buyValue;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setModel(model) {
        this.model = model;
    }
    getModel() {
        return this.model;
    }
    setYear(year) {
        this.year = year;
    }
    getYear() {
        return this.year;
    }
    setColor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    setBuyValue(buyValue) {
        this.buyValue = buyValue;
    }
    getBuyValue() {
        return this.buyValue;
    }
}
exports.default = Vehicle;
