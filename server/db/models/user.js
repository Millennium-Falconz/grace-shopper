const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: "FAKEPASSWORD",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  userType: {
    type: Sequelize.ENUM("user", "admin", "guest"),
    defaultValue: "guest",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// before checkout, add address, billing, etc

module.exports = User;

/**
 * instanceMethods FOR AUTHENTICATION AND SECURITY
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  try {
  const token = jwt.sign({ id: this.id }, process.env.JWT);
  return {token}
} catch (err) {
  console.error(err)
} 
}
;

/**
 * classMethods FOR AUTHENTICATION AND SECURITY
 */
User.authenticate = async function ({ username, password }) {
  const user = await User.findOne({ where: { username } });
  const match = await bcrypt.compare(password, user.password);

  if (match){
    return user
  }
  const error = Error('Bad Credentials')
  error.status = 401
  throw error;
  // if (!user || !(await user.correctPassword(password))) {
  //   const error = Error("Incorrect username/password");
  //   error.status = 401;
  //   throw error;
  // }
  // return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    // const { id } = await jwt.verify(token, process.env.JWT);
    const payload = await jwt.verify(token, process.env.JWT)
    if (payload) {
      //find the user by payload which will have the userId
      const user = User.findByPk(payload.id);
      return user
    }
    const error = Error("Bad Credentials!")
    error.status = 401
    throw error

  } catch (ex) {
    const error = Error("Bad Token!");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

// ????? we'll revisit  this when building routes.
// comment from karen: no need to chnage this, this is correct for authentification
User.beforeCreate((user) => {
  hashPassword();
});
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => {
  users.forEach(hashPassword);
});
