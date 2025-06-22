import React from "react";
import emailjs from "emailjs-com";
import { IoCloseCircleOutline } from "react-icons/io5";

const ItemModal = ({ item, onClose }) => {
  const sendEmail = (item) => {
    const serviceID = "service_vgjuccj";
    const templateID = "template_otmhs8f";
    const publicKey = "2L4BdRPXcSElvM5bZ";
    const email = "yawebir947@hosliy.com";

    const templateParams = {
      title: item.name,
      message: `I want to enquire about \n Item Name:${item.name},\n Item Type:${item.type}`,
      to_email: email,
      name: email.split("@")[0],
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (response) => {
        console.log("Email sent:", response.status, response.text);
        alert("Enquiry sent successfully!");
      },
      (error) => {
        console.error("Email send error:", error);
        alert("Failed to send enquiry.");
      }
    );
  };

  if (!item) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#000000d8]" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0  flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-xl relative">
          {/* Close Button */}
          <div className="flex justify-between p-3 bg-slate-800 rounded-t-xl">
            <p className="text-4xl font-black text-white">Item Details</p>
            <button
              onClick={onClose}
              className=" !text-4xl !p-0 !bg-transparent text-gray-300 hover:text-white"
            >
              <IoCloseCircleOutline />
            </button>
          </div>

          <div className="p-4">
            {/* Carousel / Scrollable Images */}
            <div className="flex space-x-2 overflow-x-auto mb-4">
              {/* {item.images.map((img, i) => ( */}
              <img
                // key={i}
                src={item.coverImage}
                alt={`item-img`}
                className="h-40 rounded border"
              />
              {/* ))} */}
            </div>
            <h2 className="text-2xl font-bold mb-2">Item Name:{item.name}</h2>
            <p className="mb-2 text-gray-800">
              <strong>Item Type:</strong> {item.type}
            </p>
            <p className="mb-2 text-gray-800">
              <strong>Item Description:</strong> {item.description}
            </p>
            <button
              onClick={() => sendEmail(item)}
              className=" text-white !px-4 !py-2 rounded-lg hover:text-sky-300"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemModal;
