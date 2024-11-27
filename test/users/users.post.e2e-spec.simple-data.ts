import { faker } from '@faker-js/faker';

export const completeUser = {
  firstName: 'Hamza',
  lastName: 'El Mkhantar',
  email: faker.internet.email(),
  password: 'QPassword123!',
};

export const missingFirstName = {
  lastName: 'El Mkhantar',
  email: faker.internet.email(),
  password: 'QPassword123!',
};

export const missingEmail = {
  firstName: 'Hamza',
  lastName: 'El Mkhantar',
  password: 'QPassword123!',
};

export const missingPassword = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
};
