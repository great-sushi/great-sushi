import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  right: 130px;
  top: 160px;
  width: 200px;
  height: 100px;
  background-color: white;
  border: 5px solid black;

  h1 {
    font-family: RixYeoljeongdo_Regular;
  }

  p {
    font-size: 40px;
    font-family: RixYeoljeongdo_Regular;
  }
`;

function Revenue() {
  const dispatch = useDispatch();
  const { sashimiOrder, wasabiOrder } = useSelector((state) => state.order);
  const { rice, sashimi, wasabi } = useSelector((state) => state.sushi);
  const { money } = useSelector((state) => state.revenue);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (rice.id.length !== 0 && sashimiOrder.id === sashimi.id && wasabiOrder === wasabi.size) {
      setRevenue((prev) => prev + 1000);
      return;
    }

    if (sashimi.id.length && sashimiOrder.id !== sashimi.id) {
      setRevenue((prev) => prev - 1000);
      return;
    }
    if (wasabiOrder < wasabi.size) {
      setRevenue((prev) => prev - 500);
    }
    if (rice.id.length && wasabiOrder > wasabi.size) {
      setRevenue((prev) => prev - 500);
    }
  }, [sashimi]);

  return (
    <Wrapper>
      <h1>수익금</h1>
      <p>{revenue}</p>
    </Wrapper>
  );
}

export default React.memo(Revenue);
