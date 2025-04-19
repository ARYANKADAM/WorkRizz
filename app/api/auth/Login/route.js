import  connectDB  from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
      const { email, password } = await req.json();
  
      if (!email || !password) {
        console.log("Missing credentials");
        return Response.json({ message: "Missing credentials" }, { status: 400 });
      }
  
      await connectDB();
      console.log("Connected to DB");
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found");
        return Response.json({ message: "Invalid credentials" }, { status: 401 });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password mismatch");
        return Response.json({ message: "Invalid credentials" }, { status: 401 });
      }
  
      console.log("Login successful");
      return Response.json({
        message: 'Login successful',
        user: {
          email: user.email,
          username: user.username,
          phone: user.phone,
          role: user.role,
          password: user.password,
        },
      });
  
    } catch (err) {
      console.error('Login API error:', err); // This will tell us exactly what crashed
      return Response.json({ message: "Server Error" }, { status: 500 });
    }
}