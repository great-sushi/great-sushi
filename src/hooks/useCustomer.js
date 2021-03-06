import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getRandomInt } from "../utils";
import Customer from "../components/Cooking/Restaurant/Customer";
import customerImage from "../assets/image/customer.png";

const ROWS = [0, 1];
const COLUMNS = [0, 3, 6, 9];

function useCustomer() {
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabi } = useSelector((state) => state.sushi);

  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);

  const customer = new Customer(customerImage, column, row);
  const draw = (ctx, height, width) => customer.draw(ctx, width, height);

  useEffect(() => {
    if (rice.id.length === 0) {
      setRow(() => ROWS[getRandomInt(0, 1)]);
      setColumn(() => COLUMNS[getRandomInt(0, 3)]);
      return;
    }

    if (sashimiOrder.id === sashimi.id && wasabiOrder === wasabi.size) {
      setColumn((column) => column);
      return;
    }

    if (sashimi.id.length && sashimiOrder.id !== sashimi.id) {
      setColumn(prev => prev + 2);
      return;
    }

    if (wasabiOrder < wasabi.size) {
      setColumn(prev => prev + 2);
    }

    if (rice.id.length && wasabiOrder > wasabi.size) {
      setColumn(prev => prev + 2);
    }
  }, [sashimi]);

  return { row, column, draw }
}

export default useCustomer;
