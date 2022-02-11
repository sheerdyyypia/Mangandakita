import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../shared/configs/firebase";
import { useAuthContext } from "../shared/context/AuthContext";

const menu = [
  { id: "1", name: "Bicol Express", price: 120, quantity: 1 },
  { id: "2", name: "Chicken Curry", price: 115, quantity: 1 },
  { id: "3", name: "Pork Adobo", price: 100, quantity: 1 },
  { id: "4", name: "Sisig Sizzling", price: 130, quantity: 1 },
  { id: "5", name: "Pork Sinigang", price: 90, quantity: 1}
];

function Order() {
  const { user } = useAuthContext();
  const [date, setDate] = useState(new Date());
  const [ordercategory, setOrderCategory] = useState("Pickup");
  const [address, setAddress] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemsId, setFoodItemsId] = useState([]);

  const handleMenuChange = (e, food) => {
    if (e.target.checked) {
      setFoodItems([...foodItems, { ...food, quantity: 1 }]);
      setFoodItemsId([...foodItemsId, food.id]);
    } else {
      let newFoods = foodItems.filter((item) => item.id !== food.id);
      let newFoodsId = foodItemsId.filter((item) => item !== food.id);
      setFoodItems(newFoods);
      setFoodItemsId(newFoodsId);
    }
  };

  const handleQuantityChange = (e, id) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: parseInt(e.target.value) };
        } else {
          return item;
        }
      })
    );
  };

  //Create Order
  const addOrder = async (e) => {
    e.preventDefault();
    let data = {
      date,
      customer: user.id,
      name: user.firstname + " " + user.lastname,
      ordercategory,
      address,
      foodItems,
      total: getTotal(),
    };
    await addDoc(collection(firestore, "Orders"), data).then(() => {
      alert("New Order Added Successfully!");
    });
  };
  function getTotal() {
    return foodItems.reduce((sum, item) => item.price * item.quantity + sum, 0);
  }

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-center font-semibold text-3xl mb-4 mt-4">
        ORDER FORM
      </h1>
      <form className="w-96" onSubmit={addOrder}>
        <p>
          <b>Date:</b> &nbsp;
          <input
            className="border rounded-sm px-2 py-1 my-1 w-full"
            size={55}
            value={date}
            type="text"
            placeholder="Date"
            onChange={(e) => setDate(e.target.value)}
          />
        </p>
        <p>
          <b>Customer Name:</b> &nbsp;
          <input
            className="border rounded-sm px-2 py-1 my-1 w-full"
            size={42.7}
            value={user?.firstname + " " + user?.lastname}
            type="text"
            placeholder="Customer Name"
          />
        </p>
        <p className="mt-4 mb-2">
          <b>Order Type </b>(Please choose one of the options):
        </p>

        <div>
          <div className="flex items-center">
            <input
              checked={ordercategory === "Delivery"}
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setOrderCategory("Delivery");
                }
              }}
            />
            &nbsp;
            <b>Delivery</b>
          </div>
          <input
            className="border rounded-sm px-2 py-1 my-1 w-full"
            value={address}
            size={62}
            type="text"
            placeholder="Customer Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            checked={ordercategory === "Pickup"}
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setOrderCategory("Pickup");
              }
            }}
          />
          &nbsp;
          <b>Pick-up</b>
          <br />
          <br />
          <b>ORDER DETAILS</b>
          <br />
          <br />
          <p>
            {menu.map((food) => (
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={(e) => handleMenuChange(e, food)}
                      checked={foodItemsId.includes(food.id)}
                    />
                    <p>{food.name}</p>
                  </div>
                  <p className="font-semibold">Php {food.price.toFixed(2)}</p>
                </div>
              </div>
            ))}

            {foodItems.map((food) => (
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <p className="flex-1">{food.name}</p>
                  <input
                    className="border rounded-sm px-2 py-1 my-1 w-20"
                    value={food.quantity}
                    size={2}
                    min={1}
                    type="number"
                    required
                    placeholder="Quantity"
                    onChange={(e) => handleQuantityChange(e, food.id)}
                  />
                  <p className="font-semibold">
                    Php {(food.quantity * food.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </p>
          <br />
          <b>TOTAL AMOUNT:</b>
          &nbsp;
          <input
            className="border rounded-sm px-2 py-1 my-1 w-full"
            value={getTotal()}
            type="text"
            name=""
            id=""
          />
          <br />
          <br />
          <button type="submit" className="bg-blue-800 text-white py-1 w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Order;