// user model consisting of username, email, and password
// password is hashed using bcrypt
// username and email are unique
// username and email are required
// username and email are trimmed
// email is validated using regex

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    }
});

// hash password before saving to database
UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
