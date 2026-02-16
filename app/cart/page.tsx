
"use client";
import { removeFromCart, updateQuantity, clearCart } from "@/redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items || []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  function handleCheckout() {
    // simple success flow — show alert then navigate home
    alert("Payment successful");
    // clear cart then go home
    dispatch(clearCart());
    router.push("/");
  }

  return (
    <>
      <h1 className="cart-title">Your Cart</h1>
      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="cart-row">
                  <td className="cart-product">
                    <img src={item.image} alt={item.title} className="cart-image" />
                    <div className="cart-product-info">
                      <div className="cart-product-title">{item.title}</div>
                      <div className="cart-product-small">ID: {item.id}</div>
                    </div>
                  </td>

                  <td>$ {item.price}</td>

                  <td>
                    <input
                      className="cart-qty"
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                    />
                  </td>

                  <td>$ {(item.price * item.quantity).toFixed(2)}</td>

                  <td>
                    <button className="cart-delete" onClick={() => dispatch(removeFromCart(item.id))}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h2>Total: $ {total.toFixed(2)}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </>
  );
}
