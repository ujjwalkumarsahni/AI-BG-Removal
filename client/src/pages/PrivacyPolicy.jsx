import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const PrivacyPolicy = () => (
    <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Last updated: June 2025
            </Typography>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>Introduction</Typography>
                <Typography variant="body1" paragraph>
                    ReImage ("we", "us", or "our") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, and safeguard your information 
                    when you use our website and services.
                </Typography>
            </Box>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>Information We Collect</Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Personal Information"
                            secondary="We may collect your email address or other contact details if you choose to provide them."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Usage Data"
                            secondary="We collect information about how you use our site, such as pages visited and features used."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Uploaded Files"
                            secondary="Images or files you upload for background removal are processed temporarily and not stored after processing."
                        />
                    </ListItem>
                </List>
            </Box>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>How We Use Your Information</Typography>
                <List>
                    <ListItem><ListItemText primary="To provide and improve our services." /></ListItem>
                    <ListItem><ListItemText primary="To respond to your inquiries and support requests." /></ListItem>
                    <ListItem><ListItemText primary="To analyze usage and enhance user experience." /></ListItem>
                </List>
            </Box>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>Data Security</Typography>
                <Typography variant="body1" paragraph>
                    We implement reasonable security measures to protect your information. 
                    However, no method of transmission over the Internet is 100% secure.
                </Typography>
            </Box>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>Third-Party Services</Typography>
                <Typography variant="body1" paragraph>
                    We may use third-party services for analytics or hosting. These providers have their own privacy policies.
                </Typography>
            </Box>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>Your Rights</Typography>
                <Typography variant="body1" paragraph>
                    You may request to access, update, or delete your personal information by contacting us.
                </Typography>
            </Box>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>Changes to This Policy</Typography>
                <Typography variant="body1" paragraph>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page.
                </Typography>
            </Box>

            <Box mt={3}>
                <Typography variant="h5" gutterBottom>Contact Us</Typography>
                <Typography variant="body1">
                    If you have any questions about this Privacy Policy, please contact us at:{" "}
                    <a href="mailto:support@trimbackground.com">support@trimbackground.com</a>
                </Typography>
            </Box>
        </Paper>
    </Container>
);

export default PrivacyPolicy;
