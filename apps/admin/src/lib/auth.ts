import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { IUser } from '@packages/models';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        try {
          // Call backend and set the token in local storage

          if (credentials?.email && credentials?.password) {
            const response = await axios.post<{
              user: IUser;
              token: string;
            }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/`, {
              email: credentials.email,
              password: credentials.password,
            });

            const { data } = response;

            if (data) {
              if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.token);
              }

              return {
                ...data.user,
                token: data.token,
              };
            }
          }
        } catch (e) {
          console.error(e);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user as any;
      return session;
    },
  },
};
