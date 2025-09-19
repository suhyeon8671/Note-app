import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import { Add as AddIcon, Menu as MenuIcon } from '@mui/icons-material';

interface HeaderProps {
  title: string;
  onAddNote: () => void;
}

const Header = ({ title, onAddNote }: HeaderProps) => {
  return (
    <AppBar 
      position="fixed" 
      color="default"
      elevation={0}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        backgroundColor: 'white', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ color: '#5f6368' }}>
          Keep
        </Typography>
        
        <Typography variant="h5" component="div" sx={{ fontWeight: '400', ml: 17}}>
            {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={onAddNote}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
