import React from "react";
import styles from "./styles.m.styl";
import { OrdersListItem } from "../../types";
import { observer } from "mobx-react-lite";
import moment from "moment";
import "moment/locale/ru";
import Tag from "components/Tag";
import OrderStatus from "components/OrderStatus";
import DeliveryType from "components/DeliveryType";
import { Link } from "react-router-dom";
import OrdersListState from "../../store";
import { deliveryTranslator, statusTranslator } from "../Translator";

const ListItem = observer(
  ({ order }: { order: OrdersListItem }): JSX.Element => {
    return (
      <div className={styles.row}>
        <div className={styles.orderNumber}>
          <Link to={`/orders/${order.id}`}>{order.number}</Link>
        </div>
        <div>
          <p>{moment(order.createdAt).format("DD.MM.YYYY HH:mm")}</p>
        </div>
        <div title={order.delivery?.code}>
          <p>
            {order.delivery && (
              <DeliveryType code={deliveryTranslator[order.delivery?.code]} />
            )}
          </p>
        </div>
        <div>
          <p>{moment().from(order.createdAt, true)}</p>
        </div>
        <div title={order.status}>
          <OrderStatus
            code={order.status}
            text={statusTranslator[order.status]}
          />
        </div>
      </div>
    );
  }
);

export default ListItem;
