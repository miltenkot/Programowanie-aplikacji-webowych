"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("./Note/Note");
const Notes_1 = require("./Notes/Notes");
require("./SCSS/reset.scss");
require("./SCSS/main.scss");
const AppFirebaseStorage_1 = require("./Storage/AppFirebaseStorage");
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
    let newNote = note.saveToNote('', inputTitle.value, inputText.value, "lightgray", false);
    notes.notesDiv.appendChild(notes.createNote(newNote));
    AppFirebaseStorage_1.default.addNote(newNote).then(res => {
        newNote.id = res;
    });
});
window.addEventListener('load', () => {
    AppFirebaseStorage_1.default.getFromStorage().then(function (data) {
        data.forEach(ele => {
            let note = ele;
            if (note.isPinned) {
                pinned.appendChild(notes.createNote(note));
            }
            else {
                notesDiv.appendChild(notes.createNote(note));
            }
        });
    });
});
//# sourceMappingURL=index.js.map