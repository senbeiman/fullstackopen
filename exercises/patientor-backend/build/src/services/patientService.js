"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getEntry = (id) => {
    const patient = patients_1.default.find(p => p.id === id);
    return patient;
};
const getNonSensitiveEntries = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return patients_1.default.map((_a) => {
        var { ssn, entries } = _a, rest = __rest(_a, ["ssn", "entries"]);
        return (Object.assign({}, rest));
    });
};
const getNonSensitiveEntry = (id) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const patient = patients_1.default.map((_a) => {
        var { ssn, entries } = _a, rest = __rest(_a, ["ssn", "entries"]);
        return (Object.assign({}, rest));
    })
        .find(p => p.id === id);
    return patient;
};
const addEntry = (entry) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    getNonSensitiveEntry,
    addEntry,
    getEntry
};
