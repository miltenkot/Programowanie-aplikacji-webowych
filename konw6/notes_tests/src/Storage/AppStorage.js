"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppStorage {
    constructor() { }
    saveToLocalStorage(noteArr) {
        localStorage.setItem("noteLS", JSON.stringify(noteArr));
    }
    getNotesFromLocalStorage() {
        const notes = localStorage.getItem("noteLS");
        if (notes) {
            return JSON.parse(notes);
        }
        else {
            return;
        }
    }
}
const appStorage = new AppStorage();
exports.default = appStorage;
//# sourceMappingURL=AppStorage.js.map