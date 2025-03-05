"use client";

import { ScanBarcode, SendHorizonal } from "lucide-react";
import Fab from "../_components/floating-action-button";
import { Input } from "../_components/input";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../_components/dialog";
import QRCode from "./_components/qr-code";
import useCameraPermission from "@/lib/camera";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import Button from "../_components/button";
import Loader from "../_components/loader";
import React from "react";

const BookshelfPage = () => {
	const { permission, requestCameraAccess } = useCameraPermission();

	const [result, setResult] = React.useState<string[]>([]);

	const addBook = api.books.addBook.useMutation();

	const form = useForm<{
		isbn: string;
	}>();

	const send = (res: { isbn: string }) => {
		addBook.mutate(res.isbn, {
			onSuccess: (d) => {
				setResult((r) => [...r, `${d?.title}`]);
			},
		});
	};

	return (
		<div className="flex-1 w-full h-full flex flex-col items-stretch justify-start p-4 relative">
			<Input
				placeholder="Rechercher un livre ..."
				className="w-full rounded-full"
			/>
			<Dialog>
				<DialogTrigger asChild>
					<Fab Icon={ScanBarcode} className="absolute right-0 bottom-3" />
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Scanner un livre</DialogTitle>
					{permission === "loading" && <Loader />}
					{permission === "prompt" && (
						<div className="flex flex-row items-center justify-center">
							<Button onClick={requestCameraAccess}>
								Demander l'accès à la caméra
							</Button>
						</div>
					)}
					{permission === "granted" && <QRCode onResult={send} />}
					{permission === "denied" && (
						<>
							<p className="text-secondary">
								Pas d'accès à la caméra, veuiller entrer manuellement l'ISBN
							</p>
							<div className="flex flex-row items-center justify-stre gap-2 w-full">
								<Input
									{...form.register("isbn")}
									size="small"
									type="number"
									className="w-full"
									placeholder="ISBN"
								/>
								<Button
									variant="filledTonal"
									size="square"
									onClick={form.handleSubmit(send)}
								>
									<SendHorizonal className="w-4 h-4" />
								</Button>
							</div>
						</>
					)}
					<ul>
						{result.map((r) => (
							<li key={r}>{r}</li>
						))}
					</ul>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default BookshelfPage;
