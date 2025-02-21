"use client";
import Link from "next/link";
import { cn } from "./utils";
import { usePathname } from "next/navigation";

type FoorterButtonProps = {
	href: string;
	title: string;
	selected?: boolean;
	Icon?: React.ComponentType<React.SVGAttributes<SVGElement>>;
};

const FooterButton = ({ href, title, selected, Icon }: FoorterButtonProps) => {
	const path = usePathname();
	const isLinkSelected =
		selected ?? (path === href || path.startsWith(`${href}/`));

	return (
		<Link
			href={href}
			className={cn(
				"flex flex-col items-center gap-1",
				isLinkSelected ? "text-on-secondary-container" : "text-on-surface",
			)}
		>
			{Icon && (
				<div
					className={cn(
						"w-16 h-8 rounded-2xl flex items-center justify-center",
						isLinkSelected && "bg-secondary-container",
					)}
				>
					<Icon className="w-6 h-6" />
				</div>
			)}
			<p
				className={cn("text-xs", isLinkSelected ? "font-bold" : "font-medium")}
			>
				{title}
			</p>
		</Link>
	);
};

export default FooterButton;
