import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FirstPageProps {
  setUserDetails: (userDetails: string | null) => void;
}

function FirstPage({ setUserDetails }: FirstPageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    // Perform validation
    const errors: Record<string, string> = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
  
    // If there are errors, update the formErrors state and return
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    // Log the form values
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
  
    // Save user details to local storage
    localStorage.setItem('name', name);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('email', email);
  
    // Update the user details state in App component
    setUserDetails(JSON.stringify(localStorage.getItem('userDetails')));
  
    // Navigate to the second page
    navigate('/second-page');
  
    setFormErrors({});
  };
  

  return (
    <div  style={{ height: 200, width: '100%', marginLeft: "50px"}}>
      <h1>First Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={Boolean(formErrors.name)}
          helperText={formErrors.name}
          style={{marginRight: "20px"}}
        />

        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          error={Boolean(formErrors.phoneNumber)}
          helperText={formErrors.phoneNumber}
          style={{marginRight: "20px"}}
        />

        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
          style={{marginRight: "20px"}}
        />

        <br />
        <Button variant="contained" style={{marginTop: "20px"}} type="submit">
          Next
        </Button>
      </form>
    </div>
  );
}

export default FirstPage;
