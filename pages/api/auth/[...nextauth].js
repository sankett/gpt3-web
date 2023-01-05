import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.clientId,
            clientSecret: process.env.clientSecret,
        })
    ]

});

