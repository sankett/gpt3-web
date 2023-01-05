import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.clientId,
            clientSecret: process.env.clientSecret,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    

});

