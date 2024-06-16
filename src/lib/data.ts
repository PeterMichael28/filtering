export const SORT_OPTIONS = [
 { name: 'None', value: 'none' },
 { name: 'Price: Low to High', value: 'price-asc' },
 { name: 'Price: High to Low', value: 'price-desc' },
] as const;

export const COLOR_FILTERS = {
 id: 'color',
 name: 'Color',
 options: [
  { value: 'white', label: 'White' },
  { value: 'beige', label: 'Beige' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
 ] as const,
};

export const SIZE_FILTERS = {
 id: 'size',
 name: 'Size',
 options: [
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
 ],
} as const;

export const PRICE_FILTERS = {
 id: 'price',
 name: 'Price',
 options: [
  { value: [0, 10000], label: 'Any price' },
  {
   value: [0, 200],
   label: 'Under N200',
  },
  {
   value: [0, 400],
   label: 'Under N400',
  },
  // custom option defined in JSX
 ],
} as const;

export const SUBCATEGORIES = [
 { name: 'T-Shirts', selected: true, href: '#' },
 { name: 'Hoodies', selected: false, href: '#' },
 { name: 'Sweatshirts', selected: false, href: '#' },
 { name: 'Accessories', selected: false, href: '#' },
];

export const DEFAULT_CUSTOM_PRICE = [0, 10000] as [number, number];
