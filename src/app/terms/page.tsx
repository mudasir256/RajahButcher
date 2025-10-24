export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 prose prose-gray max-w-none">
          <p className="text-gray-600">
            By using this website and placing orders with Rajah's Supermarket, you agree to these terms and conditions.
          </p>
          <h2>Orders and Payment</h2>
          <p className="text-gray-600">
            All orders are subject to availability. Payment is collected upon delivery or collection. We reserve the right to refuse any order.
          </p>
          <h2>Delivery</h2>
          <p className="text-gray-600">
            We aim to deliver within the specified time slots. Delays may occur due to circumstances beyond our control.
          </p>
          <h2>Returns and Refunds</h2>
          <p className="text-gray-600">
            Due to the perishable nature of our products, we cannot accept returns. If you're unsatisfied with your order, please contact us within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
