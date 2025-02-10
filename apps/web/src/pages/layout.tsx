import { Outlet } from "react-router";

const PageLayout = () => {
	return (
		<div className="flex flex-col items-stretch min-h-screen max-h-screen">
			<div className="h-10 w-full bg-stone-300">top</div>
			<div className="max-h-full min-h-full flex-1 overflow-auto">
				<Outlet />
			</div>
			<div className="h-10 w-full bg-stone-300">bar</div>
		</div>
	);
};

export default PageLayout;
