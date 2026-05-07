import { RotateCcw, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReturnsExchanges() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-sm"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Returns & Exchanges</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-orange">
              <RotateCcw size={24} />
              <h2 className="text-xl font-bold">30-Day Return Window</h2>
            </div>
            <p>
              We offer a hassle-free 30-day return window for most products. If you're not satisfied with your purchase, you can initiate a return within 30 days of delivery.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-orange">
              <Package size={24} />
              <h2 className="text-xl font-bold">Return Process</h2>
            </div>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Go to "My Orders" in your account.</li>
              <li>Select the item you want to return.</li>
              <li>Choose a reason for return and upload images if needed.</li>
              <li>Select your preferred refund or exchange option.</li>
              <li>Our pick-up partner will collect the item within 48 hours.</li>
            </ol>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-orange">
              <AlertTriangle size={24} />
              <h2 className="text-xl font-bold">Non-Returnable Items</h2>
            </div>
            <p>
              Certain items like innerwear, hygiene products, and items sold during clearance sales are not eligible for returns unless they are received in a damaged condition.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-4 text-flipkart-orange">
              <CheckCircle size={24} />
              <h2 className="text-xl font-bold">Refund Policy</h2>
            </div>
            <p>
              Refunds are processed within 5-7 business days after the item reaches our warehouse and passes the quality check. 
              The refund will be credited back to your original payment method.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
