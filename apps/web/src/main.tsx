import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TrpcProvider } from "./provider/trpc.tsx";

const root = document.getElementById("root");

if (!root) {
	throw new Error("root element not found");
}

ReactDOM.createRoot(root).render(
	<TrpcProvider>
		<App />
	</TrpcProvider>,
);
