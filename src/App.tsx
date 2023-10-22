import React, { useState, ReactElement, useRef, useEffect, ReactNode } from 'react';

import { Outlet, useOutlet } from 'react-router-dom';

import { Map as LeafletMap } from "leaflet"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from "@mui/material/styles";

import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


import './App.css';
import Map from './components/Map';

import useVehiclePositions from './hooks/useVehiclePositions';
import VehiclePositionContext from './context/vehiclePositionContext';

import { VehiclePosition } from './__generated__/graphql';

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar)

interface NavItem {
  title: string,
  icon?: ReactElement,
  action: () => void
}

const navItems: NavItem[] = [
  {
    title: "Info",
    icon: <InfoIcon sx={{ mr: 1 }} />,
    action: () => console.log("Info :D")
  }
]

const VehiclePositionProvider = (props: { children: ReactNode }) => {
  const vehiclePositions = useVehiclePositions()

  return <VehiclePositionContext.Provider value={vehiclePositions.data?.vehiclePositions as VehiclePosition[] || []}>
    { props.children }
  </VehiclePositionContext.Provider>
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => setDrawerOpen((state: boolean) => !state)

  const mapRef = useRef<LeafletMap>(null)

  const outlet = useOutlet()

  useEffect(
    () => {
      mapRef.current?.invalidateSize()
    },
    [outlet, mapRef.current])
  
  const drawer = (
    <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Baltic Ferries
      </Typography>
      <Divider />
      <List>
        {navItems.map((item: NavItem, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              { item.icon && <ListItemIcon>{ item.icon }</ListItemIcon> }
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Baltic Ferries
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            { 
              navItems.map((item: NavItem, index: number) => {
                return (
                  <Button key={index} sx={{ color: '#fff' }}>
                    { item.icon }{ item.title }
                  </Button>
                )
              })
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={window.document.body}
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Offset />
        <VehiclePositionProvider>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
              <Map ref={mapRef} />
              { outlet &&
                <Box sx={{ maxHeight: '100%', height: '100%', flexBasis: 400, p: 2, boxShadow: 1, zIndex: 1, overflow: 'scroll' }}>
                  <Outlet />
                </Box>
              }
            </Box>
          </Box>
        </VehiclePositionProvider>
      </Box>
    </Box>
  )
}

export default App;