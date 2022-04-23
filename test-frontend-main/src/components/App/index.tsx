import React, { useEffect } from "react";
import styles from "./styles.m.styl";
import Navbar from "../Navbar";
import OrdersList from "../../screens/Orders/List";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStateProvider, GlobalState } from "~/screens/globalState";
import OrdersShow from "~/screens/Orders/Show";
import { useQuery } from "@apollo/client";
import DevTools from "mobx-react-devtools";
import {
  DELIVERY_TYPES_QUERY,
  ORDER_STATUSES_QUERY,
  PRODUCT_STATUSES_QUERY,
} from "~/screens/queries";

function Index(): JSX.Element {
  const [globalState] = React.useState(new GlobalState());
  if (window.location.pathname === "/") window.location.pathname = "/orders/";

  const productStatuses = useQuery(PRODUCT_STATUSES_QUERY);
  const orderStatuses = useQuery(ORDER_STATUSES_QUERY);
  const deliveryTypes = useQuery(DELIVERY_TYPES_QUERY);

  useEffect(() => {
    globalState.setOrderStatuses(
      orderStatuses.data && orderStatuses.data.orderStatuses
    );
    globalState.setProductStatuses(
      productStatuses.data && productStatuses.data.productStatuses
    );
    globalState.setDeliveryTypes(
      deliveryTypes.data && deliveryTypes.data.deliveryTypes
    );
  }, [productStatuses, orderStatuses, deliveryTypes]);

  return (
    <GlobalStateProvider value={globalState}>
      <DevTools />
      <Router>
        <div className={styles.app}>
          <Navbar />
          <div className={styles.content}>
            <Switch>
              <Route path="/orders/:id">
                <OrdersShow />
              </Route>
              <Route path="/orders/">
                <OrdersList />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default Index;
