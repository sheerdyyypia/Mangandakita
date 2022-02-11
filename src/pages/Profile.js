import React, { useEffect, useState } from "react";
import { firestore } from "../shared/configs/firebase";
import {
  query,
  collection,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { useAuthContext } from "../shared/context/AuthContext";
import { async } from "@firebase/util";

function Profile() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contactnum, setContactnum] = useState("");

  useEffect(() => {
    const ask = query(collection(firestore, "Users"));
    const unsub = onSnapshot(ask, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
      setVisible(true);
    });
    return () => unsub;
  }, []);

  // Update User Profile
  const updateUser = async (e) => {
    e.preventDefault();
    let userDoc = doc(firestore, "Users", user.id);
    let newFields = { firstname, lastname, contactnum };

    await updateDoc(userDoc, newFields).then(() => {
      alert("User Updated Successfully!");
    });
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      {visible
        ? users
            .filter((item) => item.id === user?.id)
            .map((item, i) => {
              return (
                <form key={item.id} onSubmit={updateUser} className="w-96">
                  <p>
                    {item.firstname} &nbsp;
                    {item.lastname}
                    <br />
                    {item.email}
                    <br />
                    {item.contactnum}
                    <br />
                  </p>

                  <input
                    className="border rounded-sm px-2 py-1 my-1 w-full"
                    value={firstname}
                    type="text"
                    required
                    placeholder="First Name"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <br />
                  <input
                    className="border rounded-sm px-2 py-1 my-1 w-full"
                    value={lastname}
                    type="text"
                    required
                    placeholder="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <br />
                  <input
                    className="border rounded-sm px-2 py-1 my-1 w-full"
                    value={contactnum}
                    type="text"
                    required
                    placeholder="Contact Number"
                    onChange={(e) => setContactnum(e.target.value)}
                  />
                  <br />
                  <button
                    type="submit"
                    className="bg-blue-800 text-white py-1 rounded-sm w-full"
                  >
                    Update
                  </button>
                </form>
              );
            })
        : "Loading"}
    </div>
  );
}

export default Profile;
