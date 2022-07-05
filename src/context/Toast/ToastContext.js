import React, { useState, useMemo } from "react";
import { v4 as uuid } from 'uuid';
import Toast from "../../components/Toast/Toast";

const ToastContext = React.createContext();

// Provider
// ==============================

export function ToastProvider(props) {
  const [toasts, setToasts] = useState([]);
  const showToast = (message) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: uuid(), message },
    ]);
  };
  const closeToast = (id) => () => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };
  const contextValue = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}
      {toasts.map(toast => {
        const { id, message } = toast;

        return (
          <Toast key={id} close={closeToast(id)} message={message} />
        )
      })}
    </ToastContext.Provider>
  );
};

// Consumer
// ==============================

export const useToasts = () => React.useContext(ToastContext);
