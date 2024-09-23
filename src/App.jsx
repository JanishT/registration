import React, { useEffect, useState } from "react";
import delicon from "./assets/delete.png";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const usersCollection = collection(db, "users");

  const createUser = async () => {
    const docRef = await addDoc(usersCollection, {
      name: newName,
      age: Number(newAge),
    });
    setUsers([...users, { id: docRef.id, name: newName, age: Number(newAge) }]);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    setUsers(
      users.map((user) => (user.id === id ? { ...user, age: age + 1 } : user))
    );
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div className="w-full flex gap-2 bg-custom-card-background h-auto">
      <div className="w-1/2 flex flex-col gap-6 justify-center items-center h-screen overflow-y-hidden">
        {" "}

        <h1 className="uppercase font-semibold text-3xl absolute top-16">Welcome back...</h1>
        <div className="flex flex-col w-[350px] justify-center items-center gap-4 shadow-2xl bg-[#f1dede] p-4 rounded-2xl py-12">
          {" "}
       
          <input
            type="text"
            placeholder="Name..."
            onChange={(e) => setNewName(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Age..."
            onChange={(e) => setNewAge(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
          <button
            onClick={createUser}
            className="border w-1/2 py-1  bg-blue-800 text-white text-lg rounded-2xl"
          >
            Create
          </button>
        </div>{" "}
      </div>
      <div className="bg-black border border-black my-12"></div>
      <div className="w-1/2 p-12 grid grid-cols-3 gap-6 h-full">
        {users.map((user) => {
          return (
            <div className=" rounded-lg shadow-xl w-full h-[150px] relative font-semibold flex flex-col justify-center bg-custom-gradient p-4">
              <div className="flex justify-start items-center gap-2">
                <p className="text-lg font-bold">Name : </p>{" "}
                <p className="text-lg">{user.name}</p>
              </div>
              <div className="flex justify-start items-center gap-2">
                <p className="text-lg font-bold">Age :</p>
                <p className="text-lg">{user.age}</p>
              </div>
              <div className="">
                <button
                  className="p-1 px-3 rounded-full bg-green-400 text-sm absolute font-semibold bottom-2 right-3 hover:bg-green-800 hover:text-white"
                  onClick={() => {
                    updateUser(user.id, user.age);
                  }}
                >
                  Increase Age
                </button>
                <button
                  className="absolute top-2 right-2"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  <img src={delicon} alt="" className="w-[17px] h-[17px]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
