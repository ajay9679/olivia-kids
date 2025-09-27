import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
  // Step 1: Get JWT from Supabase
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    }
  );
  const data = await res.json();
  console.log("Supabase Auth Response:", data);

  if (data.error) {
    throw new Error(data.error_description || "Invalid credentials");
  }

  // Step 2: Use JWT to fetch user profile
  if (data.access_token) {
    const profileRes = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
      }
    );
    const profile = await profileRes.json();
    if (profile && profile.id) {
      return { id: profile.id, email: profile.email };
    }
  }
  return null;
}
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({session, token}){
      session.user.id = token.id;
      return session;
    }
  },
  pages: { signIn: "/login" }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };