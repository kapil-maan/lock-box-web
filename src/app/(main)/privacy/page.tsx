import { Container, Typography, Paper } from '@mui/material';

export default function PrivacyPage() {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>About Lock Box</Typography>
                <Typography variant="body1">
                    This is the privacy page for the Lock Box application.
                </Typography>
            </Paper>
        </Container>
    );
}