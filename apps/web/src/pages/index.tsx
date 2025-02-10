import React from "react";
import { BookOpen, Compass, Map as MapIcon } from "lucide-react";
import { trpc } from "../utils/trpc";
import { useNavigate } from "react-router";

const displayDistance = (distance: number) => {
	if (distance < 1) {
		return `${(distance * 1000).toFixed(0)} m`;
	}
	return `${(distance).toFixed(1)} km`;
};

function Index() {
	const [pos, setPos] = React.useState<[number, number]>([
		48.86085871690896, 2.3364606670572963,
	]);

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setPos([pos.coords.latitude, pos.coords.longitude]);
		});
	}, []);

	const { data: bookshops } = trpc.bookshops.getAll.useQuery({
		latitude: pos[1],
		longitude: pos[0],
	});

	const nav = useNavigate();

	return (
		<div className="">
			<div className="flex flex-col gap-2 items-stretch px-2 relative">
				<h2 className="text-lg font-bold py-2">
					Toutes les librairies du coin
				</h2>
				{bookshops
					? bookshops.map((x) => (
							<div key={x.name} className="w-full p-1 rounded-md">
								<div className="text-gray-300 w-full min-h-36 rounded-md bg-gray-100 flex items-center justify-center active:bg-gray-200">
									<BookOpen />
								</div>
								<div className="flex flex-row items-center justify-between">
									<p className="font-semibold text-base">{x.name}</p>
									<p className="inline-flex text-xs">
										<MapIcon className="w-4 h-4 mr-1" strokeWidth={1} />{" "}
										{displayDistance(x.distance)}
									</p>
								</div>
								<p className="text-sm text-stone-500">
									{x.address_street}
									{x.address_city && `, ${x.address_city}`}
								</p>
							</div>
						))
					: null}
			</div>
			<div
				onClick={() => nav("map")}
				className="bg-stone-500 text-white rounded-full aspect-square w-12 h-12 sticky ml-auto mr-3 bottom-3 flex items-center justify-center"
			>
				<Compass className="w-6 h-6" />
			</div>
		</div>
	);
}

export default Index;
