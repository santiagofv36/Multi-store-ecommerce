import { DefaultJWT } from 'next-auth/jwt';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      active: boolean;
      email: string;
      activeSession: {
        token: string;
      };
    } & DefaultSession['user'];
  }

  interface User {
    _id: string;
    email: string;
    activeSession: {
      token: string;
    };
  }

  interface JWT extends DefaultJWT {
    _id: string;
    email: string;
    token: string;
  }
}
