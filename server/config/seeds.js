const db = require('./connection');
const { User, Card, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Card', 'cards');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Grass' },
    { name: 'Fire' },
    { name: 'Water' },
    { name: 'Electric' },
    { name: 'Psychic' }
  ]);

  console.log('categories seeded');

  const cards = await Card.insertMany([
    {
      name: 'Pikachu',
      description: 'An Electric-type Pokémon with powerful electric attacks.',
      image: 'pikachu-card.jpg',
      category: categories[3]._id, // Electric
      price: 4.99,
      quantity: 200
    },
    {
      name: 'Charmander',
      description: 'A Fire-type Pokémon that evolves into Charizard.',
      image: 'charmander-card.jpg',
      category: categories[1]._id, // Fire
      price: 3.99,
      quantity: 150
    },
    {
      name: 'Bulbasaur',
      description: 'A Grass-type Pokémon that can use Vine Whip.',
      image: 'bulbasaur-card.jpg',
      category: categories[0]._id, // Grass
      price: 2.99,
      quantity: 300
    },
    {
      name: 'Squirtle',
      description: 'A Water-type Pokémon with a strong water gun attack.',
      image: 'squirtle-card.jpg',
      category: categories[2]._id, // Water
      price: 3.49,
      quantity: 250
    },
    {
      name: 'Mewtwo',
      description: 'A Psychic-type Pokémon known for its powerful psychic abilities.',
      image: 'mewtwo-card.jpg',
      category: categories[4]._id, // Psychic
      price: 14.99,
      quantity: 50
    },
    {
      name: 'Eevee',
      description: 'A Normal-type Pokémon known for its evolutions.',
      image: 'eevee-card.jpg',
      category: categories[0]._id, // Grass (could be any)
      price: 5.99,
      quantity: 100
    },
    {
      name: 'Jolteon',
      description: 'An Electric-type Pokémon evolved from Eevee.',
      image: 'jolteon-card.jpg',
      category: categories[3]._id, // Electric
      price: 7.99,
      quantity: 75
    },
    {
      name: 'Charizard',
      description: 'A Fire-type Pokémon with immense power, evolved from Charmander.',
      image: 'charizard-card.jpg',
      category: categories[1]._id, // Fire
      price: 20.99,
      quantity: 30
    }
  ]);

  console.log('cards seeded');

  await User.create({
    firstName: 'Ash',
    lastName: 'Ketchum',
    email: 'ash@pokemon.com',
    password: 'pikachu12345',
    orders: [
      {
        cards: [cards[0]._id, cards[1]._id, cards[2]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Misty',
    lastName: 'Waterflower',
    email: 'misty@pokemon.com',
    password: 'starmie12345'
  });

  console.log('users seeded');

  process.exit();
});
