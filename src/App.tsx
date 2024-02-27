import { useState, ReactElement, useRef, useEffect, ReactNode } from 'react';

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

import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';


import './App.css';

import { env } from './env';

import Map from './components/Map';
import DocumentTitle from './components/DocumentTitle';
import AppBarSearch from './components/AppBarSearch';

import useVehiclePositions from './hooks/useVehiclePositions';
import useStops from './hooks/useStops';

import StopContext from './context/stopContext';
import VehiclePositionContext from './context/vehiclePositionContext';

import { VehiclePosition, Stop } from './__generated__/graphql';

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

const StopProvider = (props: { children: ReactNode }) => {
  const stops = useStops()

  return <StopContext.Provider value={stops.data?.stops as Stop[] || []}>
    { props.children }
  </StopContext.Provider>
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

  const theme = useTheme()
  const isAtleastMediumScreen = useMediaQuery(theme.breakpoints.up("md"))
  
  const drawer = (
    <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        { env.REACT_APP_APPLICATION_TITLE }
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
    <StopProvider>
      <VehiclePositionProvider>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <DocumentTitle />
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
                { env.REACT_APP_APPLICATION_TITLE }
              </Typography>
              <AppBarSearch />
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
          <Box component="main" sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
            <Offset />
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: isAtleastMediumScreen ? 'row' : 'column' }}>
                <Map 
                  ref={mapRef}
                  style={{ height: isAtleastMediumScreen ? '100%' : undefined, flexGrow: '1', minHeight: undefined }} />
                { outlet &&
                  <Box sx={{
                    display: 'flex',
                    flexBasis: 400,
                    flexGrow: '0',
                    maxHeight: isAtleastMediumScreen ? '100%' : 400,
                    height: isAtleastMediumScreen ? '100%' : 400,
                    background: 'white'
                    }}>
                    <Box sx={{
                      display: 'flex',
                      flexGrow: '1',
                      height: '100%',
                      maxHeight: '100%',
                      p: 2,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{
                        flexGrow: '1',
                        height: '100%',
                        maxHeight: '100%'
                      }}>
                        <Outlet />
                      </Box>
                    </Box>
                  </Box>
                }
              </Box>
            </Box>
          </Box>
        </Box>
    
      </VehiclePositionProvider>
    </StopProvider>
  )
}

export default App;