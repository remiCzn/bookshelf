import React from "react";
import { trpc } from "./utils/trpc";

function App() {
	const [pos, setPos] = React.useState<[number, number]>([0, 0]);

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setPos([pos.coords.latitude, pos.coords.longitude]);
		});
	});

	const { data: bookshops } = trpc.bookshops.getAll.useQuery({
		latitude: pos[1],
		longitude: pos[0],
	});

	return (
		<>
			<p className="text-black">
				{bookshops && JSON.stringify(bookshops.map((x) => x.distance))}
			</p>
		</>
	);
}

export default App;
