import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Success.module.css";

export function Success() {
  const navigate = useNavigate();

  return (
    <div className={styles["success"]}>
      <img src="/pizza.png" alt="Pizza image"></img>
      <div className={styles["text"]}>Your order in progress!</div>
      <Button appearence="big" onClick={() => navigate("/")}>
        Make new order
      </Button>
    </div>
  );
}
