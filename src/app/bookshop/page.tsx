import { Compass, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import FAB from "../_components/floating-action-button";

const BookshopList = dynamic(() => import("./_components/list"), {
	loading: () => <Loader2 className="animate-spin" />,
});

export default function Bookshops() {
	return (
		<>
			<div className="flex-1 w-full overflow-auto relative flex flex-col pb-3">
				<h2 className="text-lg font-bold p-2">
					Toutes les librairies du coin et d'ailleurs
				</h2>
				<BookshopList />
			</div>
			<FAB className="absolute right-0" href="bookshop/map" Icon={Compass} />
		</>
	);
}
