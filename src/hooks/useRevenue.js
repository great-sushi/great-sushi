import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { showModal } from "../actions/modal";
import { SUCCESS_TEXT, EXIT, RETRY } from "../constants/modal";

function useRevenue() {
  const dispatch = useDispatch();
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabi } = useSelector((state) => state.sushi);
  const [revenue, setRevenue] = useState(0);
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    if (rice.id.length !== 0
        && sashimiOrder.id === sashimi.id
        && wasabiOrder === wasabi.size
      ) {
      setRevenue((prev) => prev + sashimi.price);
      return;
    }

    if (sashimi.id.length && sashimiOrder.id !== sashimi.id) {
      setRevenue((prev) => prev - 1000);
      return;
    }

    if (wasabiOrder < wasabi.size) {
      setRevenue((prev) => prev - sashimi.price / 2);
    }

    if (rice.id.length && wasabiOrder > wasabi.size) {
      setRevenue((prev) => prev - sashimi.price / 2);
    }
  }, [sashimi]);

  useEffect(() => {
    if (revenue >= 10000) {
      dispatch(showModal({
        isVisible: true,
        contentText: SUCCESS_TEXT,
        firstPath: "/",
        secondPath: "/fishing",
        firstLinkButtonText: EXIT,
        secondLinkButtonText: RETRY,
      }));
    }

    if (modal.isVisible) {
      setRevenue(0);
    }
  }, [revenue, modal.isVisible]);

  return revenue;
}

export default useRevenue;
