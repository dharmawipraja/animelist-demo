import React, { useState, useMemo, createContext, useContext, ReactNode } from "react"; // Ensure useContext and ReactNode are imported
import { v4 as uuid } from 'uuid';
import ToastComponent from "../../components/Toast/Toast"; // Renamed import to avoid conflict with local Toast interface

interface Toast {
  id: string;
  message: string;
}

interface ToastContextValue { // Renaming from ToastContextType for clarity
  showToast: (message: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider(props: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // setToasts from useState is stable and doesn't need to be in useCallback/useMemo deps
  const stableShowToast = React.useCallback((message: string): void => {
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: uuid(), message },
    ]);
  }, []); // Empty dependency array because setToasts is stable

  const closeToast = (id: string) => (): void => { // Higher order function, inner returns void
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  const memoizedContextValue: ToastContextValue = useMemo(() => ({
    showToast: stableShowToast,
  }), [stableShowToast]);


  return (
    <ToastContext.Provider value={memoizedContextValue}>
      {props.children}
      {toasts.map(toast => { // toast is of type Toast here
        const { id, message } = toast;
        return (
          <ToastComponent key={id} close={closeToast(id)} message={message} />
        )
      })}
    </ToastContext.Provider>
  );
}

// Consumer
// ==============================

export const useToasts = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToasts must be used within a ToastProvider');
  }
  return context;
};
