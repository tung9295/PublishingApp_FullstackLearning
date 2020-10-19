const configMongoose = require('./configMongoose')
const User = configMongoose.User;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtSecret = require('./configSecret')
module.exports = [
  {
    route: ['login'],
    call: (callPath, args) => {
      const { username, password } = args[0];
      const saltedPassword = password + 'pubApp';
      // pubApp is salt string
      const saltedPassHash = crypto
        .createHash('sha256')
        .update(saltedPassword)
        .digest('hex');
      const userStatementQuery = {
        $and: [
          {"username": username},
          {"password": saltedPassHash}
        ]
      }

      return User.find(userStatementQuery, function(err, user) {
        if (err) throw err;
      }).then((result) => {
        if (result.length) {
          //SUCCESSFUL LOGIN
          const role = result[0].role;
          const userDetailsToHash = username + role;
          const token = jwt.sign(userDetailsToHash, jwtSecret.secret);
          return [
            {
              path: ['login', 'token'],
              value: token
            },
            {
              path: ['login', 'username'],
              value: username
            },
            {
              path: ['login', 'role'],
              value: role
            },
            {
              path: ['login', 'error'],
              value: false
            }
          ];
        } else {
          //INVALID LOGIN
          return [
            {
              path: ['login', 'token'],
              value: "INVALID"
            },
            {
              path: ['login', 'error'],
              value: "NO USER FOUND, incorrect login information"
            }
          ];
        }
        return result;
      });
    }
  },
  {
    route: ['register'],
    call: (callPath, args) => {
      const newUserObj = args[0];
      newUserObj.password = newUserObj.password + 'pubApp';
      newUserObj.password = crypto
        .createHash('sha256')
        .update(newUserObj.password)
        .digest('hex');
      const newUser = new User(newUserObj);
      return newUser.save((err, data) => { if (err) return err;})
        .then((newRes) => {
          /**
           * got new obj data, now let's get count:
           */
          const newUserDetail = newRes.toObject();

          if (newUserDetail._id) {
            const newUserId = newUserDetail._id.toString();

            return [
              {
                path: ['register', 'newUserId'],
                value: newUserId
              },
              {
                path: ['register', 'error'],
                value: false
              }
            ]
          } else {
            //registration failed
            return [
              {
                path: ['register', 'newUserId'],
                value: 'INVALID'
              },
              {
                path: ['register', 'error'],
                value: 'Registration failed - no id has been created'
              }
            ];
          }
          return;
        }).catch((reason) => console.error(reason));
    }
  }
];