
function checkDepartment(department) {
    return (req, res, next) => {
        if (
            req.decodedToken &&
            req.decodedToken.department &&
            req.decodedToken.department.toLowerCase() === department
        ) {
            next();
        } else {
            res.status(403).json({ message: 'Your have the wrong department to access this information.' })
        }
    }
}

module.exports = checkDepartment;