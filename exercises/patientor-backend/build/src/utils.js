"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseStringProperty = (property, name) => {
    if (!property || !isString(property)) {
        throw new Error(`Incorrect or missing ${name}: ${property}`);
    }
    return property;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isEntries = (array) => {
    return isArray(array) && array.every(v => isString(v));
};
const isArray = (array) => {
    return (array instanceof Array);
};
const parseEntries = (entries) => {
    if (!entries || !isEntries(entries)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }
    return entries;
};
const toNewPatient = (object) => {
    const objectAsPatient = object;
    return {
        name: parseStringProperty(objectAsPatient.name, 'name'),
        dateOfBirth: parseDate(objectAsPatient.dateOfBirth),
        ssn: parseStringProperty(objectAsPatient.ssn, 'ssn'),
        gender: parseGender(objectAsPatient.gender),
        occupation: parseStringProperty(objectAsPatient.occupation, 'occupation'),
        entries: parseEntries(objectAsPatient.entries)
    };
};
exports.default = toNewPatient;
