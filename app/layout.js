"use client";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "leaflet/dist/leaflet.css";
import "./scss/app.scss";
import { Provider } from "react-redux";
import store from "../store";
import AuthProvider from "@/components/Provider";
import './globals.css'




export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <link href="https://fonts.cdnfonts.com/css/dalek-pinpoint" rel="stylesheet"/>
        </head>
          
        <body className="font-inter  custom-tippy dashcode-app">
          <AuthProvider>
            <Provider store={store}>
              {children}
              </Provider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
