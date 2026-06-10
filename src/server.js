import http from 'node:http'
import fs from 'node:fs/promises'

const FILE_PATH = new URL('./template.html', import.meta.url).pathname;

const format = (notes) => {
    return notes.map(note => {
        
    })
}

const interpolate = (html, notes) => {
    const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;

    const htmlFinal = html.replace(regex, (match, key) => {
        return notes[key] || ''; 
    });
}

const createServer = (port = 5000) => {
    const server = http.createServer(async (req, res) => {
        const template = await fs.readFile(FILE_PATH, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(template)
    });

    server.listen(port)
    console.log(`Server listening at http://localhost:${port}`);
}

createServer();