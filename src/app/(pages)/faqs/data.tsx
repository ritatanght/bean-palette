export const orderFaqList = [
  {
    question: "How to place an order?",
    answer: (
      <>
        <p>To purchase our products, please follow the steps below: </p>
        <ol>
          <li>
            Select the product, size, and grind on the product page and click
            &quot;Add to Cart&quot;.
          </li>
          <li>
            Check all the items you have chosen in your cart. click
            &quot;Proceed to Checkout&quot;.
          </li>
          <li>
            Choose your shipping method, fill in your contact information, and
            confirm the product details and the total amount.
          </li>
          <li>Select a payment method and complete the order.</li>
        </ol>
      </>
    ),
  },
  {
    question: "What payment methods do you accept?",
    answer: (
      <p>
        We accept various payment methods, including major credit cards (Visa,
        Mastercard, American Express, UnionPay) and Alipay. Please note that the
        availability of payment options may vary depending on your location.
      </p>
    ),
  },
  {
    question:
      "How can I test the functionality of this website without inputting my card number?",
    answer: (
      <p>
        It is not recommanded to input an actual card number for testing
        purposes. Instead, you can use the card numbers provided in
        Stripe&apos;s documentation for simulating payments. One such example is
        4242 4242 4242 4242. For more information, please refer to{" "}
        <a
          className="a-link"
          href="https://stripe.com/docs/testing"
          target="_blank"
        >
          Stripe&apos;s documentation
        </a>
        .
      </p>
    ),
  },
];
export const shippingFaqItem = {
  question: "How long does it take to receive the products?",
  answer: (
    <p>
      As this is not a real e-commerce website, the products will not be
      delivered, and you will not receive any physical items. The website is
      solely for demonstration purposes.
    </p>
  ),
};
