export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Delivery & Collection</h1>
          <p className="text-emerald-100">Fast, reliable delivery across Edinburgh</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Options</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Same-Day Delivery</h3>
              <p className="text-gray-600">Orders placed before 2:00 PM qualify for same-day delivery to Edinburgh EH postcodes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Next-Day Delivery</h3>
              <p className="text-gray-600">Orders placed after 2:00 PM will be delivered the next business day.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Click & Collect</h3>
              <p className="text-gray-600">Pick up your order from 33 Albert Street in about 1 hour. No delivery fee!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Fees</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <div className="font-semibold text-gray-900">Local (EH6, EH7, EH8)</div>
                <div className="text-sm text-gray-600">Minimum order: £20</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600">£2.99</div>
                <div className="text-xs text-gray-600">Free over £60</div>
              </div>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <div className="font-semibold text-gray-900">Extended (Other EH postcodes)</div>
                <div className="text-sm text-gray-600">Minimum order: £25</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600">£4.99</div>
                <div className="text-xs text-gray-600">Free over £70</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ready to order?</h2>
          <p className="text-gray-600 mb-6">Enter your postcode at checkout to check delivery availability and fees.</p>
          <a
            href="/shop"
            className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
