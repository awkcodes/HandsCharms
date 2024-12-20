import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      where: { email: process.env.admin_email }
    });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: process.env.admin_email,
        password: await bcrypt.hash(process.env.admin_password, 10),
        address: 'Admin Address',
        isAdmin: true
      });
      console.log('Admin account created successfully');
    } else {
      console.log('Admin account already exists');
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
  process.exit();
};

createAdmin();