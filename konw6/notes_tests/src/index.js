"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const AppStorage_1 = require("./Storage/AppStorage");
const Note_1 = require("./Note/Note");
const Notes_1 = require("./Notes/Notes");
require("./Styles/main.scss");
const note = new Note_1.default();
const notes = new Notes_1.default();
const pinned = document.querySelector("#pinnedNotes");
const notesDiv = document.querySelector("#notes");
const inputTitle = document.querySelector("#inputTitle");
const inputText = document.querySelector("#inputText");
const submitButton = document.querySelector("#submitButton");
notes.pinnedDiv = pinned;
notes.notesDiv = notesDiv;
submitButton.addEventListener('click', () => {
    let newNote = note.saveToNote(App_1.default.counter, inputTitle.value, inputText.value, "lightgray", false);
    note.noteToArr(newNote);
    notes.notesDiv.appendChild(notes.createNote(newNote));
});
window.addEventListener('beforeunload', function () {
    AppStorage_1.default.saveToLocalStorage(App_1.default.noteArr);
});
window.addEventListener('load', () => {
    App_1.default.noteLS = AppStorage_1.default.getNotesFromLocalStorage();
    if (App_1.default.noteLS) {
        App_1.default.noteLS.forEach((elem, index) => {
            App_1.default.noteArr[index] = App_1.default.noteLS[index];
            if (App_1.default.noteLS[index].isPinned) {
                pinned.appendChild(notes.createNote(App_1.default.noteLS[index]));
            }
            else {
                notesDiv.appendChild(notes.createNote(App_1.default.noteLS[index]));
            }
        });
    }
});
//# sourceMappingURL=index.js.map