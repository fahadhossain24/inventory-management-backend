const User = require("../model/userSchema")

exports.signUpService = async(data) => {
    const result = await User.create(data);
    return result;
}

exports.emailConfirmationService = async(token) => {
    const result = await User.findOne({confirmationToken: token});
    return result;
}

exports.getUserByEmailService = async(email) => {
    const result = await User.findOne({email});
    return result;
}


exports.getAllUserService = async() => {
    const results = await User.find();
    const resultsWithoutPass = []
    results.forEach(result => {
        let {password, ...withoutPassword} = result.toObject();
        resultsWithoutPass.push(withoutPassword)
    })
    // console.log(arr)
    return resultsWithoutPass;
}