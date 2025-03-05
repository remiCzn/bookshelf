import axios from "axios";

type BookInformations = {
	kind: string;
	totalItems: number;
	items: Array<{
		kind: string;
		id: string;
		etag: string;
		selfLink: string;
		volumeInfo: {
			title: string;
			subtitle?: string;
			authors: Array<string>;
			publisher: string;
			publishedDate: string;
			description?: string;
			industryIdentifiers: Array<{
				type: "ISBN_10" | "ISBN_13";
				identifier: string;
			}>;
			pageCount: number;
			imageLinks?: {
				smallThumbnail?: string;
				thumbnail?: string;
			};
			language: string;
		};
		searchInfo: {
			textSnippet: string;
		};
	}>;
};

export const getBookInformations = (isbn: string) => {
	if (!isbn) return;
	console.log(`Searching for book with ISBN: ${isbn}`);
	return axios
		.get<BookInformations>(
			`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
		)
		.then((res) => res.data);
};
