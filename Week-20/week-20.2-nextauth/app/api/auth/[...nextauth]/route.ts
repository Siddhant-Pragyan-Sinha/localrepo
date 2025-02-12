import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email",
    
      credentials: {
        username: { label: "Username", type: "text", placeholder: "MeraNaam@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        //db request to check if the username and password  is correct or not
        const user = { 
          id: "1",
          name: "Mera Naam", 
          email: "MeraNaam@gmail.com" 
      }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET
});

export const GET = handler
export const POST = handler


