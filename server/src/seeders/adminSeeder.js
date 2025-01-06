import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const adminEmail = "a@handscharms.com";
const adminPassword = "admin_password";

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      where: { email: adminEmail }
    });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
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