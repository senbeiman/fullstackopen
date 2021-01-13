"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = patientService_1.default.getNonSensitiveEntries();
    res.send(patients);
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getEntry(req.params.id);
    if (!patient) {
        res.sendStatus(404);
    }
    else {
        res.send(patient);
    }
});
router.post('/', (req, res) => {
    const newEntry = utils_1.default(req.body);
    const addedEntry = patientService_1.default.addEntry(newEntry);
    res.json(addedEntry);
});
exports.default = router;
