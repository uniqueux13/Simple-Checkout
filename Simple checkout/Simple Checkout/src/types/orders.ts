export interface Order {
  id: number;
  order_id: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}