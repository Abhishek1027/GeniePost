import React from 'react';
import { AppBar, Toolbar, Box, InputBase, styled, Typography } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material';
import newLogo from '../Assets/genie.png';  // Adjust the path to the image

const StyledAppBar = styled(AppBar)`
    background: transparent;  // Set to transparent
    box-shadow: none;
`;

const SearchWrapper = styled(Box)`
    flex-grow: 1; /* Added flex-grow to push the search bar to the right */
    margin-right: 20px; /* Adjusted margin */
    background: #EAF1FB;
    border-radius: 8px;
    min-width: 100; /* Adjusted min-width */
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;

const OptionsWrapper = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: flex-end; /* Adjusted alignment */
`;

const Header = ({ toggleDrawer }) => {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer} />
                <img src={newLogo} alt="logo" style={{ width: 110 }} />
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" color="textSecondary">Gꍟꈤꀤꍟꉣꂦꌗ꓄</Typography>
                    <Box marginLeft={1} /> {/* Added margin between the text and search bar */}
                </Box>  
                
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase />
                    <Tune color="action" />
                </SearchWrapper>

                <OptionsWrapper>
                    <HelpOutlineOutlined color="action" />
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action" />
                    <AccountCircleOutlined color="action" />
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;
