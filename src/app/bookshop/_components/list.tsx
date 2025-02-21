"use client";

import { api } from "@/trpc/react";
import { BookOpen, MapIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const displayDistance = (distance?: number) => {
	if (!distance) {
		return "N/A";
	}
	if (distance < 1) {
		return `${(distance * 1000).toFixed(0)} m`;
	}
	return `${(distance).toFixed(1)} km`;
};

export default function BookshopList() {
	const [pos, setPos] = React.useState<[number, number]>([
		48.86085871690896, 2.3364606670572963,
	]);

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setPos([pos.coords.latitude, pos.coords.longitude]);
		});
	}, []);

	const { data: bookshops } = api.bookshop.getAll.useQuery({
		latitude: pos[1],
		longitude: pos[0],
		take: 20,
	});

	return (
		<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-stretch px-2 relative">
			{bookshops
				? bookshops.map((x) => (
						<Link
							key={x.id}
							href={`/bookshop/${x.id}`}
							className="w-full rounded-xl shadow-md overflow-hidden"
						>
							<div className="text-gray-300 w-full min-h-36 bg-gray-100 flex items-center justify-center rounded-xl">
								<BookOpen />
							</div>
							<div className="p-4">
								<div className="flex flex-row items-center justify-between">
									<p className="font-medium text-base">{x.name}</p>
									<p className="inline-flex text-xs">
										<MapIcon className="w-4 h-4 mr-1" strokeWidth={1} />{" "}
										{displayDistance(x?.distance)}
									</p>
								</div>
								<p className="text-sm text-stone-500">
									{x.address_street}
									{x.address_city && `, ${x.address_city}`}
								</p>
							</div>
						</Link>
					))
				: null}
		</div>
	);
}
