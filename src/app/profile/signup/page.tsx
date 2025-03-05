"use client";
import FAB from "@/app/_components/floating-action-button";
import { useUser } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Signup() {
	const user = useUser();
	const router = useRouter();

	if (user.user) {
		router.push("/profile");
	}

	return (
		<>
			<FAB
				Icon={ArrowLeft}
				href="/profile"
				className="absolute top-4 left-4"
				size="small"
			/>
			<h1 className="font-medium text-2xl">Créer un compte</h1>
			<p>Non disponible pour le moment, se connecter avec Google</p>
		</>
	);
}
