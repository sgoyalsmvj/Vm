import React from "react";
import { motion } from "framer-motion";
import { Route, Navigate } from "react-router-dom";
import * as authService from "../auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const config = {
    type: "spring",
    damping: 20,
    stiffness: 100,
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        authService.token.get() ? (
          <motion.div
            transition={config}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <Component {...props} />
          </motion.div>
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
