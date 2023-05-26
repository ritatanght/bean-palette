import "./faqs.css";
import FAQItem from "../../components/FAQItem";
import { MdOutlineShoppingBag, MdOutlineLocalShipping } from "react-icons/md";
import { orderFaqList, shippingFaqItem } from "./data";

const FAQs = () => {
  return (
    <main className="container page-container">
      <h2 className="">FAQs</h2>
      <section key="order_q">
        <h3>
          Orders and Payments
          <MdOutlineShoppingBag
            aria-hidden="true"
            focusable="false"
            className="icon-deco"
          />
        </h3>
        {orderFaqList.map((item, i) => (
          <FAQItem key={`order_q${i + 1}`} item={item} id={`order_a${i + 1}`} />
        ))}
      </section>
      <section key="shipping_q">
        <h3>
          Shipping and Delivery
          <MdOutlineLocalShipping
            aria-hidden="true"
            focusable="false"
            className="icon-deco"
          />
        </h3>
        <FAQItem key="shipping_q1" item={shippingFaqItem} id="shipping_a1" />
      </section>
    </main>
  );
};

export default FAQs;
