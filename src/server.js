import http from 'node:http'
import fs from 'node:fs/promises'
import { getAllNotes } from './note.js';
import open from 'open'

const HTML_PATH = new URL('./template.html', import.meta.url).pathname;

const formatNotes = (notes) => {
    return notes.map(note => {
        const dateObj = new Date(note.id);
        const formatDate = dateObj.toLocaleDateString('pt-AO'); 
        const formatDateHour = dateObj.toLocaleString('pt-AO');
        return `
        <li class="note">
          <div class="note__header">
            <h2 class="note__title">Título da nota</h2>
            <span class="note__meta">${formatDateHour}</span>
          </div>
          <p class="note__content">${note.content}</p>
          <ul class="note__tags">
            ${note.tags.map((tag) => {
                return `<li class="note__tag">${tag}</li>`
            })}
          </ul>
        </li>`
    }).join('\n')
}

const interpolate = (html, notes) => {
    const htmlFinal = html.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g , 
        (match, key) => {
        return notes[key] || ''; 
    });
    return htmlFinal;
}

export const createServer = (port = 5000) => {
    const server = http.createServer(async (req, res) => {
        const notes = await getAllNotes();
        res.writeHead(200, { 'Content-Type': 'text/html' })
        const template = await fs.readFile(HTML_PATH, 'utf-8');
        const html = interpolate(template, {notes: formatNotes(notes)});
        res.end(html);
    });

    server.listen(port, () => {
        const address = `http://localhost:${port}`;
        console.log(`Server listening at ${address}`);
        open(address);
    })
}

//export const start = (notes, port) => { createServer(notes, port); }