import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { findNote, getAllNotes, newNote, removeAll, removeNote } from './note.js';

yargs(hideBin(process.argv))
    .command('new <note>', 'create a new note', yargs => {
        return yargs.positional('note', {
            describe: 'the content of the note you want to create',
            type: 'string'
        })
    }, async (argv) => {
        const tags = argv.tags ? argv.tags.split(',') : []
        console.log(await newNote(argv.note, tags));
    })
    .option('tags', {
        alias: 't',
        type: 'string',
        description: 'tags to add to the note'
    })
    .command('all', 'get all notes', yargs => {}, async (argv) => {
        console.log(await getAllNotes())
    })
    .command('find <filter>', 'get matchign notes', yargs => {
        return yargs.positional('filter', {
            describe: 'The search term to filter notes by, will be applied to note.content',
            type: 'string'
        })
    }, async (argv) => {
        console.log(await findNote(argv.filter))
    })
    .command('remove <id>', 'remove a note by id', yargs => {
        return yargs.positional('id', {
            type: 'number',
            description: 'The id off the note you want to remove'
        })
    }, async (argv) => {
        removeNote(argv.id);
    })
    .command('web [port]', 'launch website to see notes', yargs => {
        return yargs.positional('port', {
            describe: 'port to bind on',
            default: 5000,
            type: 'number'
        })
    }, async (argv) => {

    })
    .command('clean', 'remove all notes', () => {}, async (argv) => {
        removeAll();
    })
    .demandCommand(1)
    .parse()