const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generate-token.js');

const Users= require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 11);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            const token = generateToken(saved);
            res.status(201).json({ 
                message: `Welcome, ${saved.username}!`,
                user: saved,
                token
            });
        })
        .catch(({ name, code, message, stack }) => {
            res.status(500).json({ name, code, message, stack });
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({
                    message: `Welcome, ${user.username}!`,
                    token
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials Provided' });
            }
        })
        .catch(({ name, code, message, stack }) => {
            res.status(500).json({ name, code, message, stack });
        });
});

module.exports = router;