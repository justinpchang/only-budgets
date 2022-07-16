import { DocumentReference } from "firebase/firestore";

type TransactionType = "INCOME" | "EXPENSE";
type UserTransactionCategory = DocumentReference;

interface Transaction {
  amount: number;
  description: string;
  type: TransactionType;
  category: UserTransactionCategory;
}

interface User {
  first_name: string;
  last_name: string;
  transactions: Transaction[];
  categories: UserTransactionCategory[];
}

export {};
