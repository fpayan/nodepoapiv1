'use stric';

const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');
Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, lowercase: true, 
        required: [true, 'Name is required']
    },
    age: { 
      type: Number, 
      min: 18, 
      max: 100 
    },
    email: {
        type: String, 
        lowercase: true, 
        trim: true, 
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
        required: [true, 'Email is required'], 
        unique: true, 
        index: true
    },
    password: {
        type: String, 
        required: [true, 'Password is required']
    },
    announces: [{ type: Schema.Types.ObjectId, ref: 'Announce' }],
    role: {
      type: String,
      enum: ["Admin", "OwnUser", "Client"]
    },
    created: {
      type: Date,
      default: new Date()
    },
    update: {
      type: Date,
      default: new Date()
    }
});

// Hash the user's password before inserting a new user
UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {



      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });
  
  // Compare password input to password saved in database
  UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

module.exports = mongoose.model('User', UserSchema);

