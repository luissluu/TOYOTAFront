const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(dbConfig);

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Conexión exitosa a SQL Server');
    } catch (error) {
        console.error('Error al conectar a SQL Server:', error);
        process.exit(1);
    }
};

module.exports = {
    pool,
    connectDB
}; 