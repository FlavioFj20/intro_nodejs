import { getDB, insertDB, saveDB } from './bd.js'

export const newNote = async (note, tags = []) => {
    const newNote = {
        tags,
        id: Date.now(),
        content: note,
    };
    await insertDB(newNote);
    return newNote;
}

export const getAllNotes = async () => {
    const {notes} = await getDB();
    return notes;
}

export const findNote = async (filte) => {
    const {notes} = await getDB();
    const matches = notes.filter((note) => note.content.includes(filte))
    return matches
}

export const removeNote = async (id) => {
    const {notes} = await getDB();
    const match = notes.find(note => note.id === id);
    if (match){
        const newNotes = notes.filter((note) => note.id !== id)
        await saveDB({notes: newNotes})
        return id
    }
}

export const removeAll = async () => {
    const db = {
        notes: [] 
    };
    return await saveDB(db);
}