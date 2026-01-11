interface Account {
  id: number;
  name: string;
  platform?: string;
  balance: number;
  accountType?: { name: string };
}
