import { NextResponse } from 'next/server';
import { generateEmployeeScore } from '@/services/geminiService';
import connectDB from '@/lib/db';
import User from '@/models/user';

export async function POST(request) {
  try {
    await connectDB();
    const userData = await request.json();
    
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const rating = await generateEmployeeScore(user);
    return NextResponse.json(rating);
  } catch (error) {
    console.error('Rating error:', error);
    return NextResponse.json(
      { error: 'Failed to generate rating' },
      { status: 500 }
    );
  }
}