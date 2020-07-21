import faker from 'faker';

export default {
  createRegularCustomer: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: faker.address.streetAddress(),
      Customer_City: faker.address.city(),
      Customer_State: faker.address.state(),
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: faker.internet.email(),
    };
  },
  createCustomerEmptyFields: () => {
    return {
      Customer_Name: '',
      Customer_Address: '',
      Customer_City: '',
      Customer_State: '',
      Customer_Zip: '',
      Customer_Phone: '',
      Customer_Email: '',
    };
  },
  createCustomerEmptyName: () => {
    return {
      Customer_Name: '',
      Customer_Address: faker.address.streetAddress(),
      Customer_City: faker.address.city(),
      Customer_State: faker.address.state(),
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: faker.internet.email(),
    };
  },
  createCustomerEmptyAddress: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: '',
      Customer_City: faker.address.city(),
      Customer_State: faker.address.state(),
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: faker.internet.email(),
    };
  },
  createCustomerEmptyCity: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: faker.address.streetAddress(),
      Customer_City: '',
      Customer_State: faker.address.state(),
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: faker.internet.email(),
    };
  },
  createCustomerEmptyState: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: faker.address.streetAddress(),
      Customer_City: faker.address.city(),
      Customer_State: '',
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: faker.internet.email(),
    };
  },
  createCustomerEmptyZip: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: faker.address.streetAddress(),
      Customer_City: faker.address.city(),
      Customer_State: faker.address.state(),
      Customer_Zip: '',
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: faker.internet.email(),
    };
  },
  createCustomerEmptyPhone: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: faker.address.streetAddress(),
      Customer_City: faker.address.city(),
      Customer_State: faker.address.state(),
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: '',
      Customer_Email: faker.internet.email(),
    };
  },
  createCustomerEmptyEmail: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: faker.address.streetAddress(),
      Customer_City: faker.address.city(),
      Customer_State: faker.address.state(),
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: '',
    };
  },
  customerInvalidEmail: () => {
    return {
      Customer_Name: faker.company.companyName(),
      Customer_Address: faker.address.streetAddress(),
      Customer_City: faker.address.city(),
      Customer_State: faker.address.state(),
      Customer_Zip: faker.address.zipCode(),
      Customer_Phone: faker.phone.phoneNumber(),
      Customer_Email: faker.lorem.word(),
    };
  },
};
