import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
	// api router should before the frontend router
	@Get("/health-check")
	healthCheck() {
		return "ok";
	}

	// This is the main route that will be used to serve the frontend
	@Get("/*")
	@Render("index.hbs")
	getIndex() {
		return {};
	}
}
