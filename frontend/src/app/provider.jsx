"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import Authprovider from "@/contexts/usercontext";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <Authprovider>{children}</Authprovider>
    </Provider>
  );
}
