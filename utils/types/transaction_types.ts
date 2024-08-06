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
