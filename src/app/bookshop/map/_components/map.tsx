"use client";

import dynamic from "next/dynamic";

const BookShopMap = dynamic(() => import("./map-container"), {
	ssr: false,
});

export default BookShopMap;
