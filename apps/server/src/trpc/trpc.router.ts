import { INestApplication, Injectable, Logger } from "@nestjs/common";
import { z } from "zod";
import { TrpcService } from "@server/trpc/trpc.service";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PrismaService } from "@server/prisma/prisma.service";

const bookShopsValidation = z.array(
	z.object({
		name: z.string(),
		latitude: z.number(),
		longitude: z.number(),
		address_street: z.string().nullable(),
		address_city: z.string().nullable(),
		distance: z.number(),
	}),
);

type BookShops = z.infer<typeof bookShopsValidation>;

@Injectable()
export class TrpcRouter {
	constructor(
		private readonly trpcService: TrpcService,
		private readonly prismaService: PrismaService,
	) {}

	private readonly bookshopRouter = this.trpcService.router({
		getAll: this.trpcService.publicProcedure
			.input(
				z.object({
					latitude: z.number(),
					longitude: z.number(),
				}),
			)
			.output(bookShopsValidation)
			.query(async ({ input }) => {
				// return [];
				const result: BookShops = await this.prismaService.$queryRaw`
					SELECT name, latitude, longitude, address_street, address_city, (6371 * acos(cos(radians(${input.latitude})) 
									* cos(radians(latitude)) 
									* cos(radians(longitude) - radians(${input.longitude})) 
									+ sin(radians(${input.latitude})) 
									* sin(radians(latitude)))) as distance
					FROM "BookShop"
					ORDER BY distance ASC
					LIMIT 10;
				`;
				return result;
			}),
	});

	public readonly appRouter = this.trpcService.router({
		bookshops: this.bookshopRouter,
	});

	async applyMiddleware(app: INestApplication) {
		app.use(
			"/trpc",
			trpcExpress.createExpressMiddleware({
				router: this.appRouter,
				createContext: () => {
					return {
						errorMsg: null,
					};
				},
				middleware: (req, res, next) => {
					next();
				},
			}),
		);
	}
}

export type AppRouter = TrpcRouter[`appRouter`];
