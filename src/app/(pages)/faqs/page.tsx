import "./faqs.css";
import FAQItem from "../../components/FAQItem";
import { MdOutlineShoppingBag, MdOutlineLocalShipping } from "react-icons/md";
import { orderFaqList, shippingFaqItem } from "./data";

const FAQs = () => {
  return (
    <main className="container page-container">
      <h2 className="">FAQs</h2>
      <section>
        <h3>
          Orders and Payments
          <MdOutlineShoppingBag
            aria-hidden="true"
            focusable="false"
            className="icon-deco"
          />
        </h3>
        {orderFaqList.map((item, i) => (
          <>
            <FAQItem key={`order_q${i}`} item={item} />
          </>
        ))}
      </section>
      <section>
        <h3>
          Shipping and Delivery
          <MdOutlineLocalShipping
            aria-hidden="true"
            focusable="false"
            className="icon-deco"
          />
        </h3>
        <FAQItem key="shipping_q1" item={shippingFaqItem} />
      </section>
    </main>
  );
};

export default FAQs;
