import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import '../global/css/App.css';

export default function PrincipalMenu(component_props) {
  const { options_menu, selected, optionSelected } = component_props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <List>
      <ListItem button onClick = { () => optionSelected('Home') } selected = { selected == 'Home' }>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary = "Home" />
      </ListItem>
      {
        options_menu.map(
          ({ name, icon }, key) => {
            return (
              <ListItem button onClick = { () => optionSelected(name) } selected = { selected == name } key = { key } >
                <ListItemIcon>
                  { icon }
                </ListItemIcon>
                <ListItemText primary = { name } />
              </ListItem>
            );
          }
        )
      }
    </List>
  )
}