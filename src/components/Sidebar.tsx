import { Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { 
    LightbulbOutlined as LightbulbIcon, 
    LocalOfferOutlined as TagIcon,
    Edit as EditIcon,
    ArchiveOutlined as ArchiveIcon,
    DeleteOutline as TrashIcon 
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface SidebarProps {
  drawerWidth: number;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  onEditTags: () => void;
}

const otherOptions = [
    { name: 'Archive', icon: <ArchiveIcon />, path: 'archive' },
    { name: 'Trash', icon: <TrashIcon />, path: 'trash' },
]

const Sidebar = ({ drawerWidth, currentCategory, setCurrentCategory, onEditTags }: SidebarProps) => {
  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  const tags = useSelector((state: RootState) => state.tags.tags);

  const categories = [
    { name: 'Notes', icon: <LightbulbIcon />, path: '/' },
    ...tags.map(tag => ({ name: tag, icon: <TagIcon />, path: '/' }))
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f8f9fa', borderRight: 'none' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {categories.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                component={Link} 
                to={item.path}
                onClick={() => handleCategoryClick(item.name)}
                sx={{
                    backgroundColor: currentCategory === item.name ? '#feefc3' : 'transparent',
                    '&:hover': {
                        backgroundColor: currentCategory === item.name ? '#feefc3' : '#f1f3f4',
                    },
                    borderRadius: '0 25px 25px 0',
                    marginRight: '15px',
                    marginLeft: '5px'
                }}
                >
                <ListItemIcon sx={{color: currentCategory === item.name ? 'black' : '#5f6368'}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
            <ListItem key="edit-tags" disablePadding>
              <ListItemButton 
                onClick={onEditTags}
                sx={{
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: '#f1f3f4',
                    },
                    borderRadius: '0 25px 25px 0',
                    marginRight: '15px',
                    marginLeft: '5px'
                }}
                >
                <ListItemIcon sx={{color: '#5f6368'}}><EditIcon /></ListItemIcon>
                <ListItemText primary="Edit Tags" />
              </ListItemButton>
            </ListItem>
            {otherOptions.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton 
                    component={Link} 
                    to={item.path}
                    onClick={() => handleCategoryClick(item.name)}
                    sx={{
                        backgroundColor: currentCategory === item.name ? '#feefc3' : 'transparent',
                        '&:hover': {
                            backgroundColor: currentCategory === item.name ? '#feefc3' : '#f1f3f4',
                        },
                        borderRadius: '0 25px 25px 0',
                        marginRight: '15px',
                        marginLeft: '5px'
                    }}
                    >
                    <ListItemIcon sx={{color: currentCategory === item.name ? 'black' : '#5f6368'}}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;