import React, { useState } from 'react';
import Header from './Header.jsx'; 
import Footer from './Footer.jsx'; 
import { TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqabagjr'; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');


    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    try {

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
        body: JSON.stringify(formData) 
      });

      if (response.ok) {
        setStatus('success'); 
        setFormData({ name: '', email: '', message: '' }); 
      } else {
        setStatus('error');
        console.error('Formspree error response:', await response.json());
      }
    } catch (error) {

      setStatus('error');
      console.error('Network error submitting form:', error);
    }
  };

  return (
    <>
      <Header /> 
      <Box 
        sx={{ 
          maxWidth: { xs: '90%', sm: 500, md: 600 }, 
          mx: 'auto', 
          p: { xs: 2, sm: 3 }, 
          my: 4, 
          border: '1px solid #e0e0e0',
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          bgcolor: 'background.paper', 
          fontFamily: 'Inter, sans-serif' 
        }}
      >
<h1>Contact</h1>
<p>Have a question for us or feedback? Please fill the form to reach us.</p>

        {status === 'success' && (
          <Alert 
            severity="success" 
            icon={<CheckCircleOutlineIcon fontSize="inherit" />} 
            sx={{ mb: 2, borderRadius: '8px' }}
          >
            Thank you for your message! We'll get back to you soon.
          </Alert>
        )}
        {status === 'error' && (
          <Alert 
            severity="error" 
            icon={<ErrorOutlineIcon fontSize="inherit" />} 
            sx={{ mb: 2, borderRadius: '8px' }}
          >There was an issue sending your message. Please try again later.
          </Alert>
        )}


        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth 
            margin="normal" 
            label="Your Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            variant="outlined" 
            sx={{ mb: 2 }} 
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your Email"
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your Message"
            name="message"
            multiline 
            rows={6} 
            value={formData.message}
            onChange={handleChange}
            required
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            type="submit" 
            variant="contained" 
            color="primary" 
            endIcon={status === 'submitting' ? null : <SendIcon />} 
            disabled={status === 'submitting'} 
            sx={{ 
              mt: 2, 
              py: 1.5, 
              fontSize: '1rem',
              borderRadius: '8px', 
              '&:hover': {
                transform: 'translateY(-2px)', 
                boxShadow: '0 6px 15px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {status === 'submitting' ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Box>
      <Link to='/'>Go back to main page</Link>
      <Footer /> 
    </>
  );
}

export default ContactUs;