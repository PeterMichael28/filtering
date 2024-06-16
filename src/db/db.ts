import { Product } from '.';
import { COLORS, SIZES, getRandomPrice } from './seed';

export const generateData = () => {
 const products: Product[] = [];

 for (let i = 0; i < 3; i++) {
  for (let j = 0; j < COLORS.length; j++) {
   for (let k = 0; k < SIZES.length; k++) {
    const size = SIZES[k];
    const color = COLORS[j];
    products.push({
     id: `${color}-${size}-${i + 1}`,
     imageId: `/${color}_${i + 1}.png`,
     color,
     name: `${
      color.slice(0, 1).toUpperCase() + color.slice(1)
     } shirt ${i}`,
     size,
     price: getRandomPrice(),
    });
   }
  }
 }

 const SIZE_MAP = {
  S: 0,
  M: 1,
  L: 2,
 };

 const COLOR_MAP = {
  white: 0,
  beige: 1,
  blue: 2,
  green: 3,
  purple: 4,
 };
 const allProducts = products.map((product) => ({
  id: product.id,
  vector: [
   COLOR_MAP[product.color],
   SIZE_MAP[product.size],
   product.price,
  ],
  metadata: product,
 }));

 return allProducts;
};
