import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { bookshopRouter } from "./routers/bookshop";

export const appRouter = createTRPCRouter({
  bookshop: bookshopRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
