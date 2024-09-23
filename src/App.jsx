import React, { useEffect, useState } from "react";
import delicon from "./assets/delete.png"
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
    const docRef = await addDoc(usersCollection, { name: newName, age: Number(newAge) });
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
    setUsers(users.map((user) => (user.id === id ? { ...user, age: age + 1 } : user)));
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    
    getUsers();
  }, []);
  return (
    <div className="w-full flex gap-2">
      <div className="w-1/2 flex flex-col h-screen gap-6 justify-center items-center">
        {" "}
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => setNewName(e.target.value)}
          className="border border-black w-[300px] h-[34px] p-3 rounded-md"
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) => setNewAge(e.target.value)}
           className="border border-black w-[300px] h-[34px] p-3 rounded-md"
        />
        <button onClick={createUser} className="border w-[100px] py-1 bg-blue-500 text-white text-xl rounded-lg">Create</button>
      </div>
      <div className="w-1/2 bg-blue-300 p-8 grid grid-cols-3">
        {users.map((user) => {
          return (
            <div className=" rounded-lg shadow-xl w-[200px] h-[160px] p-6 relative font-semibold flex flex-col gap-4 justify-center items-center">
              
             <div className="flex"><p className="text-lg absolute left-3 top-8">Name : </p> <p className="absolute left-20 top-9">{user.name}</p></div> 
              <div className="flex"><p className="text-lg absolute left-3 top-16">Age :</p><p className="absolute left-20 top-16">{user.age}</p></div>
             <div className="">
               <button 
             className="border px-3 rounded-lg bg-green-400 text-sm absolute bottom-6 right-5 hover:bg-green-800 hover:text-white"
                onClick={() => {
                  updateUser(user.id, user.age);
                }}
              >
                Increase Age
              </button>
              <button
              className="absolute top-1 right-1"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                <img src={delicon} alt="" className="w-[17px] h-[17px]" />
              </button></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
