import { Injectable } from "@nestjs/common";
import { PrismaService } from "@server/prisma/prisma.service";
import * as fs from "node:fs";

@Injectable()
export class ScriptsService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		const raw = fs.readFileSync(`${__dirname}/bookshops_full.geojson`, "utf8");

		const bookshops = JSON.parse(raw)
			.features.filter((x) => {
				return !!x.properties.name && !!x.id && !!x.geometry.coordinates;
			})
			.map((x) => ({
				name: x.properties.name,
				osmId: x.id,
				latitude:
					x.geometry.type === "Point"
						? x.geometry.coordinates[0]
						: x.geometry.type === "Polygon"
							? x.geometry.coordinates[0][0][0]
							: x.geometry.coordinates[0][0][0][0],
				longitude:
					x.geometry.type === "Point"
						? x.geometry.coordinates[1]
						: x.geometry.type === "Polygon"
							? x.geometry.coordinates[0][0][1]
							: x.geometry.coordinates[0][0][0][1],
				address_city:
					x.properties?.["addr:city"] ?? x.properties?.["contact:city"],
				address_housenumber:
					x.properties?.["addr:housenumber"] ??
					x.properties?.["contact:housenumber"],
				address_postcode:
					x.properties?.["addr:postcode"] ?? x.properties?.["contact:postcode"],
				address_street:
					x.properties?.["addr:street"] ?? x.properties?.["contact:street"],

				email: x.properties?.email ?? x.properties?.["contact:email"],
				phone: x.properties?.phone ?? x.properties?.["contact:phone"],
				website: x.properties?.website ?? x.properties?.["contact:website"],

				openingHours: x.properties?.opening_hours,
			}));
		await this.prisma.$transaction(
			bookshops.map((x) =>
				this.prisma.bookShop.upsert({
					where: { osmId: x.osmId },
					create: x,
					update: x,
				}),
			),
		);

		return;
	}
}
