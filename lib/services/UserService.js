import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ userName, password, profilePhotoUrl }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return User.insert({ userName, passwordHash, profilePhotoUrl });
  }

  static async authorize({ userName, password }) {
    const user = await User.findByUserName(userName);
    if (!user) {
      throw new Error('Invalid userName/password');
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordsMatch) {
      throw new Error('Invalid userName/password');
    }

    return user;
  }
}
