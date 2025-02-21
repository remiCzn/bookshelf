"use client";
import L from "leaflet";
import { JSX } from "react";
import ReactDOMServer from "react-dom/server";

export function createDivIcon(Icon: () => JSX.Element) {
	const iconHTML = ReactDOMServer.renderToString(
		<div className="flex items-center justify-center w-full h-full">
			<Icon />
		</div>,
	);

	return L.divIcon({
		className: "custom-marker-icon",
		html: iconHTML,
		iconSize: [40, 40],
		iconAnchor: [20, 20],
	});
}
