import User from "./datasources/mongoDB";
import argon2 from "argon2";

// define GraphQL resolver
const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    me: async (_: any, __: any, { req }: any) => {
      // Check if user ID is set in session
      const userId = req.session.userId;
      const user = await User.findById(userId);
      if (!user) {
        return null;
      }
      return user;
    },
  },
  Mutation: {
    registerUser: async (_: any, { name, email, password }: any) => {
      const userName = await User.findOne({ name });
      if (userName) {
        throw new Error("User name already exists");
      }
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        throw new Error("Email already exists");
      }
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      return newUser;
    },

    async login(_: any, { name, password }: any, { req }: any) {
      const user = await User.findOne({ name });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isPasswordCorrect = await argon2.verify(
        user.password as string,
        password
      );
      if (!isPasswordCorrect) {
        throw new Error("Invalid credentials");
      }
      // Set session user ID
      req.session.userId = user.id;
      return user;
    },

    logout: (_: any, __: any, { req }: any) => {
      // Destroy session
      req.session.destroy();
      return true;
    },
  },
};

export default resolvers;
