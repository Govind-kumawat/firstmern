const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const router = require('express').Router();

require('../db/conn');

router.get('/', (req, res) => {
    res.send(`Hello World from the server router js`);
});

// router.post('/register', (req, res) => {
//     // console.log(req.body);
//     const {name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "Plz filled proper information"});
//     }

//     User.findOne({email : email})
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//              res.status(201).json({message: "User registered successfully"});
//         }).catch((err) => { res.status(500).json({error: "Failed to registered"})
//         });
//     }).catch((err) => {console.log(err)});

// });
// register router
router.post('/register', async (req, res) => {
    // console.log(req.body);
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz filled proper information" });
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (err) {
        console.log(err);
    }

});

// Login router

router.post('/signin', async (req, res) => {
    // console.log(req.body);

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.json({ error: "Plz filled correctly" });
        }
        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            let token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credential" });
            } else {
                res.json({ message: "user login successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid credential" });
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/about', authenticate, (req, res) => {
    console.log('Hello my About');
    res.send(req.rootUser);
});

module.exports = router;