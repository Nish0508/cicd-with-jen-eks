
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

import { AppStateProvider } from "./providers/AppStateProvider";
import { AuthContextProvider } from "./providers/AuthProvider";
import AppRouter from "./routing";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";


const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID!;
const MICROSOFT_CLIENT_ID = import.meta.env.VITE_APP_MICROSOFT_CLIENT_ID!;



const App = () => {


  return (
    // <LiveChatLoaderProvider providerKey="burus57zt5c6" provider="drift" idlePeriod={1000}>
    <>
    <BrowserRouter>
      <ToastContainer
        closeOnClick={true}
        autoClose={3000}
        hideProgressBar={true}
        draggable={false}
        limit={3}
        transition={Slide}
        pauseOnHover={true}
      />
      <AppStateProvider>
        <AuthContextProvider>
            <AppRouter />
        </AuthContextProvider>
      </AppStateProvider>
    </BrowserRouter>
    </>
  );
};

export default App;
