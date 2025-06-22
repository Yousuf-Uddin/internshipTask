// import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./Components/Navbar";
function App() {
  const pageSwitch = (page) => {
    window.location.href = `/${page}Items`;
  };
  return (
    <>
      <Outlet />
      <div className="w-full min-h-[90vh] bg-gradient-to-br from-blue-300 to-slate-500 flex flex-col justify-center items-center">
        <h1 className="my-2">Welcome to the Inventory Management App</h1>
        <p>Select an option below to manage your items.</p>
        <div>
          <button className="m-4" onClick={() => pageSwitch("view")}>
            View Items
          </button>
          <button
            onClick={() => {
              pageSwitch("add");
            }}
          >
            Add Items
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
