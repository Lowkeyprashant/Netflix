// src/app/api/auth/signup/route.ts

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}