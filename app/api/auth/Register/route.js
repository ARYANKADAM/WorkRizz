import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();

    const { username, email, phone, password, role } = await request.json();

    if (!username || !email || !phone || !password || !role) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    await newUser.save();

    return NextResponse.json(
      { message: 'Account created successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
