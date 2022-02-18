import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Drawer, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import fut_logo from '../global/imagenes/fifa21-fut-logo.png';
import PrincipalMenu from './PrincipalMenu';
import TeamIcon from '@mui/icons-material/Groups';
import PlayerIcon from '@mui/icons-material/Person';

export default function TitleBar(component_props) {
  const { selected, optionSelected } = component_props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const options_menu = [{ name: 'Players', icon: <PlayerIcon /> }, { name: 'Teams', icon: <TeamIcon /> }]

  const drawer = (
    <div style = {{ height: "100%", overflow: 'auto' }} className = 'scroll'>
      <Grid container justifyContent = "center" alignItems = "center" style = {{ marginTop: 10 }}>
        <img src = { fut_logo } alt="Logo fut_logo" />
      </Grid>
      <br />
      <PrincipalMenu options_menu = { options_menu } selected = { selected } optionSelected = { optionSelected } />
    </div>
  );

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <Box sx = {{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size = "large"
            edge = "start"
            color = "inherit"
            aria-label = "menu"
            sx = {{ mr: 2 }}
            onClick = { handleDrawerToggle }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant = 'h5' component = "div" sx = {{ flexGrow: 1 }}>
            { selected }
          </Typography>
        </Toolbar>
      </AppBar>
        <Drawer
          anchor = { 'left' }
          open = { mobileOpen }
          onClose = { handleDrawerToggle }
          sx = {{ display: { xl: 'none', xs: 'block' } }}
        >
          { drawer }
        </Drawer>
    </Box>
  );
}
