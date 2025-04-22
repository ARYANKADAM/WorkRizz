import { NextResponse } from "next/server";
import { generateEmployeeScore } from "@/services/geminiService";
import connectDB from "@/lib/db";
import User from "@/models/user";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const userData = await request.json();
//     const user = await User.findOne({ email: userData.email });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const rating = await generateEmployeeScore(user);

//     // ✅ Update the user's profileScore in the DB
//     user.profileScore = rating.score;
//     await user.save();

//     return NextResponse.json({
//       score: rating.score,
//       explanation: rating.explanation,
//     });
//   } catch (error) {
//     console.error('Rating error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate rating' },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    await connectDB();

    const userData = await request.json();
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const rating = await generateEmployeeScore(user);
    
    // Update user's profile score
    user.profileScore = rating.score;
    await user.save();

    return NextResponse.json({
      score: rating.score,
      explanation: rating.explanation
    });
  } catch (error) {
    console.error('Rating error:', error);
    return NextResponse.json(
      { error: 'Failed to generate rating' },
      { status: 500 }
    );
  }
}