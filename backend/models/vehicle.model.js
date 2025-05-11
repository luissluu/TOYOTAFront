const { pool } = require('../config/database');

class Vehicle {
    static async getAll() {
        try {
            const result = await pool.request()
                .query('SELECT * FROM Vehicles');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const result = await pool.request()
                .input('id', id)
                .query('SELECT * FROM Vehicles WHERE id = @id');
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(vehicleData) {
        try {
            const result = await pool.request()
                .input('model', vehicleData.model)
                .input('year', vehicleData.year)
                .input('price', vehicleData.price)
                .input('description', vehicleData.description)
                .query(`
                    INSERT INTO Vehicles (model, year, price, description)
                    VALUES (@model, @year, @price, @description);
                    SELECT SCOPE_IDENTITY() AS id;
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, vehicleData) {
        try {
            const result = await pool.request()
                .input('id', id)
                .input('model', vehicleData.model)
                .input('year', vehicleData.year)
                .input('price', vehicleData.price)
                .input('description', vehicleData.description)
                .query(`
                    UPDATE Vehicles 
                    SET model = @model,
                        year = @year,
                        price = @price,
                        description = @description
                    WHERE id = @id;
                    SELECT * FROM Vehicles WHERE id = @id;
                `);
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.request()
                .input('id', id)
                .query('DELETE FROM Vehicles WHERE id = @id');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Vehicle; 