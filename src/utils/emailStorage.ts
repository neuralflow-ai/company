// Simple email storage utility using localStorage
// This is a free, easy solution that works immediately

export interface EmailEntry {
  id: string;
  email: string;
  source: 'welcome-popup' | 'contact-form' | 'newsletter';
  timestamp: string;
  additionalData?: {
    name?: string;
    company?: string;
    message?: string;
    phone?: string;
  };
}

const STORAGE_KEY = 'neuralflow_emails';

// Save email to localStorage
export const saveEmail = (
  email: string, 
  source: EmailEntry['source'], 
  additionalData?: EmailEntry['additionalData']
): void => {
  try {
    const existingEmails = getStoredEmails();
    
    const newEntry: EmailEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase().trim(),
      source,
      timestamp: new Date().toISOString(),
      additionalData
    };

    // Check if email already exists from the same source
    const emailExists = existingEmails.some(
      entry => entry.email === newEntry.email && entry.source === source
    );

    if (!emailExists) {
      existingEmails.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEmails));
      console.log(`✅ Email saved: ${email} from ${source}`);
    } else {
      console.log(`ℹ️ Email already exists: ${email} from ${source}`);
    }
  } catch (error) {
    console.error('Failed to save email:', error);
  }
};

// Get all stored emails
export const getStoredEmails = (): EmailEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve emails:', error);
    return [];
  }
};

// Get emails by source
export const getEmailsBySource = (source: EmailEntry['source']): EmailEntry[] => {
  return getStoredEmails().filter(entry => entry.source === source);
};

// Export emails as CSV
export const exportEmailsAsCSV = (): void => {
  const emails = getStoredEmails();
  
  if (emails.length === 0) {
    alert('No emails to export!');
    return;
  }

  const headers = ['Email', 'Source', 'Date', 'Name', 'Company', 'Phone', 'Message'];
  const csvContent = [
    headers.join(','),
    ...emails.map(entry => [
      entry.email,
      entry.source,
      new Date(entry.timestamp).toLocaleDateString(),
      entry.additionalData?.name || '',
      entry.additionalData?.company || '',
      entry.additionalData?.phone || '',
      entry.additionalData?.message?.replace(/,/g, ';') || '' // Replace commas to avoid CSV issues
    ].map(field => `"${field}"`).join(','))
  ].join('\n');

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `neuralflow_emails_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log(`📥 Exported ${emails.length} emails to CSV`);
};

// Get email statistics
export const getEmailStats = () => {
  const emails = getStoredEmails();
  const stats = {
    total: emails.length,
    welcomePopup: emails.filter(e => e.source === 'welcome-popup').length,
    contactForm: emails.filter(e => e.source === 'contact-form').length,
    newsletter: emails.filter(e => e.source === 'newsletter').length,
    lastWeek: emails.filter(e => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(e.timestamp) > weekAgo;
    }).length
  };
  
  return stats;
};

// Clear all emails (admin function)
export const clearAllEmails = (): void => {
  if (confirm('Are you sure you want to delete all stored emails? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ All emails cleared');
  }
};

// Debug function to view all emails in console
export const debugViewEmails = (): void => {
  const emails = getStoredEmails();
  const stats = getEmailStats();
  
  console.group('📧 NeuralFlow Email Storage Debug');
  console.log('📊 Statistics:', stats);
  console.log('📋 All Emails:', emails);
  console.groupEnd();
};