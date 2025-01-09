import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Package, Shield, Truck, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PRODUCT_PRICE = '99.99';

const features = [
  { icon: Shield, title: 'Secure Payment', description: '256-bit encryption for all transactions' },
  { icon: Truck, title: 'Fast Shipping', description: '2-3 business days delivery' },
  { icon: Clock, title: '24/7 Support', description: 'Round the clock customer service' },
];

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture"
};

export function ProductSection() {
  const handleApprove = async (data: any, actions: any) => {
    const order = await actions.order.capture();
    console.log("Order completed", order);
    try {
      await supabase.from('orders').insert([
        { 
          order_id: data.orderID,
          amount: PRODUCT_PRICE,
          status: 'completed'
        }
      ]);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Premium Wireless Headphones
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience crystal-clear sound quality with our premium wireless headphones. 
              Featuring advanced noise cancellation and 30-hour battery life.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900">${PRODUCT_PRICE}</span>
                <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  In Stock
                </span>
              </div>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons 
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: PRODUCT_PRICE
                        }
                      }]
                    });
                  }}
                  onApprove={handleApprove}
                />
              </PayPalScriptProvider>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center space-x-3">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{feature.title}</h3>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
              alt="Premium Wireless Headphones"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-6 py-2 rounded-full transform rotate-3">
              Best Seller
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}