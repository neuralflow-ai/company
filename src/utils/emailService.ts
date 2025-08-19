// Email service utility for multiple providers
// Supports Formspree and EmailJS

export interface EmailSubmission {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
  source: 'welcome-popup' | 'contact-form' | 'newsletter';
}



// Submit to Formspree (primary method)
export const submitToFormspree = async (
  formId: string, 
  data: EmailSubmission
): Promise<{success: boolean; message?: string}> => {
  try {
    console.log(`Submitting to Formspree with ID: ${formId}`);
    console.log('Form data being sent:', JSON.stringify(data, null, 2));
    
    if (!formId || formId.trim() === '') {
      console.error('Formspree submission failed: No form ID provided');
      return { success: false, message: 'No form ID provided' };
    }
    
    // Validate the form ID format
    if (!formId.match(/^[a-zA-Z0-9]+$/)) {
      console.error(`Invalid Formspree ID format: ${formId}`);
      return { success: false, message: 'Invalid Formspree ID format' };
    }
    
    const formspreeUrl = `https://formspree.io/f/${formId}`;
    console.log(`Sending request to: ${formspreeUrl}`);
    
    // Create a direct form submission
    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify(data)
      });

      console.log(`Formspree response status: ${response.status}`);
      console.log('Formspree response headers:', [...response.headers.entries()]);
      
      if (!response.ok) {
        let errorText;
        try {
          const errorJson = await response.json();
          errorText = JSON.stringify(errorJson);
          console.error('Formspree error response JSON:', errorJson);
        } catch (jsonError) {
          console.error('Failed to parse error response as JSON:', jsonError);
          errorText = await response.text().catch(() => 'Unknown error');
          console.error('Formspree error response text:', errorText);
        }
        
        console.error(`Formspree submission failed with status ${response.status}: ${errorText}`);
        return { 
          success: false, 
          message: `Submission failed with status ${response.status}: ${errorText}` 
        };
      }
      
      try {
        const responseData = await response.json();
        console.log('Formspree submission successful with response:', responseData);
        return { success: true };
      } catch (jsonError) {
        console.warn('Could not parse successful response as JSON:', jsonError);
        const responseText = await response.text().catch(() => 'No response body');
        console.log('Formspree submission successful with text response:', responseText);
        return { success: true };
      }
    } catch (fetchError) {
      console.error('Fetch operation failed:', fetchError);
      return { 
        success: false, 
        message: `Fetch error: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}` 
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Formspree submission failed:', errorMessage);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return { 
      success: false, 
      message: `Network error: ${errorMessage}` 
    };
  }
};

// Submit to EmailJS (alternative method)
export const submitToEmailJS = async (
  serviceId: string,
  templateId: string,
  data: EmailSubmission
): Promise<boolean> => {
  try {
    // Note: EmailJS requires their SDK to be installed
    // npm install @emailjs/browser
    const { send } = await import('@emailjs/browser');
    
    await send(serviceId, templateId, data as Record<string, unknown>);
    return true;
  } catch (error) {
    console.error('EmailJS submission failed:', error);
    return false;
  }
};

// Submit via WhatsApp
export const submitToWhatsApp = (data: EmailSubmission, phoneNumber: string = '+92 310 5163094'): boolean => {
  try {
    // Format the message for WhatsApp
    const message = 
      `🚀 *New Contact Form Submission - NeuralFlow AI*\n\n` +
      `👤 *Name:* ${data.name || 'Not provided'}\n` +
      `📧 *Email:* ${data.email}\n` +
      `🏢 *Company:* ${data.company || 'Not provided'}\n` +
      `📱 *Phone:* ${data.phone || 'Not provided'}\n\n` +
      `💬 *Message:*\n${data.message || 'No message provided'}\n\n` +
      `⏰ *Submitted:* ${new Date().toLocaleString()}\n` +
      `🌐 *Source:* NeuralFlow AI Website`;
    
    console.log('📱 WhatsApp message prepared:', message);
    
    // Format phone number for WhatsApp URL (remove spaces and plus sign)
    const formattedPhone = phoneNumber.replace(/[\s+]/g, '');
    
    // Create WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    console.log('📱 WhatsApp URL:', whatsappUrl);
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    return true;
  } catch (error) {
    console.error('WhatsApp submission failed:', error);
    return false;
  }
};

// Simple mailto fallback
export const submitViaMailto = (data: EmailSubmission): boolean => {
  try {
    const subject = encodeURIComponent(`Contact Form Submission from ${data.name || data.email}`);
    const body = encodeURIComponent(
      `Name: ${data.name || 'Not provided'}\n` +
      `Email: ${data.email}\n` +
      `Company: ${data.company || 'Not provided'}\n` +
      `Phone: ${data.phone || 'Not provided'}\n` +
      `Message: ${data.message || 'Not provided'}\n\n` +
      `This email was sent from the contact form on your website.`
    );
    
    const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL || 'hello@neuralflow.cloud';
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    
    window.open(mailtoUrl, '_blank');
    return true;
  } catch (error) {
    console.error('Mailto submission failed:', error);
    return false;
  }
};

// Universal email submission with fallbacks
export const submitEmail = async (
  data: EmailSubmission,
  options: {
    formspreeId?: string;
    emailJSConfig?: {
      serviceId: string;
      templateId: string;
      publicKey?: string;
    };
  } = {}
): Promise<{
  success: boolean;
  method: string;
  error?: string;
}> => {
  const { formspreeId, emailJSConfig } = options;

  // Try EmailJS first (more reliable than Formspree)
  if (emailJSConfig && emailJSConfig.serviceId !== 'service_your_id') {
    console.log('Attempting to submit via EmailJS');
    try {
      const { send, init } = await import('@emailjs/browser');
      
      // Initialize EmailJS with public key if provided
      if (emailJSConfig.publicKey) {
        init(emailJSConfig.publicKey);
      }
      
      const templateParams = {
        from_name: data.name || 'Anonymous',
        from_email: data.email,
        company: data.company || 'Not provided',
        phone: data.phone || 'Not provided',
        message: data.message || 'No message provided',
        to_email: import.meta.env.VITE_RECIPIENT_EMAIL || 'hello@neuralflow.cloud'
      };
      
      await send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        templateParams
      );
      
      console.log('Email successfully sent via EmailJS');
      return { success: true, method: 'emailjs' };
    } catch (emailJSError) {
      console.warn('EmailJS submission failed:', emailJSError);
      // Continue to fallback methods
    }
  } else {
    console.warn('No valid EmailJS config provided, skipping EmailJS submission');
  }

  // Try Formspree as fallback
  if (formspreeId) {
    console.log(`Attempting to submit via Formspree with ID: ${formspreeId}`);
    const formspreeResult = await submitToFormspree(formspreeId, data);
    
    if (formspreeResult.success) {
      console.log('Email successfully sent via Formspree');
      return { success: true, method: 'formspree' };
    } else {
      console.warn(`Formspree submission failed: ${formspreeResult.message}`);
      // Continue to fallback methods
    }
  } else {
    console.warn('No Formspree ID provided, skipping Formspree submission');
  }

  // Final fallback: use mailto (always works)
  console.log('Using mailto as final fallback');
  const mailtoSuccess = submitViaMailto(data);
  
  if (mailtoSuccess) {
    return { 
      success: true, 
      method: 'mailto',
      error: 'Email client opened. Please send the pre-filled email to complete your submission.'
    };
  }

  // If even mailto fails, save locally
  try {
    console.log('All email submission methods failed, saving to local storage');
    const { saveEmail } = await import('./emailStorage');
    saveEmail(data.email, 'failed-submission', data);
    
    return {
      success: false,
      method: 'none',
      error: 'All email submission methods failed. Data saved locally for manual processing.'
    };
  } catch (storageError) {
    console.error('Failed to save email locally:', storageError);
    return {
      success: false,
      method: 'none',
      error: 'All email submission methods failed. Could not save data locally.'
    };
  }
};

// Configuration for different environments
export const getEmailConfig = () => {
  return {
    // EmailJS (primary method - more reliable)
    emailjs: {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
      welcomeTemplateId: import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    },
    
    // Formspree (fallback - currently having issues)
    formspree: {
      contactFormId: import.meta.env.VITE_FORMSPREE_CONTACT_ID,
      welcomePopupId: import.meta.env.VITE_FORMSPREE_WELCOME_ID
    },
    
    // Recipient email
    recipient: {
      email: import.meta.env.VITE_RECIPIENT_EMAIL || 'hello@neuralflow.cloud'
    }
  };
};

// Example usage:
/*
import { submitEmail, getEmailConfig } from './emailService';

const config = getEmailConfig();

await submitEmail(
  {
    email: 'user@example.com',
    name: 'John Doe',
    source: 'contact-form'
  },
  {
    formspreeId: config.formspree.contactFormId
  }
);
*/