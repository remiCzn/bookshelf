"use client";

import * as React from "react";
import { cn } from "./utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
	"rounded outline outline-1 outline-outline-variant text-on-surface text-base font-normal focus:outline-primary focus:outline-2 transition-colors",
	{
		variants: {
			size: {
				standard: "h-14 px-4",
				small: "h-10 px-3",
			},
		},
		defaultVariants: {
			size: "standard",
		},
	},
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, size, name, ...props }, ref) => {
		const [focused, setFocused] = React.useState(false);

		return (
			<div className="relative w-full">
				<label
					htmlFor={name}
					className={cn(
						"absolute -top-2 left-3 bg-surface-container-lowest px-1 text-on-surface-variant text-xs font-normal transition-colors",
						focused && "text-primary",
						!props.value && "text-transparent bg-transparent transition-colors",
					)}
				>
					{props.placeholder}
				</label>
				<input
					name={name}
					type={type}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					className={cn(inputVariants({ size, className }))}
					ref={ref}
					{...props}
				/>
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
