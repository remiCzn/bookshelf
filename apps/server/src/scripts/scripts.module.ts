import { Module } from "@nestjs/common";
import { PrismaModule } from "@server/prisma/prisma.module";
import { ScriptsService } from "./scripts.service";

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [ScriptsService],
	exports: [],
})
export class ScriptsModule {}
