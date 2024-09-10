import React from "react";
import { useAuthStore } from "../../store/AuthUser";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <div className="flex ">
      HomeScreen
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomeScreen;
