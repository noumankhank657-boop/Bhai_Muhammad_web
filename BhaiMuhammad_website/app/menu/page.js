import MenuClient from '@/components/MenuClient';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Our Menu - Bhai Muhammad Nimko Corner & Kabab House',
  description: 'Explore our full menu of delicious BBQ, Broast, Rolls, and more.',
};

// Next.js Server Component
export default async function MenuPage() {
  const items = await prisma.menuItem.findMany({
    orderBy: { id: 'asc' }
  });

  return <MenuClient initialItems={items} />;
}
