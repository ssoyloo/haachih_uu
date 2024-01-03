const db = require('../config/database');

const authenticateUser = async (username, password) => {
    return db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
};

exports.authenticate = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await authenticateUser(username, password);

        if (rows.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/index');
        } else {
            const errorMessage = 'Incorrect Username or Password';
            console.log(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
};


exports.register = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        try {
            await db.query('INSERT INTO users(username, password) VALUES (?, ?)', [username, password]);
            res.redirect('/');
        } catch (error) {
            console.error(error);
        }
    } else {
        const errorMessage = 'Please Enter Username and Password';
        res.status(400).send(errorMessage);
    }
};


exports.logout = (req, res) => {
    if (req.session.loggedin) {

        req.session.destroy((err) => {
            res.redirect('/');
        });
    } else {
        const errorMessage = 'Yu c bolciw.';
        res.status(401).send(errorMessage);
    }
};

// exports.createNote = async (req, res) => {
//     try {
//         const username = req.session.username;
//         const { title, contents } = req.body;
//        if (!title || !contents) {
//             return res.status(400).send("Title and contents are required");
//         }
//         const [result] = await db.query(
//             "INSERT INTO notes (title, contents, username) VALUES (?, ?, ?)",
//             [title, contents, username]
//         );
//         const id = result.insertId;
//         const newNote = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
//         res.status(201).send(newNote[0]);
//     } catch (error) {
//         console.error("Error executing query:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };
