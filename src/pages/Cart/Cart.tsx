import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from "./Cart.module.css";
import { jsxDEV } from "react/jsx-dev-runtime";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>();

  const items = useSelector((s: RootState) => s.cart.items);

  const jwt = useSelector((s: RootState) => s.user.jwt);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const total = items
    .map((i) => {
      const product = cartProducts?.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    dispatch(cartActions.clean());
    navigate("/success");
  };

  return (
    <>
      <Heading className={styles["heading"]}>Cart</Heading>
      {items.map((i) => {
        const product = cartProducts?.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}
      <div className={styles["line"]}>
        <div className={styles["text"]}>Summary</div>
        <div className={styles["price"]}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>Delivery</div>
        <div className={styles["price"]}>
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>
          Summary{" "}
          <span className={styles["total-count"]}>({items.length})</span>
        </div>
        <div className={styles["price"]}>
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <div className={styles["checkout"]}>
        <Button appearence="big" onClick={checkout}>
          Check out
        </Button>
      </div>
    </>
  );
}
