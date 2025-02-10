import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
	return (
		<div className="flex flex-col justify-between">
			<MapContainer
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={true}
				style={{ height: "200px" }}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
			<p>aa</p>
		</div>
	);
};

export default MapPage;
