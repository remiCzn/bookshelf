import { INestApplication, Injectable, Logger } from "@nestjs/common";
import { z } from "zod";
import { TrpcService } from "@server/trpc/trpc.service";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PrismaService } from "@server/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

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
			.output(
				z.array(
					z.object({
						name: z.string(),
						distance: z.number(),
					}),
				),
			)
			.query(async ({ input }) => {
				return await this.prismaService.$queryRaw`
			SELECT name,
				   (6371 * acos(cos(radians(${input.latitude})) 
							   * cos(radians(latitude)) 
							   * cos(radians(longitude) - radians(${input.longitude})) 
							   + sin(radians(${input.latitude})) 
							   * sin(radians(latitude)))) AS distance
			FROM "BookShop"
			ORDER BY distance ASC;
		  `;
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
