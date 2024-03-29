import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/mongoose";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    //   serverless -> lambda (only runs when it is called)

    async signIn({ profile }) {
      try {
        await connectToDB();

        //   check if user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        // if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (e) {
        console.log(`There was an error logging you in: ${e}`);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
