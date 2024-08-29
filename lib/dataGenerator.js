const faker = require('faker');

module.exports = {
    generateUserData: () => ({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    })
};
