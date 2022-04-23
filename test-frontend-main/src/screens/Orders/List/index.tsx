import React, { useEffect, useState } from "react";
import styles from "./styles.m.styl";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import OrdersListState from "./store";
import { OrdersListItem } from "./types";

import Button from "../../../components/Button";
import AngleLeftIcon from "../../../assets/icons/angle-left-solid.svg";
import AngleRightIcon from "~/assets/icons/angle-right-solid.svg";
import ListItem from "./components/ListItem";
import { useQuery } from "@apollo/client";
import { deliveryTranslator, statusTranslator } from "./components/Translator";
import { ORDER_QUERY } from "../Show/queries";
import { GET_ORDERS_QUERY } from "./queries";
import { useLocation } from "react-router";

const OrdersList = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersListState());

    const { data } = useQuery(GET_ORDERS_QUERY, {
      variables: {
        page: state.page,
      },
    });

    useEffect(() => {
      state.setOrders(data ? data.getOrders.orders : []);
      state.setTotalPages(data ? data.getOrders.pagination.totalPageCount : 1);
    }, [state.page, data]);

    useEffect(() => {
      if (state.initialized) return;
      state.initialize();
    }, []);

    return (
      <React.Fragment>
        <div className={styles.screenWrapper}>
          <div className={styles.screen}>
            {state.orders.length === 0 && <h1>Загрузка</h1>}
            {state.orders && (
              <div className={styles.table}>
                <div className={styles.head}>
                  <div className={styles.row}>
                    <div className={styles.rowElement}>
                      <h1>Номер</h1>
                    </div>
                    <div className={styles.rowElement}>
                      <h1>Создан</h1>
                    </div>
                    <div className={styles.rowElement}>
                      <h1 onClick={() => state.stopLoading()}>Доставка</h1>
                    </div>
                    <div className={styles.rowElement}>
                      <h1>В работе</h1>
                    </div>
                    <div className={styles.rowElement}>
                      <h1>Статус</h1>
                    </div>
                  </div>
                </div>
                <div className={styles.body}>
                  {map(state.orders, (order: OrdersListItem, index: number) => (
                    <ListItem order={order} key={index} />
                  ))}
                </div>
              </div>
            )}
            <div className={styles.pagination}>
              <Button
                small
                text="PREV"
                icon={AngleLeftIcon}
                resting
                disabled={!state.canPrev}
                onClick={() => state.prevPage()}
              />
              <Button
                small
                text="NEXT"
                rightIcon={AngleRightIcon}
                resting
                disabled={!state.canNext}
                onClick={() => state.nextPage()}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default OrdersList;
