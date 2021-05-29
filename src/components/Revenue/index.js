import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { showModal } from "../../actions/modal";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 8px;
  width: 200px;
  height: 100px;
  background-color: white;
  border: 5px solid black;

  *, *::after, *::before {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    cursor: default;
  }

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
  const [revenue, setRevenue] = useState(0);
  const modal = useSelector((state) => state.modal);

  useEffect(() => {
    if (rice.id.length !== 0 && sashimiOrder.id === sashimi.id && wasabiOrder === wasabi.size) {
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
        contentText: "성공하셨습니다!",
        firstPath: "/",
        secondPath: "/fishing",
        firstLinkButtonText: "나가기",
        secondLinkButtonText: "다시하기",
      }));
    }

    if (modal.isVisible) {
      setRevenue(0);
    }
  }, [revenue, modal.isVisible]);

  return (
    <Wrapper>
      <h1>수익금</h1>
      <p>{revenue}</p>
    </Wrapper>
  );
}

export default React.memo(Revenue);
