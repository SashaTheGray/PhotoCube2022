/*
 * This module contains the PhotoCube application
 */

import { Route, Routes } from "react-router-dom"
import { Container, CssBaseline } from "@mui/material"
import Navbar from "./Navbar/Navbar"
import FilterMenu from "./FilterMenu/FilterMenu"

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        {/* Navbar is shared among all Routes */}
        <Navbar />

        {/* Define the routes for the application */}
        <Routes>
          {/* Default route - Client */}
          <Route path="client" />

          {/* Filters route */}
          <Route path="client/filters" element={<FilterMenu />} />

          {/* Settings route */}
          <Route path="client/settings" />
        </Routes>
      </Container>
    </>
  )
}

export default App
