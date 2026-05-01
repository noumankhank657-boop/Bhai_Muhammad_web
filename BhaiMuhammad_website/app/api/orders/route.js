import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: {
          include: { menuItem: true },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, phone, address, deliveryZone, deliveryFee, total, items } = body;

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        deliveryZone,
        deliveryFee,
        total,
        orderItems: {
          create: items.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
