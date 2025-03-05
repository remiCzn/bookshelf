"use client";

import { Compass } from "lucide-react";
import Fab from "../_components/floating-action-button";
import BookshopList from "./_components/list";

export default function Bookshops() {
	return (
		<>
			<div className="flex-1 w-full overflow-auto relative flex flex-col pb-3">
				<h2 className="text-lg font-bold p-2">
					Toutes les librairies du coin et d'ailleurs
				</h2>
				<BookshopList />
			</div>
			<Fab className="absolute right-0" href="bookshop/map" Icon={Compass} />
		</>
	);
}
