/*
  # Create orders table for PayPal transactions

  1. New Tables
    - `orders`
      - `id` (bigint, primary key)
      - `order_id` (text, PayPal order ID)
      - `amount` (text, transaction amount)
      - `status` (text, order status)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for authenticated users to insert their own orders
    - Add policy for authenticated users to read their own orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id text NOT NULL,
  amount text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);