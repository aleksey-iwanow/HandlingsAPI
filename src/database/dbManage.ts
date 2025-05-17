import { Database } from './database';

const db = new Database();

const args = process.argv.slice(2);
const command = args[0];

if (command === 'init') {
    console.log("init database");
    db.createTableHandlings();

    setTimeout(() => db.closeConnection(), 500);
} else {
    console.log(`Not found -> ${command}`);
    console.log('Available commands:');
    console.log('  init - initialize database');
}