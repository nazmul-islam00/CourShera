import { useState } from "react";
import { CheckoutContext } from "./CheckoutContext";

export const CheckoutProvider = ({ children }) => {
  // courseForCheckout shape: { courseId, title, price, currency }
  const [courseForCheckout, setCourseForCheckout] = useState(null);

  return (
    <CheckoutContext.Provider value={{ courseForCheckout, setCourseForCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};
