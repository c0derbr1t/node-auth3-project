const router = require('express').Router();
const jwt = require('jsonwebtoken');
const checkDepartment = require('../middleware/check-department-middleware.js');

const Users = require('./users-model.js');

router.get('/', (req, res) => {
    const { authorization } = req.headers;

    let decoded = jwt.decode(authorization);
    Users.findByDept(decoded.department)
    .then(users => {
        res.json(users);
    })
    .catch(({ name, code, message, stack }) => {
        res.status(500).json({ name, code, message, stack });
    });

});

router.get('/all', checkDepartment('admin'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(({ name, code, message, stack }) => {
            res.status(500).json({ name, code, message, stack });
        });
})

module.exports = router;