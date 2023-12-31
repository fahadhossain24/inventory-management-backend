const authServices = require("../services/auth.services");
const sendEmail = require("../utils/sendMail");
const { genarateToken } = require("../utils/token");

//signup...........
exports.signUp = async (req, res) => {
    try {
        const user = await authServices.signUpService(req.body);

        if (!user._id) {
            return res.status(400).json({
                status: 'failed',
                error: 'sign up failed',
            })
        }


        const token = await user.emailConfirmationToken();

        await user.save({validateBeforeSave: false})

        // send email varification mail
        const info = await sendEmail(
            user.email,
            'Verify your account',
            `
                Thank you for sing up
                Please Click this verify button for verify your account
                <a href='${req.protocol}://${req.get('host')}${req.originalUrl}/confirmation/${token}' target='_blank'>Verify</a>
            `
            );
        
        if(!info.messageId){
            console.log('email not sent')
        }

        res.status(200).json({
            status: 'success',
            message: 'sign up successfull',
            data: user,
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'sign up failed',
            error: error.message,
        })
    }
}

exports.emailConfirmation = async(req, res) => {
    const userToken = req.params.token
    const user = await authServices.emailConfirmationService(userToken);
    if(!user){
        return res.status(403).json({
            status: 'failed',
            error: 'invalid token. request for send again email confirmation mail'
        })
    }
    const expired = new Date() > new Date(user?.confirmationTokenExpires);
    if(expired){
        return res.status(403).json({
            status: 'failed',
            error: 'Token link expired. request for send again confirmaiton mail'
        })
    }
    user.status = 'active';
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;

    user.save({validateBeforeSave: false})

    res.status(201).json({message: 'Your email varified. Now your account is active'})
}

//login................

/**
 * 1. check email and password are given
 * 2. load user by email and if no user then send res
 * 3. compare the user given password and database password,
 * 4. if not match then send res
 * 5. check the user status (active, inactive, blocked);
 * 6. if inactive or blocked then send response.
 * 7. genaret jwt token
 * 8. send user with token
 * 
 */
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // check email and password are given
        if (!email || !password) {
            res.status(400).json({
                status: 'failed',
                error: 'email or password is empty',
            })
        }

        // load user by email and if no user then send res
        const user = await authServices.getUserByEmailService(email);

        if (!user) {
            return res.status(401).json({
                status: 'failed',
                error: 'user not found. please create a account',
            })
        }


        // compare the user given password and database password,
        // if not match then send res
        const isValidPassword = user.comparePass(password, user.password)

        if (!isValidPassword) {
            res.status(403).json({
                status: 'failed',
                message: 'invalid email or password',
                error: error.message,
            })
        }


        // check the user status (active, inactive, blocked);
        // if inactive or blocked then send response.
        if (user.status !== 'active') {
            res.status(403).json({
                status: 'failed',
                error: 'please activate your account',
            })
        }

        // genarate token
        const token = genarateToken(user)

        // remove password from user object.
        const { password: pwd, ...withoutPassword } = user.toObject()

        res.status(200).json({
            status: 'success',
            message: 'login successfull',
            data: {
                user: withoutPassword,
                token
            },
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'login failed',
            error: error.message,
        })
    }
}


// get user
exports.getUser = async (req, res) => {
    try {
        const user = await authServices.getUserByEmailService(req.user?.email);
        const { password, ...withoutPassword } = user.toObject()
        res.status(200).json({
            status: 'success',
            message: 'user retrive success',
            data: withoutPassword,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'user cant found',
            error: error.message,
        })
    }
}


// get all users
exports.allusers = async (req, res) => {
    try {
        const users = await authServices.getAllUserService();

        if (users.length === 0) {
            return res.status(400).json({
                status: 'failed',
                error: 'cant users retrive',
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'users retrive success',
            data: users,
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'cant users retrive',
            error: error.message,
        })
    }
}