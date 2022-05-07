import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import CartContainer from "../components/CartContainer";
import { useSelector } from "react-redux";
// import { useGetCartItemsQuery } from "../services/cartApi";
import { cartApi } from "../services/cartApi";

function App() {
  const { isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  /**
   * https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequerysubscription
   * A React hook that automatically triggers fetches of data from an endpoint,
   * and 'subscribes' the component to the cached data.
   */
  cartApi.endpoints.getCartItems.useQuerySubscription();

  /**
   * https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequery
   * A React hook that automatically triggers fetches of data from an endpoint,
   * 'subscribes' the component to the cached data, and reads the request status
   * and cached data from the Redux store.
   * The component will re-render as the loading status changes and the data
   * becomes available.
   */
  // const {data, isLoading, isError} = useGetCartItemsQuery();

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
