"use client";

import FAB from "@/app/_components/floating-action-button";
import { api } from "@/trpc/react";
import { LatLng } from "leaflet";
import { ArrowLeft, BookOpenText, ExternalLink, Locate } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { createDivIcon } from "./utils";
import "leaflet/dist/leaflet.css";
import Button from "@/app/_components/button";

const INIT_POS = new LatLng(48.866667, 2.333333);

export default function BookshopMapContainer() {
	const [locationSet, setLocationSet] = React.useState(false);

	return (
		<>
			<FAB
				href="/bookshop"
				size="small"
				Icon={ArrowLeft}
				className="z-20 absolute top-3 left-3"
			/>
			<MapContainer
				center={INIT_POS}
				zoom={13}
				scrollWheelZoom={true}
				attributionControl={false}
				zoomControl={false}
				style={{ height: "100%", flex: 1, zIndex: 1, width: "100%" }}
			>
				<MapContent locationSet={locationSet} setLocationSet={setLocationSet} />
			</MapContainer>
			<FAB
				size="small"
				onClick={() => setLocationSet(false)}
				Icon={Locate}
				className="z-20 absolute bottom-3 right-0"
			/>
		</>
	);
}

const MapContent = ({
	locationSet,
	setLocationSet,
}: {
	locationSet: boolean;
	setLocationSet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [pos, setPos] = React.useState<[number, number]>([
		INIT_POS.lat,
		INIT_POS.lng,
	]);

	const map = useMapEvents({
		locationfound: (e) => {
			setPos([e.latlng.lat, e.latlng.lng]);
		},
	});

	React.useEffect(() => {
		if (!locationSet && pos) {
			map.flyTo(pos, 13, { duration: 0.2 });
			setLocationSet(true);
		}
	}, [locationSet, pos, map.flyTo, setLocationSet]);

	const { data: bookshops } = api.bookshop.getAll.useQuery();

	map.locate({ watch: true, enableHighAccuracy: true });

	return (
		<>
			<TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={(cluster: any) =>
					createDivIcon(() => (
						<div className="flex items-center font-bold justify-center bg-tertiary-container size-8 rounded-full border border-on-tertiary-container/30 text-on-tertiary-container">
							{cluster.getChildCount()}
						</div>
					))
				}
			>
				{bookshops?.map((x) => {
					return (
						<Marker
							key={x.id}
							position={[x.longitude, x.latitude]}
							icon={createDivIcon(() => (
								<div className="flex items-center justify-center bg-tertiary-container size-8 rounded-full border border-on-tertiary-container/30 text-on-tertiary-container">
									<BookOpenText className="size-5" />
								</div>
							))}
						>
							<Popup>
								<p>{x.name}</p>
								<Button href={`/bookshop/${x.id}`}>
									Visiter <ExternalLink className="w-4 h-4" />
								</Button>
							</Popup>
						</Marker>
					);
				})}
			</MarkerClusterGroup>
			<Marker
				position={pos}
				icon={createDivIcon(() => (
					<span className="relative flex size-4 ">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75" />
						<div className="relative size-4 rounded-full bg-white border border-sky-600 flex items-center justify-center">
							<span className="size-3 bg-sky-600 rounded-full" />
						</div>
					</span>
				))}
			/>
		</>
	);
};
