/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const dishes = [
  { name: 'Rice Bowl with Tofu, Vegetables, and Teriyaki Sauce', ingredients: ['rice', 'tofu', 'cucumber', 'carrot', 'edamame/corn', 'teriyaki sauce'], preparation: 'Cook rice, fry tofu until crispy, chop vegetables, assemble in a bowl and pour sauce.', addOns: ['avocado', 'sesame seeds', 'nori', 'pickled ginger'] },
  { name: 'Vegan Shawarma with Falafel/Tofu and Vegetables', ingredients: ['lavash/tortilla', 'falafel or tofu', 'cabbage', 'tomato', 'cucumber', 'sauce'], preparation: 'Fry filling, wrap in lavash, toast on a dry pan.', addOns: ['fries', 'jalapenos', 'pickled onions', 'garlic sauce'] },
  { name: 'Fried Rice with Vegetables and Tofu', ingredients: ['rice', 'tofu', 'carrot', 'onion', 'soy sauce'], preparation: 'Fry vegetables and tofu, add cooked rice and sauce, stir-fry together.', addOns: ['green onion', 'corn', 'kimchi', 'peanuts'] },
  { name: 'Baked Potatoes with Mushrooms, Tofu, and Garlic Sauce', ingredients: ['potatoes', 'mushrooms', 'tofu', 'garlic', 'plant-based yogurt/mayo'], preparation: 'Bake potatoes and mushrooms, fry tofu separately, mix sauce.', addOns: ['herbs', 'caramelized onions', 'paprika', 'cheesy sauce'] },
  { name: 'Toasts/Sandwiches with Hummus, Vegetables, and Tofu', ingredients: ['bread', 'hummus', 'tofu', 'tomato', 'lettuce'], preparation: 'Toast bread, spread hummus, assemble filling.', addOns: ['avocado', 'olives', 'sun-dried tomatoes', 'arugula'] },
  { name: 'Noodles with Tofu in Tomato Sauce', ingredients: ['noodles/pasta', 'tofu', 'tomato sauce', 'garlic'], preparation: 'Cook noodles, fry tofu, mix with sauce.', addOns: ['basil', 'olives', 'mushrooms', 'vegan parmesan'] },
  { name: 'Tofu Syrniki with Fruits', ingredients: ['tofu', 'flour', 'sugar/syrup', 'banana'], preparation: 'Mix batter, shape syrniki, fry them.', addOns: ['berries', 'peanut butter', 'cinnamon', 'jam'] },
  { name: 'Solyanka', ingredients: ['potatoes', 'pickles', 'tomato paste', 'olives', 'mushrooms/soy meat'], preparation: 'Cook soup base, fry vegetables separately, add to soup.', addOns: ['lemon', 'vegan sour cream', 'smoked paprika', 'herbs'] },
  { name: 'Asian-Style Noodles with Tofu', ingredients: ['noodles', 'tofu', 'soy sauce', 'vegetables'], preparation: 'Quickly stir-fry everything in wok/pan.', addOns: ['sesame oil', 'peanuts', 'chili', 'bean sprouts'] },
  { name: 'Lentils with Vegetables', ingredients: ['lentils', 'carrot', 'onion', 'tomatoes'], preparation: 'Cook lentils, fry vegetables separately, mix together.', addOns: ['spinach', 'mushrooms', 'garlic', 'curry paste'] },
  { name: 'Lentil Patties in Burger Buns with Vegetable Salad and Mayo', ingredients: ['lentils', 'buns', 'salad', 'mayo', 'onion'], preparation: 'Make lentil patties, fry them, assemble burger.', addOns: ['pickles', 'vegan cheese', 'caramelized onions', 'mustard'] },
  { name: 'Falafel with Vegetables', ingredients: ['chickpeas', 'garlic', 'herbs', 'vegetables'], preparation: 'Blend chickpeas with spices and fry balls.', addOns: ['tahini', 'pita', 'hummus', 'spicy sauce'] },
  { name: 'Stuffed Bell Peppers', ingredients: ['bell peppers', 'rice', 'soy mince', 'tomato sauce'], preparation: 'Stuff peppers and stew or bake.', addOns: ['mushrooms', 'corn', 'beans', 'herbs'] },
  { name: 'Vegan Pizzas', ingredients: ['dough', 'tomato sauce', 'vegetables', 'vegan cheese'], preparation: 'Assemble pizza and bake.', addOns: ['mushrooms', 'pesto', 'olives', 'soy mince'] },
  { name: 'Tacos/Burritos with Soy Mince', ingredients: ['tortillas', 'soy mince', 'beans', 'vegetables'], preparation: 'Fry soy mince with spices and wrap everything.', addOns: ['guacamole', 'corn', 'salsa', 'lime'] },
  { name: 'Lasagna with Soy Mince', ingredients: ['lasagna sheets', 'soy mince', 'tomato sauce', 'bechamel'], preparation: 'Layer everything and bake.', addOns: ['spinach', 'mushrooms', 'eggplant', 'vegan cheese'] },
  { name: 'Vegan Navy-Style Pasta', ingredients: ['pasta', 'soy mince', 'onion'], preparation: 'Cook pasta, fry soy mince with onion, mix.', addOns: ['ketchup', 'garlic', 'mushrooms', 'vegan cheese'] },
  { name: 'Nachos with Soy Mince and Vegetables', ingredients: ['nachos', 'soy mince', 'tomatoes', 'beans'], preparation: 'Layer everything and heat up.', addOns: ['jalapenos', 'guacamole', 'cheese sauce', 'corn'] },
  { name: 'Vegan Burgers with Soy Mince Patties', ingredients: ['buns', 'patty', 'lettuce', 'tomato'], preparation: 'Fry patties and assemble burgers.', addOns: ['caramelized onions', 'mushrooms', 'BBQ sauce', 'vegan cheese'] },
  { name: 'Cabbage Rolls with Rice and Soy Mince', ingredients: ['cabbage', 'rice', 'soy mince', 'tomato sauce'], preparation: 'Wrap filling in cabbage leaves and stew.', addOns: ['mushrooms', 'vegan sour cream', 'herbs', 'garlic'] },
  { name: 'Stuffed Eggplants or Zucchini', ingredients: ['eggplant/zucchini', 'soy mince', 'tomatoes'], preparation: 'Bake stuffed halves.', addOns: ['vegan cheese', 'herbs', 'mushrooms', 'garlic'] },
  { name: 'Chili sin Carne with Beans', ingredients: ['beans', 'soy mince', 'tomatoes', 'onion'], preparation: 'Stew everything together with spices.', addOns: ['rice', 'nachos', 'lime', 'avocado'] },
  { name: 'Potato and Soy Mince Casserole', ingredients: ['potatoes', 'soy mince', 'onion', 'sauce'], preparation: 'Layer ingredients and bake.', addOns: ['mushrooms', 'vegan cheese', 'garlic', 'herbs'] },
  { name: 'Wok-Style Rice with Soy Mince and Vegetables', ingredients: ['rice', 'soy mince', 'vegetables', 'soy sauce'], preparation: 'Stir-fry everything over high heat.', addOns: ['sesame seeds', 'chili', 'ginger', 'green onion'] },
  { name: 'Pita/Lavash with Soy Mince and Vegetables', ingredients: ['pita/lavash', 'soy mince', 'vegetables', 'sauce'], preparation: 'Fry filling and wrap it.', addOns: ['fries', 'hummus', 'spicy sauce', 'pickled onions'] },
  { name: 'Vegan Meatballs in Tomato Sauce', ingredients: ['soy mince', 'breadcrumbs', 'tomato sauce'], preparation: 'Shape meatballs, fry, then simmer in sauce.', addOns: ['pasta', 'basil', 'vegan cheese', 'garlic bread'] },
  { name: 'Puff Pastries or Samsa with Soy Mince', ingredients: ['puff pastry', 'soy mince', 'onion'], preparation: 'Fill pastry and bake.', addOns: ['sesame seeds', 'mushrooms', 'potatoes', 'sauce'] },
  { name: 'Fried Dumplings/Gyoza with Soy Mince and Cabbage', ingredients: ['dumpling wrappers', 'soy mince', 'cabbage', 'soy sauce'], preparation: 'Shape dumplings, fry and steam.', addOns: ['chili oil', 'green onion', 'sesame seeds', 'ginger'] },
  { name: 'Shakshuka-Style Tomato Skillet with Soy Mince and Tofu', ingredients: ['tomatoes', 'soy mince', 'tofu', 'onion'], preparation: 'Simmer everything together in skillet.', addOns: ['pita bread', 'herbs', 'chili pepper', 'beans'] },
  { name: 'Vegan Sloppy Joe', ingredients: ['buns', 'soy mince', 'tomato sauce', 'onion'], preparation: 'Simmer soy mince in sweet tomato sauce and put into buns.', addOns: ['pickles', 'coleslaw', 'vegan cheese', 'jalapenos'] },
  { name: 'Stuffed Mushrooms', ingredients: ['large mushrooms', 'soy mince', 'onion'], preparation: 'Stuff mushroom caps and bake.', addOns: ['vegan cheese', 'herbs', 'garlic', 'breadcrumbs'] },
  { name: 'Quesadilla with Soy Mince and Vegan Cheese', ingredients: ['tortilla', 'soy mince', 'vegan cheese', 'tomatoes'], preparation: 'Assemble and fry until crispy.', addOns: ['guacamole', 'salsa', 'beans', 'corn'] },
  { name: "Shepherd's Pie with Mashed Potato Topping", ingredients: ['mashed potatoes', 'soy mince', 'vegetables'], preparation: 'Layer filling, top with mashed potatoes, bake.', addOns: ['peas', 'mushrooms', 'vegan cheese', 'rosemary'] },
  { name: 'Ramen/Udon with Fried Soy Mince and Mushrooms', ingredients: ['noodles', 'broth', 'soy mince', 'mushrooms'], preparation: 'Cook broth and add fried toppings.', addOns: ['nori', 'tofu egg substitute', 'green onion', 'sesame seeds'] },
];

async function main() {
  console.log('Seeding dishes...');

  await prisma.dishHistory.deleteMany();
  await prisma.dishAddOption.deleteMany();
  await prisma.dishAddOptionGroup.deleteMany();
  await prisma.dishStep.deleteMany();
  await prisma.dishIngredient.deleteMany();
  await prisma.dish.deleteMany();

  for (const item of dishes) {
    const dish = await prisma.dish.create({
      data: {
        name: item.name,
        description: item.preparation,
        source: 'manual',
        dishType: 'vegan',
        status: 'approved',
        createdBy: 'seed',
      },
    });

    await prisma.dishIngredient.createMany({
      data: item.ingredients.map((name) => ({
        dishId: dish.id,
        name,
      })),
    });

    const steps = item.preparation
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    await prisma.dishStep.createMany({
      data: steps.map((text, i) => ({
        dishId: dish.id,
        position: i + 1,
        text,
      })),
    });

    const group = await prisma.dishAddOptionGroup.create({
      data: {
        dishId: dish.id,
        groupKey: 'can_add',
        label: 'Can add',
      },
    });

    await prisma.dishAddOption.createMany({
      data: item.addOns.map((value) => ({
        groupId: group.id,
        value,
      })),
    });
  }

  console.log(`Seeded ${dishes.length} dishes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
