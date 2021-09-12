"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("firebase");
const config_1 = require("../Configuration/config");
const firebaseApp = firebase_1.default.initializeApp(config_1.firebaseConfig);
const db = firebaseApp.firestore();
class AppFirebaseStorage {
    constructor() { }
    addNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db.collection('notes').add(note)
                .then(function (docRef) {
                return docRef.id;
            });
            return Promise.resolve(res);
            ;
        });
    }
    getFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db.collection('notes').get().then(res => ({
                data: res.docs.map((res) => ({
                    data: res.data(),
                    id: res.id
                }))
            }));
            const data = res.data.map((note) => (Object.assign(Object.assign({}, note.data), { id: note.id })));
            return Promise.resolve(data);
        });
    }
    updateNote(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db.collection('notes').doc(id).update(note);
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db.collection('notes').doc(id).delete();
        });
    }
}
const appFireStorage = new AppFirebaseStorage;
exports.default = appFireStorage;
//# sourceMappingURL=AppFirebaseStorage.js.map