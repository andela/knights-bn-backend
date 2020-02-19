import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'William',
    lastName: 'Ishimwe',
    gender: 'male',
    email: 'william.ishimwe@andela.com',
    passport: 'null',
    password: process.env.MANAGER_PSWD,
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'newiyonsenga',
    lastName: 'Eric',
    role: 'requester',
    gender: 'male',
    email: 'ishimwe@gmail.com',
    passport: '1940567',
    password: '$2y$10$VNhbgAfwmiyjaniHdmnTxOo.Zm1qJ.H0LkkF317Frj4uN1fovDfza',
    method: 'normal',
    clientId: '1234566',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
