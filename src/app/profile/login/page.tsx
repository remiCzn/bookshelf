"use client";
import FAB from "@/app/_components/floating-action-button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/button";
import { signInWithGoogle } from "@/server/auth/firebase-client";
import { useUser } from "@/lib/auth";

export default function Login() {
	const user = useUser();
	const router = useRouter();

	if (user.user) {
		router.push("/profile");
	}

	return (
		<>
			<FAB
				className="absolute top-4 left-4"
				Icon={ArrowLeft}
				href="/profile"
				size="small"
			/>
			<h1 className="font-medium text-2xl">Me connecter</h1>
			<Button
				variant="elevated"
				onClick={() => {
					signInWithGoogle().then(() => {
						user.refetch();
					});
				}}
			>
				Me connecter avec Google
			</Button>
		</>
	);
}
