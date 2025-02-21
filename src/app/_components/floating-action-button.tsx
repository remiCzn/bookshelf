import React from "react";
import { cn } from "./utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

const buttonVariant = cva(
	"sticky mr-3 ml-auto bottom-3 bg-primary-container text-on-primary-container aspect-square shadow-sm shadow-shadow/10 flex items-center justify-center cursor-pointer",
	{
		variants: {
			size: {
				small: "rounded-xl w-10 h-10",
				standard: "rounded-2xl w-14 h-14",
				large: "rounded-[28px] w-24 h-24",
			},
		},
		defaultVariants: {
			size: "standard",
		},
	},
);

const iconVariant = cva("", {
	variants: {
		size: {
			small: "w-6 h-6",
			standard: "w-6 h-6",
			large: "w-9 h-9",
		},
	},
	defaultVariants: {
		size: "standard",
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariant> {
	asChild?: boolean;
	Icon?: React.ComponentType<React.SVGAttributes<SVGElement>>;
	href?: string;
}

const FAB = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, href, size, Icon, ...props }, ref) => {
		const c = cn(
			buttonVariant({
				size,
				className,
			}),
		);

		if (href) {
			return (
				<Link href={href} ref={ref} className={c} {...(props as any)}>
					{Icon && <Icon className={cn(iconVariant({ size }))} />}
					{children}
				</Link>
			);
		}

		return (
			<button ref={ref} className={c} {...props}>
				{Icon && <Icon className={cn(iconVariant({ size }))} />}
				{children}
			</button>
		);
	},
);

export default FAB;
