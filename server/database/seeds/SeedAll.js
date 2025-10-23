import { seedUsers } from './SeedUsers.js';
import { seedCategories } from './SeedCategories.js';
import { seedProducts } from './SeedProducts.js';

export async function runSeeds() {
  await seedUsers();
  await seedCategories();
  await seedProducts();
}
