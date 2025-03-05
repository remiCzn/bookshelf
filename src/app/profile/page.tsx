"use client";
import { useUser } from "@/lib/auth";
import Button from "../_components/button";

import LogoutButton from "./_components/logout-button";
import Loader from "../_components/loader";
import ProfileField from "./_components/profile-field";

const ProfilePage = () => {
	const user = useUser();

	if (user.user) {
		return (
			<div className="flex-1 w-full h-full flex flex-col items-start justify-start p-4 gap-2">
				<h1 className="font-medium text-3xl">Mon compte</h1>
				<ProfileField label="Nom d'utilisateur" value={user?.user.username} />
				<ProfileField label="Email utilisé" value={user?.user.email} />

				<LogoutButton />
			</div>
		);
	}
	if (user.isLoading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<>
			<h1 className="font-medium text-2xl">Accéder à mon compte</h1>
			<Button variant="filled" href="/profile/login">
				Me connecter
			</Button>
			<Button variant="elevated" href="/profile/signup">
				Créer mon compte
			</Button>
		</>
	);
};

export default ProfilePage;
