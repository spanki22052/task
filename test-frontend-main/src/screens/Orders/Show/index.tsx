import React, { useEffect, useState } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import styles from "./styles.m.styl";
import { ORDER_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { SingleOrder } from "./types";
import Item from "./components/Item";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());
    const [currentOrder, setOrder] = useState<SingleOrder>();

    const orderId = useLocation().pathname.split("/")[2];

    const { data } = useQuery(ORDER_QUERY, { variables: { number: orderId } });

    useEffect(() => {
      setOrder(data && data.order);
    }, [data]);

    return (
      <div className={styles.screenWrapper}>
        {currentOrder ? (
          <div className={styles.screen}>
            <h1>Заказ № {currentOrder.id}</h1>
            <div className={styles.items}>
              {currentOrder &&
                currentOrder.items.map((el) => {
                  return <Item item={el} />;
                })}
            </div>
          </div>
        ) : (
          <img
            style={{ margin: "auto", display: "block", width: "150px" }}
            src="/loading.gif"
            alt="loading"
          />
        )}
      </div>
    );
  }
);

export default OrdersShow;
