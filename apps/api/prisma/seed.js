/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DETAILED_STEPS_SOURCE = `
1. Rice Bowl with Tofu, Vegetables, and Teriyaki Sauce
Rinse rice 2–3 times.
Put rice in a pot.
Add water: about 1.5–2 parts water to 1 part rice.
Bring to a boil.
Reduce heat to low.
Cover and cook for 12–15 min.
Turn off heat and let it sit covered for 5 min.
Cut tofu into cubes.
Heat oil in a pan.
Fry tofu 5–8 min until golden.
Slice cucumber, carrot, avocado or other vegetables.
Put rice in a bowl.
Add tofu and vegetables.
Pour teriyaki sauce on top.
Add sesame/nori if you want.
2. Vegan Shawarma with Falafel/Tofu and Vegetables
Heat a pan with a little oil.
Fry falafel or tofu until warm and crispy.
Slice cabbage, tomato, cucumber and onion.
Warm lavash/tortilla on a dry pan for 20–30 sec.
Spread garlic sauce, hummus or vegan mayo.
Add vegetables.
Add falafel/tofu.
Add pickles or fries if you want.
Fold the sides.
Roll tightly.
Toast on a dry pan 1–2 min per side.
3. Fried Rice with Vegetables and Tofu
Cook rice first or use leftover rice.
Cut tofu into cubes.
Heat oil in a pan.
Fry tofu until golden.
Remove tofu or push it to the side.
Add chopped onion, carrot, corn/peas.
Fry 3–5 min.
Add cooked rice.
Add soy sauce.
Stir-fry 3–5 min.
Add tofu back.
Mix everything.
Add green onion/sesame if you want.
4. Baked Potatoes with Mushrooms, Tofu, and Garlic Sauce
Preheat oven to 200°C.
Wash potatoes.
Cut potatoes into wedges/cubes.
Cut mushrooms.
Put potatoes and mushrooms on a baking tray.
Add oil, salt, pepper, paprika.
Mix.
Bake 30–40 min.
Cut tofu into cubes.
Fry tofu in a pan until golden.
Mix vegan yogurt/mayo with garlic, salt and lemon juice.
Put potatoes and mushrooms on a plate.
Add tofu.
Pour garlic sauce on top.
5. Toasts/Sandwiches with Hummus, Vegetables, and Tofu
Cut tofu into slices.
Fry tofu 2–3 min per side.
Toast bread.
Spread hummus on bread.
Add tofu.
Add tomato, cucumber, lettuce.
Add salt, pepper, sauce.
Close sandwich or serve as open toast.
6. Noodles with Tofu in Tomato Sauce
Boil water in a pot.
Add salt.
Put noodles/pasta into boiling water.
Cook according to package instructions.
Cut tofu into cubes.
Heat oil in a pan.
Fry tofu until golden.
Add garlic.
Add tomato sauce.
Simmer 5–7 min.
Drain noodles.
Add noodles to sauce.
Mix.
Add basil/vegan parmesan if you want.
7. Tofu Syrniki with Fruits
Crumble tofu into a bowl.
Add banana or sugar/syrup.
Add flour.
Add vanilla/cinnamon if you want.
Mash everything into a thick dough.
Form small patties.
Heat oil in a pan.
Fry 3–4 min per side.
Serve with berries, jam or peanut butter.
8. Solyanka
Boil water in a pot.
Peel and cut potatoes.
Add potatoes to boiling water.
Cook 10–15 min.
Chop onion, pickles, mushrooms/soy meat.
Fry onion in a pan.
Add mushrooms/soy meat.
Add pickles.
Add tomato paste.
Fry 3–5 min.
Add everything to the pot.
Add olives.
Cook 10 min.
Serve with lemon and vegan sour cream.
9. Asian-Style Noodles with Tofu
Boil water.
Add noodles.
Cook according to package.
Drain noodles.
Cut tofu.
Heat oil in a pan.
Fry tofu until golden.
Add vegetables.
Fry 3–5 min.
Add noodles.
Add soy sauce, garlic, ginger.
Stir-fry 2–3 min.
Add sesame/chili if you want.
10. Lentils with Vegetables
Rinse lentils.
Put lentils in a pot.
Add water.
Bring to a boil.
Reduce heat.
Cook 15–25 min depending on lentil type.
Chop onion, carrot, tomatoes.
Fry onion and carrot in a pan.
Add tomatoes.
Cook 5 min.
Add cooked lentils.
Mix.
Add salt, garlic, spices.
Simmer 5 min.
11. Lentil Patties in Burger Buns with Vegetable Salad and Mayo
Cook lentils until soft.
Drain water.
Mash lentils.
Add chopped onion, flour/breadcrumbs, salt, spices.
Form patties.
Heat oil in a pan.
Fry patties 3–5 min per side.
Slice buns.
Toast buns.
Mix cabbage/cucumber/tomato with vegan mayo.
Put patty into bun.
Add salad.
Add sauce and pickles.
12. Falafel with Vegetables
Use canned chickpeas or soaked chickpeas.
Drain chickpeas.
Put chickpeas, garlic, onion, herbs and spices in blender.
Blend into rough paste.
Add flour if too wet.
Form balls.
Heat oil in a pan.
Fry falafel until golden on all sides.
Cut vegetables.
Serve falafel with vegetables, pita and tahini/hummus.
13. Stuffed Bell Peppers
Rinse rice.
Boil rice for 8–10 min until half-cooked.
Soak soy mince in hot water for 5–10 min.
Drain soy mince.
Mix rice, soy mince, salt, spices, tomato sauce.
Cut tops off peppers.
Remove seeds.
Fill peppers.
Put peppers into a pot or baking dish.
Add tomato sauce and a little water.
Cover.
Simmer 30–40 min or bake at 190°C for 35–45 min.
14. Vegan Pizzas
Preheat oven to 220°C.
Roll out pizza dough.
Put dough on baking tray.
Spread tomato sauce.
Add vegan cheese.
Add vegetables, mushrooms, olives, soy mince if you want.
Bake 10–15 min.
Add fresh basil/arugula after baking.
15. Tacos/Burritos with Soy Mince
Soak soy mince in hot water for 5–10 min.
Drain.
Heat oil in a pan.
Fry onion.
Add soy mince.
Add taco spices, tomato paste, salt.
Fry 5–7 min.
Warm tortillas.
Add soy mince, beans, vegetables, salsa.
Wrap as taco or burrito.
Toast if needed.
16. Lasagna with Soy Mince
Soak soy mince in hot water.
Drain.
Fry onion and garlic.
Add soy mince.
Add tomato sauce.
Simmer 10 min.
Prepare vegan béchamel or use plant cream.
Preheat oven to 190°C.
Put tomato mince sauce in baking dish.
Add lasagna sheets.
Add béchamel.
Repeat layers.
Finish with sauce and vegan cheese.
Bake 30–40 min.
17. Vegan Navy-Style Pasta
Boil water.
Add salt.
Add pasta.
Cook according to package.
Soak soy mince in hot water.
Drain.
Fry onion in oil.
Add soy mince.
Add salt, pepper, garlic, tomato paste if you want.
Fry 5–7 min.
Drain pasta.
Mix pasta with soy mince.
Cook together 1–2 min.
18. Nachos with Soy Mince and Vegetables
Soak soy mince in hot water.
Drain.
Fry soy mince with onion and spices.
Put nachos on a plate/tray.
Add soy mince.
Add beans, corn, tomatoes.
Add vegan cheese/sauce.
Heat in oven or microwave until warm.
Add jalapeños, guacamole or salsa.
19. Vegan Burgers with Soy Mince Patties
Soak soy mince in hot water.
Drain very well.
Mix soy mince with breadcrumbs/flour, onion, spices.
Form patties.
Heat oil in a pan.
Fry patties 4–5 min per side.
Toast burger buns.
Add sauce to buns.
Add lettuce, tomato, patty.
Add pickles, onion, vegan cheese.
Close burger.
20. Cabbage Rolls with Rice and Soy Mince
Boil water in a large pot.
Put cabbage leaves in hot water for 3–5 min to soften.
Cook rice until half-ready.
Soak soy mince in hot water.
Drain soy mince.
Mix rice, soy mince, onion, salt, spices.
Put filling into cabbage leaves.
Roll tightly.
Put rolls into pot.
Add tomato sauce and water.
Cover.
Simmer 40–60 min.
21. Stuffed Eggplants or Zucchini
Preheat oven to 190°C.
Cut eggplants/zucchini in half.
Scoop out the middle.
Chop the scooped flesh.
Soak soy mince in hot water.
Drain.
Fry onion, soy mince and chopped flesh.
Add tomato sauce and spices.
Fill eggplant/zucchini halves.
Add vegan cheese if you want.
Bake 25–35 min.
22. Chili sin Carne with Beans
Soak soy mince in hot water.
Drain.
Fry onion and garlic.
Add soy mince.
Add canned tomatoes.
Add beans.
Add corn if you want.
Add chili, paprika, cumin, salt.
Simmer 20–30 min.
Serve with rice, nachos or bread.
23. Potato and Soy Mince Casserole
Preheat oven to 190°C.
Peel potatoes.
Slice potatoes thinly or boil and mash them.
Soak soy mince in hot water.
Drain.
Fry onion and soy mince.
Add tomato sauce/spices.
Put potato layer in baking dish.
Add soy mince layer.
Add another potato layer.
Add vegan cheese or sauce.
Bake 30–40 min.
24. Wok-Style Rice with Soy Mince and Vegetables
Cook rice first.
Soak soy mince in hot water.
Drain.
Heat oil in a large pan.
Fry soy mince.
Add vegetables.
Fry on high heat 3–5 min.
Add cooked rice.
Add soy sauce, garlic, ginger.
Stir-fry 2–4 min.
Add sesame and green onion.
25. Pita/Lavash with Soy Mince and Vegetables
Soak soy mince in hot water.
Drain.
Fry onion.
Add soy mince.
Add spices and tomato paste.
Fry 5–7 min.
Warm pita/lavash.
Spread hummus or sauce.
Add soy mince.
Add vegetables.
Wrap.
Toast on a pan if you want.
26. Vegan Meatballs in Tomato Sauce
Soak soy mince in hot water.
Drain very well.
Mix soy mince with breadcrumbs, onion, garlic, salt, spices.
Form balls.
Heat oil in a pan.
Fry meatballs until browned.
Add tomato sauce to the pan.
Cover.
Simmer 10–15 min.
Serve with pasta, rice or bread.
27. Puff Pastries or Samsa with Soy Mince
Defrost puff pastry if frozen.
Soak soy mince in hot water.
Drain.
Fry onion.
Add soy mince.
Add salt, pepper, spices.
Cool filling slightly.
Cut pastry into squares.
Put filling in the center.
Fold and seal edges.
Put on baking tray.
Bake at 200°C for 15–25 min.
28. Fried Dumplings/Gyoza with Soy Mince and Cabbage
Soak soy mince in hot water.
Drain.
Finely chop cabbage.
Mix soy mince, cabbage, garlic, ginger, soy sauce.
Put filling into dumpling wrappers.
Seal edges.
Heat oil in a pan.
Put dumplings flat side down.
Fry 2–3 min.
Add a little water.
Cover.
Steam 5–7 min.
Remove lid and fry until bottom is crispy.
29. Shakshuka-Style Tomato Skillet with Soy Mince and Tofu
Soak soy mince in hot water.
Drain.
Fry onion and garlic.
Add soy mince.
Add tomatoes or tomato sauce.
Add paprika, salt, pepper.
Simmer 10 min.
Crumble tofu.
Add tofu on top or mix in.
Cook 3–5 min.
Serve with pita/bread.
30. Vegan Sloppy Joe
Soak soy mince in hot water.
Drain.
Fry onion.
Add soy mince.
Add tomato sauce/ketchup.
Add a little mustard, sugar/syrup, paprika.
Simmer 10–15 min until thick.
Toast burger buns.
Put filling into buns.
Add pickles or coleslaw.
31. Stuffed Mushrooms
Preheat oven to 190°C.
Clean large mushrooms.
Remove stems.
Chop stems.
Soak soy mince in hot water.
Drain.
Fry onion, chopped stems and soy mince.
Add garlic, salt, spices.
Fill mushroom caps.
Add breadcrumbs or vegan cheese.
Bake 15–25 min.
32. Quesadilla with Soy Mince and Vegan Cheese
Soak soy mince in hot water.
Drain.
Fry soy mince with onion and spices.
Heat a dry pan.
Put tortilla in the pan.
Add vegan cheese.
Add soy mince.
Add tomatoes/corn/beans if you want.
Cover with another tortilla or fold in half.
Fry 2–3 min per side.
Cut into pieces.
Serve with salsa/guacamole.
33. Shepherd’s Pie with Mashed Potato Topping
Peel potatoes.
Put potatoes in a pot.
Cover with water.
Bring to a boil.
Cook 15–20 min until soft.
Drain.
Mash with plant milk, salt and vegan butter/oil.
Soak soy mince in hot water.
Drain.
Fry onion, carrot, peas/mushrooms.
Add soy mince.
Add tomato paste or gravy.
Simmer 5–10 min.
Put filling into baking dish.
Spread mashed potatoes on top.
Bake at 200°C for 20–25 min.
34. Ramen/Udon with Fried Soy Mince and Mushrooms
Boil water.
Cook ramen/udon according to package.
Drain or keep separately.
Soak soy mince in hot water.
Drain.
Slice mushrooms.
Fry mushrooms in oil.
Add soy mince.
Add soy sauce, garlic, ginger.
Fry 5–7 min.
Heat vegetable broth in a pot.
Add noodles to a bowl.
Pour broth over noodles.
Add fried soy mince and mushrooms.
Add green onion, sesame, nori or chili oil.
`;

function normalizeDishName(name) {
  return name.replace(/[’]/g, "'").trim().toLowerCase();
}

function parseDetailedSteps(source) {
  const lines = source.split('\n').map((line) => line.trim()).filter(Boolean);
  const stepsByDish = new Map();
  let currentDish = null;

  for (const line of lines) {
    const headerMatch = line.match(/^\d+\.\s+(.+)$/);
    if (headerMatch) {
      currentDish = headerMatch[1];
      stepsByDish.set(normalizeDishName(currentDish), []);
      continue;
    }

    if (!currentDish) continue;
    stepsByDish.get(normalizeDishName(currentDish)).push(line);
  }

  return stepsByDish;
}

const detailedStepsByDish = parseDetailedSteps(DETAILED_STEPS_SOURCE);

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

    const steps =
      detailedStepsByDish.get(normalizeDishName(item.name)) ??
      item.preparation
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
