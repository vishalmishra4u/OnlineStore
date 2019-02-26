/**
 * User.js
 * Model and methods for user
 */

const Q = require('q')
uuid = require('node-uuid'),
  md5 = require('md5'),
  crypto = require('crypto');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    emailId: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    salt: {
      type: 'string'
    },
    address: {
      type: 'string',
      required: true
    },
    mobileNumber: {
      type: 'number',
      required: true
    },
    typeOfUser: {
      type: 'string',
      isIn: ['customer', 'deliveryGuy', 'staff', 'admin']
    },
    orders: {
      collection: 'order',
      via: 'user'
    }
  },
  signUp: signUp,
  getForEmailPassword: getForEmailPassword
};

function signUp(userData) {
  return Q.promise(function(resolve, reject) {
    var customerUser = {
      name: userData.name,
      emailId: userData.emailId,
      mobileNumber: userData.mobileNumber,
      typeOfUser: 'customer',
      address: userData.address,
      password: '',
      salt: ''
    };

    var salt = generateSalt();
    generateEncryptedPassword(userData.password, salt)
      .then(function(encryptedPassword) {
        customerUser.password = encryptedPassword;
        customerUser.salt = salt;
        return User.create(customerUser).fetch();
      })
      .then(function(user) {

        return resolve({
          user: user
        });
      })
      .catch(function(err) {
        sails.log.error('User#createNewUser :: Error while creating a new user :: ', err);
        return reject(err);
      });
  });
}

function generateSalt() {
  return md5(uuid.v1());
}

function generateUuid() {
  return generateSalt();
}

function generateEncryptedPassword(password, salt) {
  return Q.promise(function(resolve, reject) {

    crypto.pbkdf2(password, salt, 10, 512, 'sha512', function(err, encrypted) {
      if (err) {
        sails.log.error('User#generateEncryptedPassword :: ', err);
        return reject(err);
      }
      return resolve(encrypted.toString('hex'));
    });
  });
}

function loadUserByEmail(email) {
  return Q.promise(function(resolve, reject) {
    var criteria = {
      emailId: email
    };
    User
      .findOne(criteria)
      .then(function(user) {
        if (!user) {
          sails.log.silly('User#loadUserByEmail :: No user available for the given email :: ', email);
          return resolve(null);
        }
        return resolve(user);
      })
      .catch(function(err) {
        sails.log.error('User#loadUserByEmail :: Error querying DB :: ', err);
        return reject(err);
      });
  });
}

function getForEmailPassword(data) {
  return Q.promise(function(resolve, reject) {
    if (!data) {
      sails.log.verbose('User#getForEmailPassword :: data null');
      return reject();
    }

    loadUserByEmail(data.emailId)
      .then(function(user) {
        if (!user) {
          sails.log.info('User#getForEmailPassword :: No user available for the given email :: ', data.email);
          return reject(error);
        }
        var salt = user.salt;
        generateEncryptedPassword(data.password, salt)
          .then(function(hashedPassword) {
            if (hashedPassword !== user.password) {
              return reject({
                message: 'Invalid Credentials'
              });
            }

            return resolve(user);
          });
      })
      .catch(function(error) {
        sails.log.error('User#getForEmailPassword :: Error :: ', err);
        return reject(error);
      });
  });
}
