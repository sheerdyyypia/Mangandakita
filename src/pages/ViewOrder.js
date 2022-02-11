import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../shared/configs/firebase";
import { useAuthContext } from "../shared/context/AuthContext";

function ViewOrder() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ask = query(collection(firestore, "Orders"));
    const unsub = onSnapshot(ask, (querySnapshot) => {
      setOrders(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
      setVisible(true);
    });
    return () => unsub;
  }, []);

  const updateOrder = async (id, status) => {
    let userOrder = doc(firestore, "Orders", id);

    await updateDoc(userOrder, { status }).then(() => {
      alert("Order Updated Successfully!");
    });
  };

  function getOrders() {
    if (user?.role === "admin") {
      return orders;
    } else {
      return orders.filter((order) => order.customer === user?.id);
    }
  }
  return (
    <div className="flex flex-col items-center py-10">
      {visible
        ? getOrders().map((item, i) => {
            return (
              <div className="w-96" key={item.id}>
                <p>
                  <strong>Customer Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Order Type:</strong> {item.ordercategory}
                </p>
                <p>
                  <strong>Address:</strong> {item.address}
                </p>
                <p>
                  <strong>Food Items:</strong> {item.fooditem}
                </p>
                {item.foodItems.map((food) => (
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <p className="flex-1">{food.name}</p>
                      <input
                        className="border rounded-sm px-2 py-1 my-1 w-20"
                        value={food.quantity}
                        size={2}
                        min={1}
                        type="number"
                        disabled
                        required
                        placeholder="Quantity"
                        // onChange={(e) => handleQuantityChange(e, food.id)}
                      />
                      <p className="font-semibold">
                        Php {(food.quantity * food.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Total:</strong> {item.total}
                </p>
                <p>
                  <strong>Status: </strong>{" "}
                  {item.status ? item.status : "Pending"}
                </p>

                {user.role === "admin" && (
                  <div>
                    <button
                      className="bg-blue-800 text-white px-4 py-1 rounded-sm"
                      onClick={() => {
                        updateOrder(item.id, "Done");
                      }}
                    >
                      Done
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="bg-gray-500 text-white px-4 py-1 rounded-sm"
                      onClick={() => {
                        updateOrder(item.id, "Being Delivered");
                      }}
                    >
                      Being Delivered
                    </button>
                    <br />
                    <hr />
                  </div>
                )}
                <p>
                  _________________________________________________________________
                </p>
              </div>
            );
          })
        : "Loading"}
    </div>
  );
}

export default ViewOrder;
