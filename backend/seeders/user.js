import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
import { faker, simpleFaker } from "@faker-js/faker";
import { Message } from "../models/messageModel.js";

const createUsers = async (numUsers) => {
  try {
    const userPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = await User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      userPromise.push(tempUser);
    }

    await Promise.all(userPromise);

    console.log("users created", numUsers);

    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { createUsers};
