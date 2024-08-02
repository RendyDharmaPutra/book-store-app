interface tableBody {
	idBook: number;
	title: string;
	writer: string;
	publisher: string;
	year: number;
	category: string;
	price: number;
}

interface book {
	id: number;
	title: string;
	writer: string;
	year: number;
	price: number;
	category: string;
	publisher: string;
}

interface editBook {
	id: number;
	title: string;
	writer: {
		id: number;
	};
	publisher: {
		id: number;
	};
	category: {
		id: number;
	};
	year: number;
}

interface bookData {
	title: string;
	writer: string;
	year: number;
	price: number;
	publisher_id: number;
	category_id: number;
}

interface bookDataEdit extends bookData {
	id: number;
}

interface bookResult {
	id: number;
	title: string;
	year: number;
	categoryId: number;
	writerId: number;
	publisherId: number;
}

interface foreign {
	id: number;
	name: string;
}
