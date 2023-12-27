const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'notes_app',
    user: 'root',
    password: 'Belgeee97',
});

const app = express();

app.use(express.json());
app.use(cors());

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes App API',
            version: '1.0.0',
            description: 'API for managing notes',
        },
    },
    apis: ['backend/express.js'], // Your application code files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /notes/{title}:
 *   get:
 *     summary: Get a note by title
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the note
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
app.get('/notes/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const [rows] = await pool.query('SELECT * FROM notes WHERE title = ?', [title]);
        res.send(rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               contents:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
app.post('/notes', async (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        return res.status(400).send('Title and contents are required');
    }

    try {
        const [result] = await pool.query('INSERT INTO stars (title, contents) VALUES (?, ?)', [title, contents]);
        const id = result.insertId;
        const newNote = await pool.query('SELECT * FROM stars WHERE id = ?', [id]);
        res.status(201).send(newNote[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke 💩');
});

const PORT = 8080; // Change the port to 8081
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



app.post('/stars', async (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        return res.status(400).send('Title and contents are required');
    }

    try {
        const [result] = await pool.query('INSERT INTO stars (title, contents) VALUES (?, ?)', [title, contents]);
        const id = result.insertId;
        const newNote = await pool.query('SELECT * FROM stars WHERE id = ?', [id]);
        res.status(201).send(newNote[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
});