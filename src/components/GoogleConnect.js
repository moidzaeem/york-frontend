import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const GoogleConnectButton = () => {
  const handleConnect = () => {
    // Redirect the user to the backend to initiate the Google OAuth flow
    window.location.href = "https://crm-backend.yorkhospitality.ca/google/connect";
  };

  return (
    <button onClick={handleConnect} style={buttonStyle}>
      <span style={iconStyle}>
        {/* Optionally, you can add an icon, for example, from Font Awesome */}
        <i className="fa fa-google" style={{ fontSize: '20px' }}></i>
      </span>
      Connect to Google Drive and Calander
    </button>
  );
};

// Button styling
const buttonStyle = {
  backgroundColor: '#4285F4',  // Google blue color
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  outline: 'none',
};

// Icon styling (optional)
const iconStyle = {
  marginRight: '10px',  // Space between the icon and the text
};

export default GoogleConnectButton;
