import BookShopMap from "./_components/map";
import Fab from "../../_components/floating-action-button";
import { ArrowLeft } from "lucide-react";
export default function MapPage() {
	return (
		<div className="flex flex-col justify-between h-[calc(100vh-104px)] relative">
			<Fab
				href="/bookshop"
				size="small"
				Icon={ArrowLeft}
				className="z-20 absolute top-3 left-3"
			/>
			<BookShopMap />
		</div>
	);
}
