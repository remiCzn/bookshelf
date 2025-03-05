import { authProcedure, createTRPCRouter } from "../trpc";

export const authRouter = createTRPCRouter({
	me: authProcedure.query(async ({ ctx }) => {
		return ctx.user;
	}),
});
