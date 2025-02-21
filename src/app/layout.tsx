import "@/styles/globals.css";

import type { Metadata } from "next";
import { BookOpenText } from "lucide-react";

import { TRPCReactProvider } from "@/trpc/react";
import Link from "next/link";
import roboto from "@/styles/roboto";
import Footer from "./_components/footer";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
	title: "Bookself",
	description: "Created by remiCzn",
	icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({
	children,
	user,
}: Readonly<{ children: React.ReactNode; user: number }>) {
	const session = await getServerSession();

	return (
		<html lang="fr" className={`${roboto.className} bg-surface`}>
			<body>
				<TRPCReactProvider>
					<div className="bg-surface-container-lowest flex flex-col items-stretch h-svh overflow-hidden">
						<nav className="h-16 w-full shadow-lg shadow-shadow/10 bg-surface flex flex-row items-center justify-between p-4">
							<Link
								href="/bookshop"
								className="flex flex-row items-center gap-4 text-on-surface text-2xl font-normal"
							>
								<BookOpenText className="size-6" />
								Bookself {user}
							</Link>
						</nav>
						<div className="h-full overflow-hidden flex-1 flex flex-col relative">
							{children}
						</div>
						<Footer connected={!!session} />
					</div>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
