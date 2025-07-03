import React, { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useAuthentication } from "./context/AuthenticationProvider";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { approve } = useAuthentication();
  useEffect(() => {
    if (!approve) {
      navigate("/login", { replace: true });
    }
  }, [approve, navigate]);

  return approve ? children : null;
}

export default ProtectedRoute;
