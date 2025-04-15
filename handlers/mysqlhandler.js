const mysql = require('mysql2/promise');
require('dotenv').config();

let pool = null;


async function initializeConnection(config = {}) {
    try {
        const defaultConfig = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DATABASE || 'discord-bot',
            port: process.env.DB_PORT || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };


        const finalConfig = { ...defaultConfig, ...config };


        pool = mysql.createPool(finalConfig);
        

        const connection = await pool.getConnection();
        console.log('MySQL connection established successfully');
        connection.release();
        
        return pool;
    } catch (error) {
        console.error('Error initializing MySQL connection:', error);
        throw error;
    }
}


async function query(sql, params = []) {
    if (!pool) {
        throw new Error('MySQL connection not initialized. Call initializeConnection() first.');
    }

    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}


async function insert(table, data) {
    if (!pool) {
        throw new Error('MySQL connection not initialized. Call initializeConnection() first.');
    }

    try {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);

        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        const [result] = await pool.execute(sql, values);
        
        return result;
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}


async function update(table, data, conditions) {
    if (!pool) {
        throw new Error('MySQL connection not initialized. Call initializeConnection() first.');
    }

    try {
        const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
        const values = [...Object.values(data), ...Object.values(conditions)];

        const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        const [result] = await pool.execute(sql, values);
        
        return result;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}


async function remove(table, conditions) {
    if (!pool) {
        throw new Error('MySQL connection not initialized. Call initializeConnection() first.');
    }

    try {
        const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
        const values = Object.values(conditions);

        const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
        const [result] = await pool.execute(sql, values);
        
        return result;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}


async function closeConnection() {
    if (pool) {
        await pool.end();
        console.log('MySQL connection closed');
    }
}

module.exports = {
    initializeConnection,
    query,
    insert,
    update,
    remove,
    closeConnection
};