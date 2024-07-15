import React from 'react';
import { Drawer, styled } from "@mui/material";
import SideBarContent from "./SideBarContent";

const StyledDrawer = styled(Drawer)`
    margin-top: 100px; /* Adjusted margin to move sidebar down */
`

const SideBar = ({ toggleDrawer, openDrawer }) => {

    return (
        <StyledDrawer
            anchor='left'
            open={openDrawer}
            onClose={toggleDrawer}
            hideBackdrop={true}
            ModalProps={{
                keepMounted: true,
            }}
            variant="persistent"
            transitionDuration={450} // Adjusted transition duration to 500ms
            sx={{
                '& .MuiDrawer-paper': { 
                    width: 250,
                    borderRight: 'none',
                    background: '#f5F5F5',
                    marginTop: '114px', /* Adjusted marginTop */
                    height: 'calc(100vh - 114px)', /* Adjusted height */
                },
            }}
          >
            <SideBarContent />
        </StyledDrawer>
    )
}

export default SideBar;
