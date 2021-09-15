"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const App_1 = require("../App");
require("../Styles/note.scss");
const enum_1 = require("../Enums/enum");
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
            note.title = title.innerHTML;
        });
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
        let noteCloseButton = document.createElement("button");
        noteCloseButton.id = "noteCloseButton" + App_1.default.counter;
        noteCloseButton.className = "noteButtons";
        noteCloseButton.innerHTML = 'X';
        this.noteCloseEvent(noteCloseButton, note);
        noteDiv.appendChild(noteDragDiv);
        noteDragDiv.appendChild(noteDate);
        noteDiv.appendChild(noteInnerWrapper);
        noteInnerWrapper.appendChild(noteTitleDiv);
        noteTitleDiv.appendChild(title);
        noteInnerWrapper.appendChild(noteTextArea);
        noteDiv.appendChild(noteButtons);
        noteButtons.appendChild(pinNote);
        noteButtons.appendChild(noteChangeColor);
        noteButtons.appendChild(noteCloseButton);
        return noteDiv;
    }
    noteCloseEvent(noteCloseButton, note) {
        noteCloseButton.onclick = () => {
            noteCloseButton.parentNode.parentNode.parentNode.removeChild(noteCloseButton.parentNode.parentNode);
            App_1.default.noteArr.splice(App_1.default.noteArr.indexOf(App_1.default.noteArr.find(element => element.id == note.id)), 1);
            App_1.default.noteLS.splice(App_1.default.noteLS.indexOf(App_1.default.noteLS.find(element => element.id == note.id)), 1);
        };
    }
    noteCheckTextAreaEvent(noteTextArea, note) {
        noteTextArea.addEventListener('change', () => {
            note.text = noteTextArea.value;
        });
    }
    notePinEvent(pinNote, noteDiv, note) {
        pinNote.addEventListener('click', () => {
            if (!note.isPinned) {
                this.pinnedDiv.appendChild(noteDiv);
                note.isPinned = true;
            }
            else {
                this.notesDiv.appendChild(noteDiv);
                note.isPinned = false;
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
                        note.bgColor = colorCircle.style.backgroundColor;
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