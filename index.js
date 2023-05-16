const fs = require("fs");
const { faker } = require("@faker-js/faker");

const generateData = (numRecords) => {
  const data = [];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < numRecords; i++) {
    const month = faker.helpers.arrayElement(months);
    const log = faker.datatype.number({ min: 1, max: 100000 });
    const msg = faker.hacker.phrase();
    const user = faker.internet.userName();

    data.push({
      month,
      log,
      msg,
      user,
    });
  }

  return data;
};

const numRecords = 100000;
const data = generateData(numRecords);
fs.writeFileSync("datamedia.json", JSON.stringify(data));
