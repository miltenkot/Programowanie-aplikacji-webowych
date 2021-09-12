"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const App_1 = require("../App");
require("./SCSS/note.scss");
const enum_1 = require("../Enums/enum");
const AppFirebaseStorage_1 = require("../Storage/AppFirebaseStorage");
class Notes {
    createNote(note) {
        let noteDiv = document.createElement("div");
        noteDiv.id = App_1.default.counter.toString();
        noteDiv.className = "note";
        noteDiv.style.backgroundColor = note.bgColor;
        let noteInnerWrapper = document.createElement("div");
        noteInnerWrapper.id = "noteInnerWrapper" + App_1.default.counter;
        noteInnerWrapper.className = "noteInnerWrapper";
        let noteDragDiv = document.createElement("div");
        noteDragDiv.id = "noteDrag" + App_1.default.counter;
        noteDragDiv.className = "noteDrag";
        let newDate = new Date();
        let noteDate = document.createElement("span");
        noteDate.id = "noteDate" + App_1.default.counter;
        noteDate.className = "noteDate";
        noteDate.innerHTML = newDate.toISOString().split('T')[0];
        let noteTitleDiv = document.createElement("div");
        noteTitleDiv.id = "noteTitle" + App_1.default.counter;
        noteTitleDiv.className = "noteTitle";
        noteTitleDiv.contentEditable = "true";
        let title = document.createElement("span");
        title.id = "noteTitle" + App_1.default.counter;
        title.className = "noteTitle";
        title.innerHTML = note.title;
        title.addEventListener('DOMSubtreeModified', () => {
            AppFirebaseStorage_1.default.updateNote(note.id, {
                title: title.innerHTML,
            });
        });
        let noteCloseButton = document.createElement("button");
        noteCloseButton.id = "noteCloseButton" + App_1.default.counter;
        noteCloseButton.className = "noteCloseButton";
        noteCloseButton.innerHTML = 'X';
        this.noteCloseEvent(noteCloseButton, note);
        let noteTextArea = document.createElement("textarea");
        noteTextArea.id = "noteTextArea" + App_1.default.counter;
        noteTextArea.className = "noteTextArea";
        noteTextArea.innerHTML = note.text;
        noteTextArea.rows = 8;
        this.noteCheckTextAreaEvent(noteTextArea, note);
        let noteButtons = document.createElement("div");
        noteButtons.id = "noteButtonsDiv";
        let pinNote = document.createElement("checkbox");
        pinNote.id = "pinNote";
        pinNote.className = "noteButtons";
        pinNote.innerText = "PIN";
        this.notePinEvent(pinNote, noteDiv, note);
        let noteChangeColor = document.createElement("button");
        noteChangeColor.id = "noteChangeColor";
        noteChangeColor.className = "noteButtons";
        noteChangeColor.innerText = "COLOR";
        this.noteChangeColorEvent(noteChangeColor, noteDiv, note);
        noteDiv.appendChild(noteDragDiv);
        noteDragDiv.appendChild(noteDate);
        noteDiv.appendChild(noteInnerWrapper);
        noteInnerWrapper.appendChild(noteTitleDiv);
        noteTitleDiv.appendChild(title);
        noteInnerWrapper.appendChild(noteCloseButton);
        noteInnerWrapper.appendChild(noteTextArea);
        noteDiv.appendChild(noteButtons);
        noteButtons.appendChild(pinNote);
        noteButtons.appendChild(noteChangeColor);
        return noteDiv;
    }
    noteCloseEvent(noteCloseButton, note) {
        noteCloseButton.onclick = () => {
            noteCloseButton.parentNode.parentNode.parentNode.removeChild(noteCloseButton.parentNode.parentNode);
            AppFirebaseStorage_1.default.deleteNote(note.id);
        };
    }
    noteCheckTextAreaEvent(noteTextArea, note) {
        noteTextArea.addEventListener('change', () => {
            AppFirebaseStorage_1.default.updateNote(note.id, {
                text: noteTextArea.value,
            });
        });
    }
    notePinEvent(pinNote, noteDiv, note) {
        pinNote.addEventListener('click', () => {
            if (!note.isPinned) {
                this.pinnedDiv.appendChild(noteDiv);
                AppFirebaseStorage_1.default.updateNote(note.id, {
                    isPinned: true,
                });
            }
            else {
                this.notesDiv.appendChild(noteDiv);
                AppFirebaseStorage_1.default.updateNote(note.id, {
                    isPinned: false,
                });
            }
        });
    }
    noteChangeColorEvent(noteChangeColor, noteDiv, note) {
        noteChangeColor.addEventListener('click', () => {
            if (document.querySelector("#changeColorDiv") == null) {
                let wrapper = document.createElement("div");
                wrapper.id = "changeColorDiv" + App_1.default.counter;
                wrapper.className = "changeColorDiv";
                wrapper.tabIndex = 1;
                noteDiv.appendChild(wrapper);
                wrapper.focus();
                wrapper.addEventListener('focusout', () => {
                    wrapper.parentNode.removeChild(wrapper);
                });
                for (let i = 0; i < 6; i++) {
                    let colorDiv = document.createElement("div");
                    colorDiv.className = 'colorDiv';
                    colorDiv.id = enum_1.Colors[i];
                    let colorCircle = document.createElement("div");
                    colorCircle.className = "colorCircle";
                    colorCircle.style.backgroundColor = enum_1.Colors[i];
                    colorCircle.addEventListener('click', () => {
                        noteDiv.style.backgroundColor = colorCircle.style.backgroundColor;
                        AppFirebaseStorage_1.default.updateNote(note.id, {
                            bgColor: colorCircle.style.backgroundColor,
                        });
                    });
                    colorDiv.appendChild(colorCircle);
                    wrapper.appendChild(colorDiv);
                }
            }
        });
    }
}
exports.Notes = Notes;
exports.default = Notes;
//# sourceMappingURL=Notes.js.map