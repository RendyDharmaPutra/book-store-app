interface transactionTable {
  id: number;
  time: string;
  amount: string;
  user: string;
}

interface bookTransaction {
  id: number;
  title: string;
  writer: string;
  year: number;
  price: number;
}

interface selectedBook {
  id: string;
  quantity: string;
}

interface transaction {
  time: Date;
  amount: number;
  user_id: number;
}

interface detailTransaction {
  quantity: number;
  book_id: number;
  transaction_id: number;
}
