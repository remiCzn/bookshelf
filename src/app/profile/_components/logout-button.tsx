"use client";
import Button from "@/app/_components/button";
import { useUser } from "@/lib/auth";
import { signOut } from "@/server/auth/firebase-client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const router = useRouter();
	const user = useUser();
	return (
		<Button
			variant="elevated"
			onClick={() => {
				signOut().then(() => {
					user.refetch();
					router.push("/profile");
				});
			}}
		>
			Me déconnecter
		</Button>
	);
};

export default LogoutButton;
