require('dotenv').config();
const { PrismaClient } = require('./generated/client/index.js');
const prisma = new PrismaClient();

const menuItems = [
  // BBQ
  { name: 'Chicken Tikka Leg', category: 'BBQ', price: 430 },
  { name: 'Chicken Tikka Chest', category: 'BBQ', price: 450 },
  { name: 'Malai Tikka Leg', category: 'BBQ', price: 450 },
  { name: 'Malai Tikka Chest', category: 'BBQ', price: 450 },
  { name: 'Green Tikka Leg', category: 'BBQ', price: 450 },
  { name: 'Green Tikka Chest', category: 'BBQ', price: 480 },
  { name: 'Chicken Malai Boti (Plate)', category: 'BBQ', price: 680 },
  { name: 'Chicken Malai Boti (KG)', category: 'BBQ', price: 2500 },
  { name: 'Chicken Boti (Plate)', category: 'BBQ', price: 620 },
  { name: 'Chicken Boti (KG)', category: 'BBQ', price: 2300 },
  { name: 'Chicken Reshmi Kabab (Plate)', category: 'BBQ', price: 600 },
  { name: 'Chicken Reshmi Kabab (KG)', category: 'BBQ', price: 2200 },
  { name: 'Beef Bihari Boti (Plate)', category: 'BBQ', price: 700 },
  { name: 'Beef Bihari Boti (KG)', category: 'BBQ', price: 2600 },
  { name: 'Beef Dhaga Kabab (Plate)', category: 'BBQ', price: 650 },
  { name: 'Beef Dhaga Kabab (KG)', category: 'BBQ', price: 2400 },
  { name: 'Beef Gola Kabab (Plate)', category: 'BBQ', price: 650 },
  { name: 'Beef Gola Kabab (KG)', category: 'BBQ', price: 2400 },
  { name: 'Chicken Dhaga Kabab (Plate)', category: 'BBQ', price: 600 },
  { name: 'Chicken Dhaga Kabab (KG)', category: 'BBQ', price: 2200 },
  { name: 'Chicken Fry Kabab (Plate)', category: 'BBQ', price: 750 },
  { name: 'Chicken Fry Kabab (KG)', category: 'BBQ', price: 2800 },
  { name: 'Beef Fry Kabab (Plate)', category: 'BBQ', price: 800 },
  { name: 'Beef Fry Kabab (KG)', category: 'BBQ', price: 3000 },
  { name: 'Labnani Boti (Plate)', category: 'BBQ', price: 650 },
  { name: 'Labnani Boti (KG)', category: 'BBQ', price: 2400 },
  { name: 'Chatta Boti (Plate)', category: 'BBQ', price: 650 },
  { name: 'Chatta Boti (KG)', category: 'BBQ', price: 2400 },
  { name: 'Chandan Kabab (Plate)', category: 'BBQ', price: 650 },
  { name: 'Chandan Kabab (KG)', category: 'BBQ', price: 2400 },
  { name: 'Bihari Chicken (Half)', category: 'BBQ', price: 800 },
  { name: 'Bihari Chicken (Full)', category: 'BBQ', price: 1600 },

  // Rolls (Beef + Chicken)
  { name: 'Beef Boti Roll', category: 'Rolls', price: 250 },
  { name: 'Beef Boti Mayo Roll', category: 'Rolls', price: 280 },
  { name: 'Beef Boti Cheese Roll', category: 'Rolls', price: 300 },
  { name: 'Beef Boti Mayo Cheese Roll', category: 'Rolls', price: 330 },
  { name: 'Beef Kabab Chatni Roll', category: 'Rolls', price: 250 },
  { name: 'Beef Kabab Mayo Roll', category: 'Rolls', price: 280 },
  { name: 'Beef Kabab Cheese Roll', category: 'Rolls', price: 300 },
  { name: 'Beef Kabab Mayo Cheese Roll', category: 'Rolls', price: 330 },
  { name: 'Chicken Kabab Chatni Roll', category: 'Rolls', price: 250 },
  { name: 'Chicken Kabab Mayo Roll', category: 'Rolls', price: 280 },
  { name: 'Chicken Kabab Cheese Roll', category: 'Rolls', price: 300 },
  { name: 'Chicken Kabab Mayo Cheese Roll', category: 'Rolls', price: 330 },
  { name: 'Chicken Bihari Boti Roll', category: 'Rolls', price: 250 },
  { name: 'Chicken Bihari Boti Mayo Roll', category: 'Rolls', price: 280 },
  { name: 'Chicken Bihari Boti Cheese Roll', category: 'Rolls', price: 300 },
  { name: 'Chicken Bihari Boti Mayo Cheese Roll', category: 'Rolls', price: 330 },
  { name: 'Chicken Malai Boti Chatni Roll', category: 'Rolls', price: 250 },
  { name: 'Chicken Malai Boti Mayo Roll', category: 'Rolls', price: 280 },
  { name: 'Chicken Malai Boti Cheese Roll', category: 'Rolls', price: 300 },
  { name: 'Chicken Malai Boti Mayo Cheese Roll', category: 'Rolls', price: 330 },
  { name: 'Chicken Crispy Zinger Roll', category: 'Rolls', price: 300 },
  { name: 'Chicken Crispy Zinger Cheese Roll', category: 'Rolls', price: 350 },

  // Burgers
  { name: 'Chicken Burger', category: 'Burgers', price: 350 },
  { name: 'Chicken Cheese Burger', category: 'Burgers', price: 400 },
  { name: 'Chicken Egg Burger', category: 'Burgers', price: 400 },
  { name: 'Chicken Egg Cheese Burger', category: 'Burgers', price: 450 },
  { name: 'Double Decker Chicken Burger', category: 'Burgers', price: 650 },
  { name: 'Double Decker Chicken Cheese Burger', category: 'Burgers', price: 600 },
  { name: 'Double Decker Egg Chicken Burger', category: 'Burgers', price: 650 },
  { name: 'Double Decker Egg Cheese Chicken Burger', category: 'Burgers', price: 650 },
  { name: 'Beef Burger', category: 'Burgers', price: 350 },
  { name: 'Beef Cheese Burger', category: 'Burgers', price: 400 },
  { name: 'Beef Egg Burger', category: 'Burgers', price: 400 },
  { name: 'Beef Egg Cheese Burger', category: 'Burgers', price: 450 },
  { name: 'Double Decker Beef Burger', category: 'Burgers', price: 650 },
  { name: 'Double Decker Beef Cheese Burger', category: 'Burgers', price: 600 },
  { name: 'Double Decker Egg Beef Burger', category: 'Burgers', price: 650 },
  { name: 'Double Decker Egg Cheese Beef Burger', category: 'Burgers', price: 650 },

  // Broast
  { name: 'Chicken Broast Qtr Leg', category: 'Broast', price: 470 },
  { name: 'Chicken Broast Qtr Chest', category: 'Broast', price: 500 },
  { name: 'Chicken Broast Half', category: 'Broast', price: 950 },
  { name: 'Chicken Broast Full', category: 'Broast', price: 1900 },

  // Fries
  { name: 'French Fries', category: 'Fries', price: 200 },
  { name: 'French Fries Mayo Garlic', category: 'Fries', price: 250 },
  { name: 'French Fries Mayo Garlic Cheese', category: 'Fries', price: 300 },

  // Sandwich
  { name: 'Chicken Sandwich', category: 'Sandwich', price: 350 },
  { name: 'Chicken Sandwich Cheese', category: 'Sandwich', price: 400 },
  { name: 'Chicken Club Sandwich', category: 'Sandwich', price: 450 },
  { name: 'Chicken Club Cheese Sandwich', category: 'Sandwich', price: 450 },
  { name: 'Double Club Sandwich', category: 'Sandwich', price: 590 },
  { name: 'Double Club Cheese Sandwich', category: 'Sandwich', price: 640 },
  { name: 'Zinger Sandwich', category: 'Sandwich', price: 400 },
  { name: 'Zinger Cheese Sandwich', category: 'Sandwich', price: 450 },
  { name: 'Zinger Club Sandwich', category: 'Sandwich', price: 450 },
  { name: 'Zinger Club Cheese Sandwich', category: 'Sandwich', price: 500 },
  { name: 'BBQ Sandwich', category: 'Sandwich', price: 450 },
  { name: 'BBQ Cheese Sandwich', category: 'Sandwich', price: 500 },
  { name: 'BBQ Club Sandwich', category: 'Sandwich', price: 500 },
  { name: 'BBQ Club Cheese Sandwich', category: 'Sandwich', price: 550 },

  // Zinger
  { name: 'Junior Zinger Burger', category: 'Zinger', price: 350 },
  { name: 'Junior Zinger Cheese Burger', category: 'Zinger', price: 400 },
  { name: 'Zinger Burger', category: 'Zinger', price: 400 },
  { name: 'Zinger Cheese Burger', category: 'Zinger', price: 450 },
  { name: 'Mega Zinger Burger', category: 'Zinger', price: 650 },
  { name: 'Mega Zinger Cheese Burger', category: 'Zinger', price: 700 },

  // Extra
  { name: 'Fry Puri Paratha', category: 'Extra', price: 150 },
  { name: 'Tawa Paratha', category: 'Extra', price: 80 },
  { name: 'Chota Fry Paratha', category: 'Extra', price: 80 },
  { name: 'Chapati', category: 'Extra', price: 15 },
  { name: 'Raita', category: 'Extra', price: 30 },
  { name: 'Special Halwa Plate', category: 'Extra', price: 200 },
  { name: 'Special Halwa (KG)', category: 'Extra', price: 1400 },

  // Drinks
  { name: 'Cold Drink Regular', category: 'Drinks', price: 70 },
  { name: 'Cold Drink 375ml', category: 'Drinks', price: 90 },
  { name: 'Cold Drink 500ml', category: 'Drinks', price: 120 },
  { name: 'Mineral Water Small', category: 'Drinks', price: 60 },
  { name: 'Mineral Water Large', category: 'Drinks', price: 120 },
];

async function main() {
  console.log('Start seeding...');
  await prisma.menuItem.deleteMany({}); // clear existing
  
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
