import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";


export default function LoginLayout({ children }) {
  return (
    <>
      <AuthProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </>
  );
}
