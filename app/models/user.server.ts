/* eslint-disable no-useless-escape */
import { Schema, models, model, isValidObjectId } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
// import isStrongPassword from 'validator/lib/isStrongPassword';
import { compare, genSalt, hash } from 'bcrypt';
import { createRefreshToken } from '../utils/createRefreshToken';

export type IUser = {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  refresh_token?: string[];
};

interface ISignup {
  username: string;
  email: string;
  password: string;
}
interface ISignin {
  username: string;
  password: string;
}

// user schema
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    refresh_token: { type: Array, default: [] }
  },
  {
    timestamps: true
  }
);

// methods

// -- sign up method --
userSchema.statics.signup = async function (params: ISignup) {
  const { email, password, username } = params;

  if (!username || !password || email) {
    throw Error('All fields are required');
  }

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(username)) {
    throw Error('Username cannot contain special characters');
  }

  if (username.length < 3) {
    throw Error('Username must be 3 or more characters long');
  }

  if (password.length < 6) {
    throw Error('Password must be 6 or more characters long');
  }

  if (!isEmail(email)) {
    throw Error('Invalid Email');
  }

  const userWithSameEmail = await this.findOne({ email });

  if (userWithSameEmail) {
    throw Error('Email already in use.');
  }

  const userWithSameUsername = await this.findOne({ username });

  if (userWithSameUsername) {
    throw Error('Username already in use.');
  }

  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  await this.create({ email, password: hashPassword, username });

  // automatically use this data to set user session / login the new user
  const currentUserDataWithoutPassword = await this.findOne({ email }).select(
    '-password -__v -refresh_token'
  );

  return currentUserDataWithoutPassword;
};

// -- sign in method --
userSchema.statics.signin = async function (params: ISignin) {
  const { password, username } = params;

  if (!username || !password) {
    throw Error('Missing username or password');
  }

  // users will signin using either username/email
  const user = await this.findOne({
    $or: [{ username }, { email: username }]
  });

  if (!user) {
    throw Error('Incorrect email or username');
  }

  const passwordMatch = await compare(password, user.password);

  // incorrect password
  if (!passwordMatch) throw Error('Incorrect password');

  // correct password
  const userDataWithoutPassword = await this.findOne({
    $or: [{ username }, { email: username }]
  }).select('-password -__v -refresh_token');

  return userDataWithoutPassword;
};

const User: any = (module.exports = models.User || model('User', userSchema));

export default User;

// 149
// 148
// 147
