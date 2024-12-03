import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";
import PropTypes from 'prop-types'; // Import PropTypes

function DonationDialog({ isOpen, onClose }) {
    const [customAmount, setCustomAmount] = useState("1"); // Default amount set to ₹1
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleDonate = () => {
        const amountInPaisa = parseInt(customAmount) * 100; // Convert to paisa
        if (isNaN(amountInPaisa) || amountInPaisa <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
            amount: amountInPaisa,
            currency: "INR",
            name: "Pygrams",
            description: "Support Pygrams Development",
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: name || "Your Name",
                email: email || "your_email@example.com",
                contact: phone || "9999999999",
            },
            theme: {
                color: "#F37254",
            },
            // Ensure UPI is enabled
            modal: {
                ondismiss: function () {
                    alert('Payment failed or cancelled.');
                },
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        onClose(); // Close the dialog after initiating payment
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: '#F37254', backgroundColor: '#FFEBEE', padding: '16px' }}>
                Enter Donation Details
            </DialogTitle>
            <DialogContent sx={{ padding: '16px 24px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Full Name"
                        type="text"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                padding: '6px 12px', // Reduced padding to make it smaller
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                            },
                        }}
                    />
                    <TextField
                        label="Phone (Optional)"
                        type="text"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={{
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                padding: '6px 12px', // Reduced padding
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                            },
                        }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                padding: '6px 12px', // Reduced padding
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                            },
                        }}
                    />
                    <TextField
                        label="Amount (₹)"
                        type="number"
                        fullWidth
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        sx={{
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                padding: '6px 12px', // Reduced padding
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                            },
                        }}
                    />
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', marginTop: 1 }}>
                        Donate as little as ₹1 or contribute more, every bit helps!
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', padding: '10px 20px' }}>
                <Button onClick={onClose} color="secondary" variant="outlined" sx={{ width: '120px', borderRadius: '20px' }}>
                    Cancel
                </Button>
                <Button onClick={handleDonate} color="primary" variant="contained" sx={{ width: '120px', borderRadius: '20px' }}>
                    Donate
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DonationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,  // Validate that isOpen is a boolean and is required
    onClose: PropTypes.func.isRequired, // Validate that onClose is a function and is required
};

export default DonationDialog;
