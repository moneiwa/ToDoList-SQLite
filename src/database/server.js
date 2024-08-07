import Database from 'better-sqlite3';
import express from 'express';
import cors from 'cors';

const db = new Database('app.db');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            todo TEXT NOT NULL,
            priority TEXT NOT NULL
        )
    `;
    db.prepare(sql).run();
};
createTable();

app.post('/todos', (req, res) => {
    const { name, todo,priority } = req.body;
    if (!name || !todo || !priority) {
        return res.status(400).json({ error: 'Name and todo are required' });
    }
    const sql = `
        INSERT INTO todos (name, todo, priority)
        VALUES (?, ?, ?)
    `;
    try {
        const info = db.prepare(sql).run(name, todo, priority);
        res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
        console.error('Error inserting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/todos', (req, res) => {
    const sql = `
        SELECT * FROM todos
    `;
    try {
        const rows = db.prepare(sql).all();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT * FROM todos
        WHERE id = ?
    `;
    try {
        const row = db.prepare(sql).get(id);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




const createRegisterTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS Register (
            Username TEXT NOT NULL,
            Password INTEGER NOT NULL
        )
    `;
    db.prepare(sql).run();
};
createRegisterTable ();

app.post('/Registers', (req, res) => {
    const {Username,  Password } = req.body;
    if (!Username || ! Password) {
        return res.status(400).json({ error: ' password' });
    }
    const sql = `
        INSERT INTO Register (Username, Password)
        VALUES (?, ?) 
    `;
    try {
        const info = db.prepare(sql).run(Username,  Password);
        res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
        console.error('Error inserting register:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Registers', (req, res) => {
    const sql = `
        SELECT * FROM Register
    `;
    try {
        const rows = db.prepare(sql).all();
        res.json(rows);
    } catch (error) {
        console.error('Error fetching Register:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Registers', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT * FROM Register
        WHERE id = ?
    `;
    try {
        const row = db.prepare(sql).get(id);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'not found' });
        }
    } catch (error) {
        console.error('Error fetching:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        DELETE FROM todos
        WHERE id = ?
    `;
    try {
        const info = db.prepare(sql).run(id);
        if (info.changes > 0) {
            res.json({ message: 'Todo deleted successfully' });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { name, todo } = req.body;

   
    if (!name || !todo) {
        return res.status(400).json({ error: 'Name and todo are required' });
    }

    const sql = `
        UPDATE todos
        SET name = ?, todo = ?
        WHERE id = ?
    `;
    try {
        const info = db.prepare(sql).run(name, todo, id);
        if (info.changes > 0) {
            res.json({ message: 'Todo updated successfully' });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//Start
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
