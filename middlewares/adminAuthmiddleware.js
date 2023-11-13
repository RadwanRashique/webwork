//   to verify token

require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    try {

        const admintoken = req.headers['authorization'].split(" ")[1]
       
        jwt.verify(admintoken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.log(err);
                return res.status(401).send({
                    message: "Auth failed",
                    success: false

                })
            }
            else {

                req.body.adminId = decode.id

                next()
            }
        })
    }
    catch (error) {

        return res.status(500).send({ message: "Internal server error", success: false });



    }
}