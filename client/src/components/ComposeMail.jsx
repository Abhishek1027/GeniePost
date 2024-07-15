import React, { useState } from 'react';
import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material';
import { Close, DeleteOutline } from '@mui/icons-material';
import axios from 'axios';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
};

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`;

const ComposeMail = ({ open, setOpenDrawer }) => {
    const [data, setData] = useState({});
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config = {
        Username: process.env.REACT_APP_UNSERNAME,
        Password: process.env.REACT_APP_PASSWORD,
        Host: "smtp.elasticemail.com",
        Port: 2525,
    };

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleGenerateEmail = async () => {
        setIsGenerating(true);
        try {
            const response = await axios.post('http://localhost:8000/generate-email', { prompt });
            setData({ ...data, body: response.data.emailContent });
        } catch (error) {
            console.error('Error generating email:', error);
        }
        setIsGenerating(false);
    };

    const sendEmail = async (e) => {
        e.preventDefault();

        if (window.Email) {
            window.Email.send({
                ...config,
                To: data.to,
                From: "srikanthpvb@gmail.com",
                Subject: data.subject,
                Body: data.body
            }).then(
                message => alert(message)
            );
        }

        const payload = {
            to: data.to,
            from: "srikanthpvb@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'GeniePost',
            starred: false,
            type: 'sent'
        };

        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDrawer(false);
            setData({});
        } else {
            // Handle the error
        }
    };

    const closeComposeMail = (e) => {
        e.preventDefault();

        const payload = {
            to: data.to,
            from: "codeforinterview03@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Code for Interview',
            starred: false,
            type: 'drafts'
        };

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDrawer(false);
            setData({});
        } else {
            // Handle the error
        }
    };

    return (
        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
            </Header>
            <RecipientWrapper>
                <InputBase placeholder='Recipients' name="to" onChange={(e) => onValueChange(e)} value={data.to} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValueChange(e)} value={data.subject} />
            </RecipientWrapper>
            <TextField
                multiline
                rows={20}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                name="body"
                onChange={(e) => onValueChange(e)}
                value={data.body}
            />
            <Box display="flex" alignItems="center" p={2}>
                <TextField
                    placeholder='Enter a prompt to generate email content'
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <Button onClick={handleGenerateEmail} disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
            </Box>
            <Footer>
                <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDrawer(false)} />
            </Footer>
        </Dialog>
    );
};
export default ComposeMail;
