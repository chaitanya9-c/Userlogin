const User = require("./user");

const createUsersTable = async () => {
  try {
    await User.sync();

    console.log("Users table ready");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

const findUserByMobile = async (mobile_number) => {
  return await User.findOne({
    where: {
      mobile_number,
    },
  });
};

const createUser = async (
  first_name,
  last_name,
  email,
  mobile_number,
  gender,
  date_of_birth,
  password
) => {
  return await User.create({
    first_name,
    last_name,
    email,
    mobile_number,
    gender,
    date_of_birth,
    password,
  });
};

module.exports = {
  createUsersTable,
  findUserByEmail,
  findUserByMobile,
  createUser,
};