const router = require("express").Router();
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const {username, password } = req.body;

    try {
        const NewUser = await UserModel.create({
                username,
                password: bcrypt.hashSync(password, 13)
        })

        let token = jwt.sign(
            { id : NewUser.id },
            //check this for naming convention
            'Hello I am a secret',
            {expiresIn : 60 * 60 * 24 }
        );

        res.status(201).json({
            NewUser,
            message: "Your account has been created!",
            token
        })
    } catch(error) {
        res.status(500).json({error})
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const LoggedInUser = await UserModel.findOne({
            where: {
                username: username
            } 
        })
        
        if (LoggedInUser) {
            let passwordComparison = await bcrypt.compare(password, LoggedInUser.passwordHash);
            if (passwordComparison) {
                let token = jwt.sign(
                    {id: LoggedInUser.id}, 
                    'Hello I am a secret', 
                    {expiresIn: 60 * 60 * 24}
                );
    
                res.status(200).json({
                    LoggedInUser,
                    message: "User successfully logged in!",
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        }
    } catch (error) {
        res.status(500).json({ error })
    }
});

module.exports = router;