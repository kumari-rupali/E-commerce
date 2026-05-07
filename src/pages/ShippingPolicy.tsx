import { Truck, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-sm"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Shipping Policy</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-blue">
              <Truck size={24} />
              <h2 className="text-xl font-bold">Delivery Timeline</h2>
            </div>
            <p>
              We strive to deliver your orders as quickly as possible. Generally, orders are shipped within 24-48 hours of being placed. 
              Standard delivery takes between 3-7 business days depending on your location. Metro cities usually receive orders within 3 days.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-blue">
              <Clock size={24} />
              <h2 className="text-xl font-bold">Express Shipping</h2>
            </div>
            <p>
              Available for select pin codes, Express Shipping ensures delivery within 1-2 business days. 
              Additional charges may apply for this service.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-blue">
              <MapPin size={24} />
              <h2 className="text-xl font-bold">Tracking Your Order</h2>
            </div>
            <p>
              Once your order is shipped, you will receive a tracking ID via email and SMS. 
              You can also track your order directly from the "My Orders" section in your profile.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-blue">
              <ShieldCheck size={24} />
              <h2 className="text-xl font-bold">Shipping Charges</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Free shipping on all orders above ₹1,000.</li>
              <li>A flat shipping fee of ₹150 is applicable for orders below ₹1,000.</li>
              <li>Shipping charges are non-refundable in case of returns.</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
