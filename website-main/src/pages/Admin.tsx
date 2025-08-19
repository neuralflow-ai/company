import React from 'react';
import { Helmet } from 'react-helmet-async';
import EmailDashboard from '../components/admin/EmailDashboard';

const Admin: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - NeuralFlow AI</title>
        <meta name="description" content="Admin dashboard for managing NeuralFlow AI website data and analytics." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <EmailDashboard />
    </>
  );
};

export default Admin;