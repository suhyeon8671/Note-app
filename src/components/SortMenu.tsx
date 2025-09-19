import {
    Popover,
    Box,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
    Button,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  
  interface SortMenuProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    sortBy: string;
    onSortByChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
  }
  
  const SortMenu = ({ anchorEl, onClose, sortBy, onSortByChange, onClear }: SortMenuProps) => {
    const open = Boolean(anchorEl);
  
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            p: 1.5,
            minWidth: "220px",
            mt: 1,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            정렬
          </Typography>
          <Box>
            <Button onClick={onClear} sx={{ color: "red", textTransform: "none", fontSize: '0.75rem', mr: -1 }}>
              CLEAR
            </Button>
            <IconButton onClick={onClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <FormControl component="fieldset" sx={{ mt: 1, px: 1 }}>
          <FormLabel component="legend" sx={{ fontSize: '0.7rem', color: "text.secondary", mb: 0.5 }}>
            PRIORITY
          </FormLabel>
          <RadioGroup name="priority" value={sortBy} onChange={onSortByChange}>
            <FormControlLabel value="priority_low_high" control={<Radio size="small" />} label="Low to High" sx={{ '& .MuiTypography-root': { fontSize: '0.8rem' } }} />
            <FormControlLabel value="priority_high_low" control={<Radio size="small" />} label="High to Low" sx={{ '& .MuiTypography-root': { fontSize: '0.8rem' } }} />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" sx={{ mt: 1, px: 1 }}>
          <FormLabel component="legend" sx={{ fontSize: '0.7rem', color: "text.secondary", mb: 0.5 }}>
            DATE
          </FormLabel>
          <RadioGroup name="date" value={sortBy} onChange={onSortByChange}>
            <FormControlLabel value="date_latest" control={<Radio size="small" />} label="Sort by Latest" sx={{ '& .MuiTypography-root': { fontSize: '0.8rem' } }} />
            <FormControlLabel value="date_created" control={<Radio size="small" />} label="Sort by Created" sx={{ '& .MuiTypography-root': { fontSize: '0.8rem' } }} />
            <FormControlLabel value="date_edited" control={<Radio size="small" />} label="Sort by Edited" sx={{ '& .MuiTypography-root': { fontSize: '0.8rem' } }} />
          </RadioGroup>
        </FormControl>
      </Popover>
    );
  };
  
  export default SortMenu;  
  