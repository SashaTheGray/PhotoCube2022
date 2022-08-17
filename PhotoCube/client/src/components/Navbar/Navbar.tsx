/*
 * This module contains the Navbar component
 * which acts as the navigation bar for the client.
 * */

import { AppBar, Toolbar, Tooltip, Grid, Button } from "@mui/material"
import { SettingsOutlined, FilterAltOutlined } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const AppBarStyle = {
  height: "65px",
  borderRadius: "10px",
  border: "3px solid black",
  margin: "5px",
}

enum Paths {
  CLIENT = "client",
  SETTINGS = "client/settings",
  FILTERS = "client/filters",
}

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <AppBar position="sticky" style={AppBarStyle}>
        <Toolbar component="div" variant="regular" color="inherit">
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            columns={3}
            spacing={0}
            color="inherit"
          >
            {/* Settings Navigation Button */}
            <Grid item>
              <Tooltip title="Settings (S)" placement="right" arrow>
                <Button
                  color="inherit"
                  aria-label="settings-button"
                  onClick={() => {
                    navigate(Paths.SETTINGS)
                  }}
                >
                  <SettingsOutlined />
                </Button>
              </Tooltip>
            </Grid>

            {/* Logo */}
            <Grid item>
              <Tooltip title="Client (C)" placement="bottom" arrow>
                <Button
                  variant="text"
                  size="large"
                  color="inherit"
                  onClick={() => {
                    navigate(Paths.CLIENT)
                  }}
                >
                  PhotoCube
                </Button>
              </Tooltip>
            </Grid>

            {/* Filter Navigation Button */}
            <Grid item>
              <Tooltip title="Filters (F)" placement="left" arrow>
                <Button
                  color="inherit"
                  aria-label="filter-button"
                  onClick={() => {
                    navigate(Paths.FILTERS)
                  }}
                >
                  <FilterAltOutlined />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
