import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="modal">
      <div className="modal-container">
        <img
          alt="loader"
          src={
            "https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"
          }
        />
        <h1 className="text-redirect">
          Redirecting you in <b className="text-counter">{count}</b> seconds
        </h1>
      </div>
    </div>
  );
}

export default LoadingToRedirect;