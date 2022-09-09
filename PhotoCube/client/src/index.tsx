import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./components/App"
import { photoCubeStore } from "./redux/store"
import {} from "@reduxjs/toolkit"

// Define the container root within <project>/public/index.html.
const container = document.getElementById("root")
const root = createRoot(container!)

// Render the application.
root.render(
  <React.StrictMode>
    <Provider store={photoCubeStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
