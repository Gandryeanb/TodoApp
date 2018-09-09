const bcrypt = require('bcrypt')

const passEncryptor = (pass) => {

    let salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    let hash = bcrypt.hashSync(pass, salt);

    return hash
}

module.exports = passEncryptor