import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import CartContainer from "../components/CartContainer";
import { useSelector } from "react-redux";

function App() {
  const { isOpen } = useSelector((state) => state.modal);

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
