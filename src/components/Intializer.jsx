// components/Initializer.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Initializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch(addUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  return null; // No UI, just initializes Redux state
};

export default Initializer;
