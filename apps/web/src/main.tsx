import ReactDOM from "react-dom/client";
import "./index.css";
import { TrpcProvider } from "./provider/trpc.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Index from "./pages/index.tsx";
import PageLayout from "./pages/layout.tsx";
import MapPage from "./pages/map.tsx";

const root = document.getElementById("root");

if (!root) {
	throw new Error("root element not found");
}

ReactDOM.createRoot(root).render(
	<TrpcProvider>
		<BrowserRouter>
			<Routes>
				<Route element={<PageLayout />}>
					<Route path="/" element={<Index />} />
					<Route path="map" element={<MapPage />} />
				</Route>
			</Routes>
			{import.meta.env.DEV && <ReactQueryDevtools />}
		</BrowserRouter>
	</TrpcProvider>,
);
