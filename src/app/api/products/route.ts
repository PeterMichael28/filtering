import { generateData } from '@/db/db';
import { NextRequest } from 'next/server';
class Filter {
 private filters: Map<string, string[]> = new Map();

 hasFilter() {
  return this.filters.size > 0;
 }

 add(key: string, operator: string, value: string | number) {
  const filter = this.filters.get(key) || [];
  filter.push(
   `${key} ${operator} ${
    typeof value === 'number' ? value : `"${value}"`
   }`,
  );
  this.filters.set(key, filter);
 }

 addRaw(key: string, rawFilter: string) {
  this.filters.set(key, [rawFilter]);
 }

 get() {
  const parts: string[] = [];
  this.filters.forEach((filter) => {
   const groupedValues = filter.join(` OR `);
   parts.push(`(${groupedValues})`);
  });
  return parts.join(' AND ');
 }

 apply(data: any[]) {
  return data.filter((item) => {
   let matchesAllConditions = true;

   this.filters.forEach((conditions, key) => {
    // console.log('item', item)
    // console.log(conditions, key);
    let matchesField = conditions.some((condition) => {
     if (condition.includes(' AND ')) {
      return condition.split(' AND ').every((subCondition) => {
       const [field, operator, value] = subCondition
        .trim()
        .split(' ');
       const fieldValue = item.metadata[field];
       const conditionValue = value.replace(/"/g, '');

       switch (operator) {
        case '=':
         return fieldValue == conditionValue;
        case '>=':
         return fieldValue >= Number(conditionValue);
        case '<=':
         return fieldValue <= Number(conditionValue);
        default:
         return false;
       }
      });
     } else {
      const [field, operator, value] = condition.split(' ');
      const fieldValue = item.metadata[field];
      const conditionValue = value.replace(/"/g, '');

      switch (operator) {
       case '=':
        return fieldValue == conditionValue;
       case '>=':
        return fieldValue >= Number(conditionValue);
       case '<=':
        return fieldValue <= Number(conditionValue);
       default:
        return false;
      }
     }
    });

    if (!matchesField) {
     matchesAllConditions = false;
    }
   });

   return matchesAllConditions;
  });
 }
}

const AVG_PRODUCT_PRICE = 25;
const MAX_PRODUCT_PRICE = 50;

export const POST = async (req: NextRequest) => {
 try {
  const body = await req.json();

  const { color, price, size, sort } = body.filter;

  const filter = new Filter();

  if (color.length > 0) {
   color.forEach((color: string | number) =>
    filter.add('color', '=', color),
   );
  } else if (color.length === 0) {
   filter.addRaw('color', `color = ""`);
  }

  if (size.length > 0) {
   size.forEach((size: string | number) =>
    filter.add('size', '=', size),
   );
  } else if (size.length === 0) {
   filter.addRaw('size', `size = ""`);
  }

  filter.addRaw(
   'price',
   `price >= ${price[0]} AND price <= ${price[1]}`,
  );

  // Use generateData function to get the data
  const allData = generateData();
  const filteredData = filter.hasFilter()
   ? filter.apply(allData)
   : allData;
  //   console.log('ok', filteredData);
  // Sort the filtered data if needed
  if (sort === 'price-asc') {
   filteredData.sort((a, b) => +a.price - +b.price);
  } else if (sort === 'price-desc') {
   filteredData.sort((a, b) => +b.price - +a.price);
  }

  // Limit the number of products returned
  const products = filteredData.slice(0, 12);

  return new Response(JSON.stringify(products));
 } catch (err) {
  // i.e. log error to sentry
  console.error(err);

  return new Response(
   JSON.stringify({ message: 'Internal Server Error' }),
   {
    status: 500,
   },
  );
 }
};
