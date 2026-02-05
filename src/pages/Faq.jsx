import React, { useState } from "react";
import Footer from "../pages/Footer";

const FAQ_ITEMS = [
  {
    q: "Do I have to create an account or register before shopping?",
    a: "No you don't, simply fill your delivery details at checkout.",
  },
  { q: "Are your outfits readily available for dispatch?", a: "Most items are stocked and ready to ship. If an item is out of stock it will be indicated on the product page." },
  { q: "How long does delivery take?", a: "Delivery times vary by location — typically 2-7 business days domestically. International shipments take longer depending on destination." },
  { q: "I placed an order but I didn't get any mail from you?", a: "Check your spam folder first. If you still don't see order confirmation, email followgodng01@gmail.com with your order details." },
  { q: "Do you take custom orders?", a: "Yes — for custom orders please contact us with the design details and we'll advise on pricing and lead time." },
  { q: "What are your terms for exchange?", a: "Items must be unworn, with tags attached and returned within 14 days. Contact support to start an exchange." },
  { q: "Do you accept card payment on this site?", a: "No we current accept order(s) via Whatsapp for now." },
  { q: "How do I know the size to order?", a: "Please consult the size guide on each product page. If unsure, reach out to support and we'll help pick the right size." },
  { q: "Is shopping on this site safe?", a: "Yes — we use industry-standard security for checkout and never store your full payment details on our servers." },
  { q: "How can I get discounts?", a: "Subscribe to our mailing list or follow us on social media for exclusive offers and early drops." },
  { q: "Do you have a walk-in store?", a: "Currently we operate online only — any pop-up or physical locations will be announced on our channels." },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }

  return (
    <>
      <section className="min-h-screen  py-16 md:py-24"     style={{
        backgroundColor: 'hsl(44, 45%, 94%)',
      }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-500">Help Center</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Answers to common questions about ordering, shipping, exchanges and more.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const contentId = `faq-item-${i}`;
              return (
                <div key={i} className="mb-2 ">
                  <button
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggle(i)}
                    className={`w-full flex items-start justify-between gap-4   shadow-sm border border-gray-200 px-5 py-4 rounded-lg transition-shadow duration-150 ${isOpen ? 'shadow-md ring-1 ring-indigo-50' : 'hover:shadow-sm'}`}
                  >
                    <div className="text-left">
                      <span className="block text-base md:text-lg font-semibold text-gray-800">{item.q}</span>
                      <span className="block mt-1 text-sm text-gray-500">{isOpen ? 'Open' : 'Click to view answer'}</span>
                    </div>

                    <div className={`flex-shrink-0 transform  transition-transform duration-900 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <div id={contentId} className={`overflow-hidden transition-[max-height] duration-900 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="p-5 bg-black/10 border border-t-0 border-gray-100 text-sm text-gray-600 rounded-b-lg">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Faq;
