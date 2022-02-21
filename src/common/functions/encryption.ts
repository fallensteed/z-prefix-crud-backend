const bcrypt = require("bcrypt");
const saltRounds = 10;

export const encrypt = async (password: string) => {
    const encrypted = await bcrypt.hash(password, saltRounds).then((hash: string) => {
        console.log(hash);
        return hash;
    });
    return encrypted;
};

export const comparePasswords = async (givenPass: string, dbPass: string) => {
    const isPassword: boolean = await bcrypt.compare(givenPass, dbPass).then((result: boolean) => {
        return result;
    });
    return isPassword;
};
