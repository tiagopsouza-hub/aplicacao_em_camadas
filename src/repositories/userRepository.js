import pool from '../configs/Database.js';

const userRepository = {
    selecionar: async () => {
        const sql = 'SELECT id, name, email, password FROM users ORDER BY id DESC;';
        const rows = await pool.execute(sql);
        return rows[0];
    },
    selecionarPorId: async (userId) => {
        const sql = 'SELECT id, name, email, password FROM users WHERE id = ?;';
        const rows = await pool.execute(sql, [userId]);
        return rows[0];
    },
    selecionarPorEmail: async (email) => {
        const sql = 'SELECT id, name, email, password FROM users WHERE email = ?;';
        const rows = await pool.execute(sql, [email]);
        return rows[0];
    },
    deletar: async (userId) => {
        const sql = 'DELETE FROM users WHERE id = ?;';
        const rows = await pool.execute(sql, [userId]);
        return rows[0];
    },
    criar: async (name, email, password) => {
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?);';
        const rows = await pool.execute(sql, [name, email, password]);
        return rows[0];
    },
    atualizar: async (userId, name, email, password) => {
        const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?;';
        const rows = await pool.execute(sql, [name, email, password, userId]);
        return rows[0];
    },
};

export default userRepository;