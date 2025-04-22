import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();

    const { 
      username, 
      email, 
      phone, 
      password, 
      role,
      age, 
      graduation, 
      currentCourse,
      workStatus, 
    } = await request.json();

    // Basic validation for all users
    if (!username || !email || !phone || !password || !role) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Additional validation for employee role
    if (role === 'employee') {
      if (!age || !graduation || !currentCourse || !workStatus) {
        return NextResponse.json({ message: 'All employee fields are required' }, { status: 400 });
      }
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object with base fields
    const userData = {
      username,
      email,
      phone,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };

    // Add employee-specific fields if role is employee
    if (role === 'employee') {
      userData.age = age;
      userData.graduation = graduation;
      userData.currentCourse = currentCourse;
      userData.workStatus = workStatus;
    }

    const newUser = new User(userData);
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