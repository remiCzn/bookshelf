"use client";

import { BookOpenText, Store, User } from "lucide-react";
import FooterButton from "./footer-button";

type FooterProps = {
	connected?: boolean;
};

const Footer = ({ connected }: FooterProps) => {
	return (
		<footer className="shadow-lg shadow-shadow/10 bg-surface h-20 pt-3 pb-4 flex flex-row justify-around">
			<FooterButton href="/bookshop" title="Librairies" Icon={Store} />
			{connected && (
				<FooterButton href="/books" title="Bibliothèque" Icon={BookOpenText} />
			)}
			<FooterButton href="/profile" title="Profil" Icon={User} />
		</footer>
	);
};

export default Footer;
