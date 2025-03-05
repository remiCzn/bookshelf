import { z } from "zod";
import { authProcedure, createTRPCRouter } from "../trpc";
import { getBookInformations } from "@/server/services/google-books.service";
import { TRPCError } from "@trpc/server";

const testIsbn = [
	"9782070345830", // notre dame de paris, victor hugo
	"9782330195267", // la forêt sombre, cixin liu
	"9780735234611", // 1984, george orwell
	"9782081473256", // les misérables, victor hugo
];
export const booksRouter = createTRPCRouter({
	addBook: authProcedure
		.input(z.string())
		.mutation(async ({ ctx, input: isbn }) => {
			if (!isbn) return;

			const existingBook = await ctx.db.book.findFirst({
				where: {
					OR: [{ isbn_10: isbn }, { isbn_13: isbn }],
				},
			});
			if (existingBook) {
				return existingBook;
			}

			const infos = await getBookInformations(isbn);
			if (!infos || infos.kind !== "books#volumes") {
				throw new TRPCError({
					message: "Not a valid ISBN",
					code: "BAD_REQUEST",
				});
			}

			if (infos.items.length === 0 && !infos.items[0]) {
				throw new TRPCError({
					message: "Not found",
					code: "NOT_FOUND",
				});
			}

			const bookInfos = infos.items[0];

			if (!bookInfos?.volumeInfo.authors[0]) {
				throw new TRPCError({
					message: "Not found",
					code: "NOT_FOUND",
				});
			}

			const book = await ctx.db.book.create({
				data: {
					title: bookInfos.volumeInfo.title,
					subtitle: bookInfos.volumeInfo.subtitle,
					author: {
						connectOrCreate: {
							where: {
								name: bookInfos.volumeInfo.authors[0],
							},
							create: {
								name: bookInfos.volumeInfo.authors[0],
							},
						},
					},
					publishedAt: new Date(bookInfos.volumeInfo.publishedDate),
					addedBy: {
						connect: {
							id: ctx.user.id,
						},
					},
					description: bookInfos.volumeInfo.description,
					isbn_10: bookInfos.volumeInfo.industryIdentifiers.find(
						(i) => i.type === "ISBN_10",
					)?.identifier,
					isbn_13: bookInfos.volumeInfo.industryIdentifiers.find(
						(i) => i.type === "ISBN_13",
					)?.identifier,
					language: {
						connectOrCreate: {
							where: {
								id: bookInfos.volumeInfo.language,
							},
							create: {
								id: bookInfos.volumeInfo.language,
							},
						},
					},
					thumbnail:
						bookInfos.volumeInfo.imageLinks?.thumbnail ??
						bookInfos.volumeInfo.imageLinks?.smallThumbnail,
				},
			});

			return book;
		}),
});
