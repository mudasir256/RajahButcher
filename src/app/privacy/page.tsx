export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 prose prose-gray max-w-none">
          <p className="text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <h2>Information We Collect</h2>
          <p className="text-gray-600">
            We collect information necessary to process your orders, including name, email, phone number, and delivery address.
          </p>
          <h2>How We Use Your Information</h2>
          <p className="text-gray-600">
            Your information is used solely to process orders, communicate with you about your orders, and improve our services.
          </p>
          <h2>Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
          </p>
        </div>
      </div>
    </div>
  );
}
