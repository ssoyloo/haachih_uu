// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const app = express();

// // Configure passport and session middleware
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Mock user data (replace this with your actual user data)
// const users = [
//   { id: 1, username: 'user1', password: 'password1' },
//   { id: 2, username: 'user2', password: 'password2' }
// ];

// // Passport local strategy for authentication
// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     const user = users.find(u => u.username === username && u.password === password);
//     if (!user) return done(null, false);
//     return done(null, user);
//   }
// ));

// // Serialize and deserialize user for session management
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => {
//   const user = users.find(u => u.id === id);
//   done(null, user);
// });

// // Route to check if the user is logged in
// app.get('/api/user', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ username: req.user.username });
//   } else {
//     res.json({ username: null });
//   }
// });

// // Login endpoint
// app.post('/api/login',
//   passport.authenticate('local'),
//   (req, res) => {
//     res.json({ message: 'Login successful', username: req.user.username });
//   });

// // Logout endpoint
// app.get('/api/logout', (req, res) => {
//   req.logout();
//   res.json({ message: 'Logout successful' });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
