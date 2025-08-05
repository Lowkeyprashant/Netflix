// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ 
      message: 'Login successful', 
      user: { id: user.id, email: user.email } 
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}