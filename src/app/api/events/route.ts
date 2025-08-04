// app/api/events/route.ts

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  const body = await req.json();
  const { title, details, contact } = body;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        details,
        contact,
      },
    });

    return new Response(JSON.stringify(event), { status: 201 });
  } catch (error) {
    console.error('Create event failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to create event' }), { status: 500 });
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error('Fetch events failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), { status: 500 });
  }
}

