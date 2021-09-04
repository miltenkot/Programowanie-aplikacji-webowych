"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const App_1 = require("../App");
class Note {
    saveToNote(noteId, noteTitle, noteText, noteBgColor, isNotePinned) {
        let newDate = new Date();
        let note = {
            id: noteId,
            title: noteTitle,
            text: noteText,
            bgColor: noteBgColor,
            isPinned: isNotePinned,
            date: newDate.toISOString().split('T')[0]
        };
        return note;
    }
    noteToArr(note) {
        App_1.default.noteArr.push(note);
        App_1.default.counter++;
    }
}
exports.Note = Note;
exports.default = Note;
//# sourceMappingURL=Note.js.map