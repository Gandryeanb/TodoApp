const bcrypt = require('bcrypt')

const passValidator = (pass, encriptedPass) => {

    if (bcrypt.compareSync(pass, encriptedPass)){
        
        return true
    }
    return false
}

module.exports = passValidator