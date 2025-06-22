import React, { useEffect, useState } from "react";
import ItemCard from "../Components/ItemCard";
import axios from "axios";
import ItemModal from "../Components/ItemModal";

const ViewItems = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [itemData, setItemData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    // Fetch items from the API when the component mounts
    axios.get(apiUrl).then((res) => {
      setItemData(res.data);
      // console.log(res.data);
    });
  }, [apiUrl]);

  return (
    <div className="flex flex-col items-start p-4    bg-gradient-to-br from-blue-100 to-slate-500 min-h-screen text-black">
      <h2 className="text-3xl font-bold mb-4">
        Total Items : {itemData.length}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {itemData.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          );
        })}
      </div>
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default ViewItems;
