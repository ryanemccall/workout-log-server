const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const validateSession = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const { authorization } = req.headers;
        console.log("authorization -->", authorization);
        const payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer")
            ? authorization.split(" ")[1] //This creates an array with Bearer at 0 and the token at 1 then we call the token
            : authorization,
            "Hello I am a secret" //can also be process.env.JWT_SECRET if we downloaded and created the ENV file
        )
        : undefined;

        console.log("payload -->", payload);

        if (payload) {
            let foundUser = await UserModel.findOne({ where: { id: payload.id } });
            console.log("foundUser -->", foundUser);

            if(foundUser) {
                console.log("request -->", req);
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({ message: "Not Authorized" });
            }
        } else {
            res.status(401).send({ message: "Invalid token" });
        }
    } else {
        res.status(403).send({ message: "Forbidden" });
    }
}

module.exports = validateSession;