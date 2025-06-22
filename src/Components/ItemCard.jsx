/* eslint-disable no-unused-vars */
import { MdDescription } from "react-icons/md";
import { FaShirt } from "react-icons/fa6";

const ItemCard = ({ item, setSelectedItem }) => {
  const handleSelection = () => {
    setSelectedItem(item);
  };
  return (
    // <Link to={`/propInfo/${name}`}>
    <div
      id="card"
      className=" bg-slate-800 rounded-lg overflow-hidden shadow-lg w-60 min-h-full"
      onClick={() => handleSelection()}
    >
      <img
        src={item.coverImage}
        alt={item.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4 flex flex-col justify-around">
        <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
        <p className="text-gray-400">
          <FaShirt className="inline mr-2" />
          {item.type}
        </p>
      </div>
    </div>
    // </Link>
  );
};

export default ItemCard;
