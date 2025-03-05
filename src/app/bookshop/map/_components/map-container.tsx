"use client";

import Fab from "@/app/_components/floating-action-button";
import { api } from "@/trpc/react";
import { LatLng } from "leaflet";
import { BookOpenText, ExternalLink, Locate } from "lucide-react";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { createDivIcon } from "./utils";
import "leaflet/dist/leaflet.css";
import Button from "@/app/_components/button";
import { useLocation } from "@/lib/geolocation";

const INIT_POS = new LatLng(48.866667, 2.333333);

const BookIcon = () => (
	<div className="flex items-center justify-center bg-tertiary-container size-8 rounded-full border border-on-tertiary-container/30 text-on-tertiary-container">
		<BookOpenText className="size-5" />
	</div>
);

const PositionIcon = () => (
	<span className="relative flex size-4 ">
		<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75" />
		<div className="relative size-4 rounded-full bg-white border border-sky-600 flex items-center justify-center">
			<span className="size-3 bg-sky-600 rounded-full" />
		</div>
	</span>
);

const ClusterIcon = (i: number) => {
	return () => (
		<div className="flex items-center font-bold justify-center bg-tertiary-container size-8 rounded-full border border-on-tertiary-container/30 text-on-tertiary-container">
			{i}
		</div>
	);
};

export default function BookshopMapContainer() {
	const [locationSet, setLocationSet] = React.useState(false);

	return (
		<>
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
			<Fab
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
	const { data: bookshops } = api.bookshop.getAll.useQuery(void 0, {
		staleTime: Number.POSITIVE_INFINITY,
	});

	return (
		<>
			<TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

			<MarkerClusterGroup
				iconCreateFunction={(cluster: any) =>
					createDivIcon(ClusterIcon(cluster.getChildCount()))
				}
			>
				{bookshops?.map((x) => {
					return (
						<Marker
							key={x.id}
							position={[x.longitude, x.latitude]}
							icon={createDivIcon(BookIcon)}
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
			<PositionMarker
				locationSet={locationSet}
				setLocationSet={setLocationSet}
			/>
		</>
	);
};

const PositionMarker = ({
	locationSet,
	setLocationSet,
}: {
	locationSet: boolean;
	setLocationSet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const pos = useLocation();

	const map = useMap();

	React.useEffect(() => {
		if (!locationSet && pos) {
			map.flyTo(pos, 13, { duration: 0.2 });
			setLocationSet(true);
		}
	}, [locationSet, pos, map.flyTo, setLocationSet]);

	return pos && <Marker position={pos} icon={createDivIcon(PositionIcon)} />;
};
