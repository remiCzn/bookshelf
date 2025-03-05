import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { bookshopRouter } from "./routers/bookshop";
import { authRouter } from "./routers/auth";
import { booksRouter } from "./routers/book";

export const appRouter = createTRPCRouter({
	bookshop: bookshopRouter,
	auth: authRouter,
	books: booksRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
