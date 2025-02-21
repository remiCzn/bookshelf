import { PageProps } from ".next/types/app/page";
import { db } from "@/server/db";

export default async function Bookshops(props: PageProps) {
	const id = (await props.params).id;
	const x = await db.bookShop.findFirst({ where: { id } });
	return <div>{x?.name}</div>;
}
