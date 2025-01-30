const { PrismaClient } = require("@prisma/client");
const fs = require("node:fs");

const prisma = new PrismaClient();

async function main() {
	const raw = fs.readFileSync("scripts/bookshops_full.geojson", "utf8");
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
		}));
	await prisma.$transaction(
		bookshops.map((x) =>
			prisma.bookShop.upsert({
				where: { osmId: x.osmId },
				create: x,
				update: x,
			}),
		),
	);
}

main();
