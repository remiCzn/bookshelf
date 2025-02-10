import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "@server/prisma/prisma.service";
import { TRPCError, initTRPC } from "@trpc/server";

@Injectable()
export class TrpcService {
	trpc = initTRPC.create();
	publicProcedure = this.trpc.procedure;
	protectedProcedure = this.trpc.procedure.use(({ ctx, next }) => {
		// biome-ignore lint/suspicious/noExplicitAny: protect
		const errorMsg = (ctx as any).errorMsg;
		if (errorMsg) {
			throw new TRPCError({ code: "UNAUTHORIZED", message: errorMsg });
		}
		return next({ ctx });
	});
	router = this.trpc.router;
	mergeRouters = this.trpc.mergeRouters;
}
