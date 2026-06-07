import fs from 'node:fs/promises'

const DB_PATH = new URL('../bd.json', import.meta.url).pathname

export const getDB = async () => {
    const db = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(db);
}

export const saveDB = async (db) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 4));
    return db;
}

export const insertDB = async (note) => {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
}