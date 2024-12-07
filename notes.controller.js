const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        id: Date.now().toString(),
        title,
    };

    notes.push(note);
    await saveNotes(notes);
    console.log(chalk.green('Note was added!'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });

    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(id) {
    const notes = await getNotes();
    const filteredNotes = notes.filter(note => note.id !== id);

    await saveNotes(filteredNotes);
    console.log(chalk.red(`Note with id="${id}" has been removed!`));
}

async function updateNote(noteData) {
    const notes = await getNotes();
    const noteIndex = notes.findIndex(note => note.id === noteData.id);

    if (noteIndex >= 0) {
        notes[noteIndex] = { ...notes[noteIndex], ...noteData };
        await saveNotes(notes);
        console.log(
            chalk.green(`Note with id="${noteData.id}" has been updated!`)
        );
    }
}

module.exports = {
    addNote,
    getNotes,
    removeNote,
    updateNote,
};
