import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { TrpcModule } from "./trpc/trpc.module";
import configuration from "./configuration";
import { ScriptsModule } from "./scripts/scripts.module";

@Module({
	imports: [
		TrpcModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [".env"],
			load: [configuration],
		}),
		ScriptsModule,
	],
	controllers: [AppController],
})
export class AppModule {}
