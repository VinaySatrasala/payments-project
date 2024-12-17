import prisma from "@repo/db/client";
import CredentialsProvider,{CredentialsConfig} from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import z from "zod"
import { AuthOptions } from "next-auth";


const CredentialsSchema = z.object({
    phone: z.string().min(10).max(15),
    password: z.string(),
});

export const authOptions : AuthOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" }
          },
          // TODO: User credentials type from next-auth
          async authorize(credentials:any) {
            // Do zod validation, OTP validation here
            const {success} = CredentialsSchema.safeParse(credentials);
            if(!success){
                throw new Error("Invalid credentials format")
            }
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await prisma.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                console.log("Reached")
                const user = await prisma.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }:any) {
            session.user.id = token.sub
            return session
        }
    },
    pages:{
        "signIn" : '/auth/signin'    
    }
  }
 