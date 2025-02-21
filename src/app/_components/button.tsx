import React from "react";
import { cn } from "./utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

const buttonVariant = cva(
	"rounded-full h-10 px-6 flex flex-row items-center justify-center gap-2 cursor-pointer disabled:cursor-auto font-roboto text-sm font-medium",
	{
		variants: {
			variant: {
				elevated:
					"shadow-sm shadow-shadow/10 bg-surface-container-low text-primary disabled:bg-on-surface/10 disabled:text-on-surface/40 disabled:shadow-none",
				filled:
					"shadow-sm shadow-shadow/10 bg-primary text-on-primary disabled:bg-on-surface/10 disabled:text-on-surface/40",
				filledTonal:
					"shadow-none bg-secondary-container shadow-shadow text-on-secondary-container disabled:bg-on-surface/10 disabled:text-on-surface/40",
				outlined:
					"bg-transparent border border-outline text-primary disabled:text-on-surface/40 disabled:border-on-surface/10",
				text: "bg-transparent text-primary disabled:text-on-surface/40",
			},
		},
		defaultVariants: {
			variant: "elevated",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariant> {
	asChild?: boolean;
	href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant, className, href, ...props }, ref) => {
		const c = cn(buttonVariant({ variant, className }));
		if (href) {
			return (
				<Link href={href} ref={ref} className={c} {...(props as any)}>
					{children}
				</Link>
			);
		}
		return (
			<button ref={ref} className={c} {...props}>
				{children}
			</button>
		);
	},
);

export default Button;
