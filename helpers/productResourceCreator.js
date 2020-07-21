import faker from 'faker';

export default {
  createRegularProduct: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.commerce.price(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductEmptyFields: () => {
    return {
      Product_Name: '',
      Product_Desc: '',
      Product_Cost: '',
      Product_Price: '',
      Reorder_Level: '',
      Reorder_Qty: '',
    };
  },
  createProductEmptyName: () => {
    return {
      Product_Name: '',
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.commerce.price(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductEmptyDesc: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: '',
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.commerce.price(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductEmptyCost: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: '',
      Product_Price: faker.commerce.price(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductEmptyPrice: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: '',
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductEmptyLevel: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.commerce.price(),
      Reorder_Level: '',
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductEmptyQty: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.commerce.price(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: '',
    };
  },
  createProductInvalidCost: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.random.word(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductInvalidPrice: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.random.word(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductInvalidLevel: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.commerce.price(),
      Reorder_Level: faker.random.word(),
      Reorder_Qty: faker.random.number(),
    };
  },
  createProductInvalidQty: () => {
    return {
      Product_Name: faker.commerce.productName(),
      Product_Desc: faker.random.words(),
      Product_Cost: faker.commerce.price(),
      Product_Price: faker.commerce.price(),
      Reorder_Level: faker.random.number(),
      Reorder_Qty: faker.random.word(),
    };
  },
};
