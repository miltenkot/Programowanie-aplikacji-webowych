import Note  from '../../src/Note/Note';

describe('Note', () => {
    it('completeNote', () => {
        const note = new Note();
        note.saveToNote(0, "title","text", "lightgray", false);
        expect.objectContaining({
            id: expect.any(String),
            title: 'title',
            text: 'text',
            bgColor: "lightgray",
            isPinned: false,
            date: '2021-06-15'
        })
    })
})

describe('Note', () => {
    it('noTitle', () => {
        const note = new Note();
        note.saveToNote(0, "","text", "lightgray", false);
        expect(() => note.saveToNote(0, "", "text", "lightgray", false))
        .toThrowError
    })
})