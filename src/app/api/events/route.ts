import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, details, contact } = body;

  const newEvent = await prisma.event.create({
    data: { title, details, contact },
  });

  return NextResponse.json(newEvent);
}

