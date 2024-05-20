import pg from 'pg';
import { dbUser, dbhost, dbname, dbpass, dbport } from './config.js';

export const pool = new pg.Pool({
    user: dbUser,
    host: dbhost,
    password: dbpass,
    database: dbname,
    port: dbport

})


