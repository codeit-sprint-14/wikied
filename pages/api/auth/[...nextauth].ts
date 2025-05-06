import axios from 'axios';
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_ID || '',
      clientSecret: process.env.NAVER_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID || '',
      clientSecret: process.env.KAKAO_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '아이디', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.log('이메일 또는 비밀번호 없음');
          return null;
        }

        try {
          const response = await axios.post('https://wikied-api.vercel.app/14-6/auth/signIn', {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200 && response.data) {
            console.log('외부 API 로그인 성공:', response.data);

            const apiUser = response.data;

            return {
              // {
              //     "user": {
              //       "id": 2313,
              //       "name": "~~~~",
              //       "teamId": "14-6",
              //       "createdAt": "2025-04-22T10:30:02.439Z",
              //       "updatedAt": "2025-04-22T10:30:02.439Z",
              //       "profile": null,
              //       "email": "~~~~@gmail.com"
              //     },
              //     "accessToken": "~~~~"",
              //     "refreshToken": "~~~~~"
              //   }
              id: apiUser.user.id,
              name: apiUser.user.name,
              profile: apiUser.user.profile,
              accessToken: apiUser.accessToken,
              refreshToken: apiUser.refreshToken,
            };
          } else {
            console.log('API 로그인 실패:', response.status, response.data);
            return null;
          }
        } catch (error) {
          console.error('로그인 API 호출 중 에러:', error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.profile = user.profile;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        console.log(`token data : ${JSON.stringify(user)}`);
      }
      return token;
    },

    session: async ({ session, token }: { session: any; token: any }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.profile = token.profile;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },

  secret: process.env.SECRET,

  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
