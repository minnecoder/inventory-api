import faker from 'faker';

export default {
  createRegularSupplier: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierEmptyFields: () => {
    return {
      Supplier_Name: '',
      Supplier_Address: '',
      Supplier_City: '',
      Supplier_State: '',
      Supplier_Zip: '',
      Supplier_Phone: '',
      Supplier_Email: '',
    };
  },
  createSupplierEmptyName: () => {
    return {
      Supplier_Name: '',
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierEmptyAddress: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: '',
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierEmptyCity: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: '',
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierEmptyState: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: '',
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierEmptyZip: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: '',
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierEmptyPhone: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: '',
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierEmptyEmail: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: '',
    };
  },
  createSupplierInvalidCity: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.random.number(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierInvalidState: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.random.number(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierInvalidZip: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.random.word(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierInvalidPhone: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.random.word(),
      Supplier_Email: faker.internet.email(),
    };
  },
  createSupplierInvalidEmail: () => {
    return {
      Supplier_Name: faker.company.companyName(),
      Supplier_Address: faker.address.streetAddress(),
      Supplier_City: faker.address.city(),
      Supplier_State: faker.address.state(),
      Supplier_Zip: faker.address.zipCode(),
      Supplier_Phone: faker.phone.phoneNumber(),
      Supplier_Email: faker.random.word(),
    };
  },
};
