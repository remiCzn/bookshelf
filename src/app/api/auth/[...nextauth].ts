import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				if (
					credentials?.email === "remi@remi.fr" &&
					credentials?.password === "1234"
				) {
					return {
						id: "1",
						username: "remi",
					};
				}
				return null;
			},
		}),
	],
});
