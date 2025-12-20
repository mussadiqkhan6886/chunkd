import React from "react";

const Page = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 space-y-14 animate-fadeIn">

        {/* PRIVACY POLICY */}
        <section id="privacy" className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Privacy Policy
          </h1>

          <p className="text-gray-600">
            At <strong>Chunk’d</strong>, we value your privacy and are committed to
            protecting your personal information.
          </p>

          <p className="text-gray-600">
            We collect only the information necessary to process and deliver your
            orders efficiently, including your name, phone number, delivery
            address, and order details.
          </p>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">
              How we use your information:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Process and deliver orders</li>
              <li>Contact you regarding your order</li>
              <li>Improve our services and customer experience</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">
              What we do not do:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>We do not sell or share personal information</li>
              <li>We do not store card or sensitive payment data</li>
            </ul>
          </div>

          <p className="text-gray-600">
            By using our website, you agree to this privacy policy.
          </p>
        </section>

        {/* RETURN & REFUND POLICY */}
        <section id="return" className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Return & Refund Policy
          </h2>

          <p className="text-gray-600">
            Due to the nature of our products, all sales at <strong>Chunk’d</strong> are final.
          </p>

          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>No returns</li>
            <li>No refunds</li>
            <li>No exchanges</li>
          </ul>

          <div>
            <h3 className="font-medium text-gray-800 mb-2">Exceptions:</h3>
            <p className="text-gray-600">
              If you receive an incorrect or damaged item, please contact us
              within <strong>2 hours</strong> of delivery with clear photo or
              video evidence. Valid cases will be reviewed and resolved at our
              discretion.
            </p>
          </div>

          <p className="text-gray-600">
            Placing an order confirms acceptance of this policy.
          </p>
        </section>

        {/* SHIPPING POLICY */}
        <section id="shipping" className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Shipping & Delivery Policy
          </h2>

          <p className="text-gray-600">
            Chunk’d currently delivers within <strong>Lahore</strong>.
          </p>

          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Delivery charges are calculated at checkout</li>
            <li>Delivery timelines are shared at order confirmation</li>
            <li>Orders are delivered fresh and securely sealed</li>
          </ul>

          <p className="text-gray-600">
            Chunk’d is not responsible for delays caused by incorrect address
            details, customer unavailability, or factors beyond our control.
          </p>

          <p className="text-gray-600">
            Orders cannot be modified or cancelled once dispatched.
          </p>
        </section>

        {/* TERMS */}
        <section id="terms" className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Terms & Conditions
          </h2>

          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Prices are listed in PKR and may change without notice</li>
            <li>Product images are for representation only</li>
            <li>Orders cannot be cancelled once placed</li>
            <li>Chunk’d may refuse or cancel orders when necessary</li>
            <li>False claims or misuse may result in restrictions</li>
          </ul>

          <p className="text-gray-600">
            Chunk’d is not responsible for allergic reactions. Customers must
            review ingredient information before ordering.
          </p>
        </section>

      </div>
    </main>
  );
};

export default Page;
