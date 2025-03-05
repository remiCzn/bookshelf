"use client";

import { BookOpenText, Store, User } from "lucide-react";
import FooterButton from "./footer-button";
import { useUser } from "@/lib/auth";

const Footer = () => {
	const user = useUser();

	return (
		<footer className="shadow-lg shadow-shadow/10 bg-surface h-20 pt-3 pb-4 flex flex-row justify-around">
			<FooterButton href="/bookshop" title="Librairies" Icon={Store} />
			{!!user.user && (
				<FooterButton href="/books" title="Bibliothèque" Icon={BookOpenText} />
			)}
			<FooterButton href="/profile" title="Profil" Icon={User} />
		</footer>
	);
};

export default Footer;
