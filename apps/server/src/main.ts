import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import type { ConfigurationType } from "./configuration";
import { json, urlencoded } from "express";
import { TrpcRouter } from "@server/trpc/trpc.router";
import { join } from "node:path";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);

	const serverConfig = configService.get<ConfigurationType["server"]>("server");

	if (!serverConfig) {
		throw new Error("server config is not defined");
	}

	const { host, isProd, port } = serverConfig;

	app.use(json({ limit: "10mb" }));
	app.use(urlencoded({ extended: true, limit: "10mb" }));

	app.useStaticAssets(join(__dirname, "..", "client", "assets"), {
		prefix: "/assets/",
	});
	app.setBaseViewsDir(join(__dirname, "..", "client"));
	app.setViewEngine("hbs");

	if (isProd) {
		app.enable("trust proxy");
	}

	app.enableCors({
		exposedHeaders: ["authorization"],
	});

	const trpc = app.get(TrpcRouter);
	trpc.applyMiddleware(app);

	await app.listen(port, host);

	console.log(`Server is running at http://${host}:${port}`);
}
bootstrap();
