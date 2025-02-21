import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const BookshopGetAllInputSchema = z.union([
  z.undefined(),
  z.object({
    latitude: z.number(),
    longitude: z.number(),
    take: z.number(),
  }),
]);

const BookshopGetAllOutputSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    address_street: z.string().nullable().optional(),
    address_city: z.string().nullable().optional(),
    distance: z.number().optional(),
  })
);

type BookshopGetAllOutput = z.infer<typeof BookshopGetAllOutputSchema>;

export const bookshopRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(BookshopGetAllInputSchema)
    .output(BookshopGetAllOutputSchema)
    .query(async ({ input, ctx }) => {
      if (!input?.take) {
        const result: BookshopGetAllOutput = await ctx.db.$queryRaw`
				SELECT id, name, latitude, longitude
				FROM "BookShop";
			`;
        return result;
      }

      const result: BookshopGetAllOutput = await ctx.db.$queryRaw`
				SELECT id, name, latitude, longitude, address_street, address_city, (6371 * acos(cos(radians(${input.latitude})) 
								* cos(radians(latitude)) 
								* cos(radians(longitude) - radians(${input.longitude})) 
								+ sin(radians(${input.latitude})) 
								* sin(radians(latitude)))) as distance
				FROM "BookShop"
				ORDER BY distance ASC
				LIMIT ${input.take};
			`;
      return result;
    }),

  getOne: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const id = input;
    const bookshop = await ctx.db.bookShop.findUnique({
      where: {
        id,
      },
      omit: {
        osmId: true,
      },
    });

    if (!bookshop) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Bookshop not found",
      });
    }

    return bookshop;
  }),
});
