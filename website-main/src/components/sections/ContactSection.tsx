import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, MessageCircle, Mail, DollarSign, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitEmail, getEmailConfig } from '@/utils/emailService';
import FreeOrderSection from '@/components/sections/FreeOrderSection';
// Removed NetworkBackground import - using unified background from App.tsx

// Custom Fiverr Icon Component
const FiverrIcon = () => (
  <svg className="h-10 w-10 sm:h-12 sm:w-12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0zm4.8 18.1h-2.6v-1.5c-.4.8-1.2 1.7-2.6 1.7-1.8 0-3.2-1.4-3.2-3.6 0-2.2 1.4-3.6 3.2-3.6 1.3 0 2.1.8 2.6 1.6V9.2h2.6v8.9zM9.4 6.9c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zM8.9 18.1H6.3V9.2h2.6v8.9z"/>
  </svg>
);

// Custom Upwork Icon Component
const UpworkIcon = () => (
  <svg className="h-10 w-10 sm:h-12 sm:w-12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.004-2.439-5.457-5.439-5.457z"/>
  </svg>
);

// Custom Instagram Icon Component
const InstagramIcon = () => (
  <svg className="h-10 w-10 sm:h-12 sm:w-12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Please select an industry'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchedService = watch('service');
  const watchedIndustry = watch('industry');
  const watchedBudget = watch('budget');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      // Save email and form data to localStorage
      import('../../utils/emailStorage').then(({ saveEmail }) => {
        saveEmail(data.email, 'contact-form', {
          name: data.name,
          company: data.company,
          message: data.message,
          phone: data.industry // Using industry field as additional info
        });
      });

      // Create WhatsApp message for agent notification
      const whatsappMessage = `🚀 *New Contact Form Submission - NeuralFlow AI*\n\n` +
        `👤 *Name:* ${data.name}\n` +
        `📧 *Email:* ${data.email}\n` +
        `🏢 *Company:* ${data.company}\n` +
        `🏭 *Industry:* ${data.industry}\n` +
        `⚙️ *Service:* ${data.service}\n` +
        `💰 *Budget:* ${data.budget}\n\n` +
        `💬 *Message:*\n${data.message}\n\n` +
        `⏰ *Submitted:* ${new Date().toLocaleString()}\n` +
        `🌐 *Source:* NeuralFlow AI Website`;

      // Format email message with all form data
      const emailMessage = `
        Name: ${data.name}
        Email: ${data.email}
        Company: ${data.company}
        Industry: ${data.industry}
        Service: ${data.service}
        Budget: ${data.budget}
        Message: ${data.message}
        Submitted: ${new Date().toLocaleString()}
        Source: NeuralFlow AI Website Contact Form
      `;
      
      // Log WhatsApp message for development purposes
      console.log('📱 WhatsApp notification data prepared:', whatsappMessage);
      
      // You can manually copy this formatted message to WhatsApp:
      // +03322555238
      if (process.env.NODE_ENV === 'development') {
        console.log('\n🔗 WhatsApp Link (for manual use):', `https://wa.me/+923105163094?text=${encodeURIComponent(whatsappMessage)}`);
      }
      
      // Send to WhatsApp directly
      try {
        const { submitToWhatsApp } = await import('@/utils/emailService');
        
        const whatsappData = {
          email: data.email,
          name: data.name,
          company: data.company,
          phone: data.phone,
          message: emailMessage,
          source: 'contact-form' as const
        };
        
        console.log('Sending form data to WhatsApp:', whatsappData);
        
        // Submit to WhatsApp with the specified number
        const whatsappSuccess = submitToWhatsApp(whatsappData, '+92 310 5163094');
        
        if (whatsappSuccess) {
          console.log('WhatsApp submission successful');
          setMessage('Thank you for your message! WhatsApp has been opened with your details. Please send the message to complete your submission. We\'ll get back to you within 24 hours!');
          setIsSuccess(true);
          
          // Also save the user's email for your records
          try {
            const { saveEmail } = await import('@/utils/emailStorage');
            saveEmail(data.email, 'contact-form', {
              name: data.name,
              company: data.company,
              message: data.message
            });
          } catch (storageError) {
            console.warn('Failed to save email to local storage:', storageError);
          }
          
          // Clear the message after 8 seconds
          setTimeout(() => {
            setMessage('');
            setIsSuccess(false);
          }, 8000);
          
          reset();
        } else {
          console.error('WhatsApp submission failed');
          setMessage('Unable to open WhatsApp. Please contact us directly at hello@neuralflow.cloud or call us for immediate assistance.');
          setIsSuccess(false);
          
          // Clear the error message after 8 seconds
          setTimeout(() => {
            setMessage('');
          }, 8000);
        }
      } catch (whatsappError) {
        console.error('WhatsApp submission error:', whatsappError);
        
        setMessage('Unable to open WhatsApp. Please contact us directly at hello@neuralflow.cloud or call us for immediate assistance.');
        setIsSuccess(false);
        
        // Clear the error message after 8 seconds
        setTimeout(() => {
          setMessage('');
          setIsSuccess(false);
        }, 8000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show user-friendly message using state
      setMessage('Thank you for your interest! Our form service is temporarily unavailable. Please contact us directly at hello@neuralflow.cloud or call us for immediate assistance.');
      setIsSuccess(false);
      
      // Clear message after 8 seconds (longer for error messages)
      setTimeout(() => {
        setMessage('');
        setIsSuccess(false);
      }, 8000);
      
      // Still save to local storage as backup
      try {
        const { saveEmail } = await import('@/utils/emailStorage');
        saveEmail(data.email, 'contact-form', {
          name: data.name,
          company: data.company,
          message: data.message
        });
        console.log('Form data saved to local storage as backup');
      } catch (storageError) {
        console.error('Failed to save to local storage:', storageError);
      }
    }
  }

  const openCalendly = () => {
    window.open('https://calendly.com/neuralflow-cloud/30min', '_blank', 'width=800,height=600');
    
    toast.success('Opening Calendly - Book your free consultation now!', {
      duration: 3000,
    });
  };

  const joinDiscord = () => {
    window.open('https://discord.gg/Ew8kkNH8ny', '_blank');
    
    toast.success('Opening Discord - Connect with us for instant support!', {
      duration: 3000,
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/+923105163094', '_blank');
    
    toast.success('Opening WhatsApp - Chat with us directly for immediate assistance!', {
      duration: 3000,
    });
  };

  const openFiverr = () => {
    window.open('https://www.fiverr.com/neuralflow/', '_blank');
    
    toast.success('Opening Fiverr - Check out our services!', {
      duration: 3000,
    });
  };

  const openUpwork = () => {
    window.open('https://www.upwork.com/freelancers/~01d485e79288c75193', '_blank');
    
    toast.success('Opening Upwork - Connect with us for professional services!', {
      duration: 3000,
    });
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/neuralflow.cloud/', '_blank');
    
    toast.success('Opening Instagram - Follow us for updates!', {
      duration: 3000,
    });
  };

  const openEmail = () => {
    const subject = encodeURIComponent('Business Inquiry - NeuralFlow AI');
    const body = encodeURIComponent('Hello NeuralFlow AI team,\n\nI would like to discuss AI automation solutions for my business.\n\nPlease contact me to schedule a consultation.\n\nBest regards');
    
    // Try Gmail compose first, fallback to mailto
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@neuralflow.cloud&su=${subject}&body=${body}`;
    
    try {
      // Open Gmail compose in new tab
      window.open(gmailLink, '_blank');
      
      toast.success('📧 Opening Gmail - Compose email to hello@neuralflow.cloud', {
        duration: 3000,
      });
    } catch (error) {
      // Fallback to mailto if Gmail fails
      const mailtoLink = `mailto:hello@neuralflow.cloud?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_self');
      
      toast.success('📧 Opening Email Client - A new email to hello@neuralflow.cloud will be created with your default email client.', {
        duration: 3000,
      });
    }
   };

  return (
    <section ref={sectionRef} id="contact-section" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden section-transition">
      {/* Using unified background from App.tsx - no need for individual backgrounds */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16 scroll-reveal">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-6">
            Get Your Free AI Automation Consultation
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl text-accent-blue font-semibold mb-4">
            AI Automation Agency • Custom AI Solutions • Business Process Automation
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed animate-slide-in-up mb-6" style={{ animationDelay: '0.3s' }}>
            Ready to <strong>automate your business with AI</strong>? Our <strong>AI automation experts</strong> are here to help you reduce costs by 60% and increase efficiency by 300%. Let's discuss how <strong>Neural Flow AI automation services</strong> can revolutionize your operations with cutting-edge <strong>intelligent process automation</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            <div className="bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-full border border-accent-blue/30">
              <span>Free Consultation</span>
            </div>
            <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
              <span>Custom AI Solutions</span>
            </div>
            <div className="bg-accent-pink/10 text-accent-pink px-4 py-2 rounded-full border border-accent-pink/30">
              <span>24/7 Support</span>
            </div>
          </div>
          <p className="text-sm text-foreground/70">
            Choose your preferred way to connect with our <strong>AI automation specialists</strong>:
          </p>
        </div>

        {/* Quick Contact Options - Updated to 6 cards in 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-12">
          <Card className="bg-glass border-accent-blue/20 hover:border-accent-blue/50 transition-all duration-300 group scroll-reveal">
            <CardContent className="p-4 sm:p-6 text-center">
              <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-accent-blue mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">Book a Demo</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4">Schedule a personalized consultation</p>
              <Button 
                onClick={openCalendly}
                className="bg-accent-blue hover:bg-accent-blue/90 text-black w-full text-xs sm:text-sm"
              >
                Schedule Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-glass border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 group scroll-reveal">
            <CardContent className="p-4 sm:p-6 text-center">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">Join Discord</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4">Connect with our community</p>
              <Button 
                onClick={joinDiscord}
                variant="outline"
                className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10 w-full text-xs sm:text-sm"
              >
                Connect Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-glass border-green-400/20 hover:border-green-400/50 transition-all duration-300 group scroll-reveal">
            <CardContent className="p-4 sm:p-6 text-center">
              <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">WhatsApp</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4">Instant support and queries</p>
              <Button 
                onClick={openWhatsApp}
                variant="outline"
                className="border-green-400/50 text-green-400 hover:bg-green-400/10 w-full text-xs sm:text-sm"
              >
                Chat Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-glass border-green-500/20 hover:border-green-500/50 transition-all duration-300 group scroll-reveal">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="mx-auto mb-4 group-hover:scale-110 transition-transform text-green-500 flex items-center justify-center">
                <FiverrIcon />
              </div>
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">Fiverr</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4">Professional services marketplace</p>
              <Button 
                onClick={openFiverr}
                variant="outline"
                className="border-green-500/50 text-green-500 hover:bg-green-500/10 w-full text-xs sm:text-sm"
              >
                Visit Fiverr
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-glass border-green-600/20 hover:border-green-600/50 transition-all duration-300 group scroll-reveal">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="mx-auto mb-4 group-hover:scale-110 transition-transform text-green-600 flex items-center justify-center">
                <UpworkIcon />
              </div>
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">Upwork</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4">Freelance platform services</p>
              <Button 
                onClick={openUpwork}
                variant="outline"
                className="border-green-600/50 text-green-600 hover:bg-green-600/10 w-full text-xs sm:text-sm"
              >
                Visit Upwork
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-glass border-accent-pink/20 hover:border-accent-pink/50 transition-all duration-300 group scroll-reveal">
            <CardContent className="p-4 sm:p-6 text-center">
              <Mail className="h-10 w-10 sm:h-12 sm:w-12 text-accent-pink mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-2 text-sm sm:text-base">Email Us</h3>
              <p className="text-foreground/60 text-xs sm:text-sm mb-4">Detailed project discussions</p>
              <Button 
                onClick={openEmail}
                variant="outline"
                className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 w-full text-xs sm:text-sm"
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto scroll-reveal">
          <Card className="bg-glass border-white/10">
            <CardContent className="p-6 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 text-center">
                Or Send Us a Message
              </h3>
              
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className="bg-dark-purple/50 border-white/20 text-white"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="bg-dark-purple/50 border-white/20 text-white"
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company" className="text-white mb-2 block">
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      {...register('company')}
                      className="bg-dark-purple/50 border-white/20 text-white"
                      placeholder="Your company name"
                    />
                    {errors.company && (
                      <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="industry" className="text-white mb-2 block">
                      Industry *
                    </Label>
                    <Select onValueChange={(value) => setValue('industry', value)}>
                      <SelectTrigger className="bg-dark-purple/50 border-white/20 text-white">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p className="text-red-400 text-sm mt-1">{errors.industry.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="service" className="text-white mb-2 block">
                      Service Interested In *
                    </Label>
                    <Select onValueChange={(value) => setValue('service', value)}>
                      <SelectTrigger className="bg-dark-purple/50 border-white/20 text-white">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-chatbots">AI Chatbots</SelectItem>
                        <SelectItem value="voice-text-bots">Voice & Text Bots</SelectItem>
                        <SelectItem value="product-photography">AI Product Photography</SelectItem>
                        <SelectItem value="content-generation">AI Content Generation</SelectItem>
                        <SelectItem value="process-automation">Process Automation</SelectItem>
                        <SelectItem value="custom-solution">Custom AI Solution</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && (
                      <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="budget" className="text-white mb-2 block">
                      Budget Range *
                    </Label>
                    <Select onValueChange={(value) => setValue('budget', value)}>
                      <SelectTrigger className="bg-dark-purple/50 border-white/20 text-white">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under $5,000</SelectItem>
                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                        <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="over-100k">Over $100,000</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.budget && (
                      <p className="text-red-400 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">
                    Project Details *
                  </Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    className="bg-dark-purple/50 border-white/20 text-white min-h-32"
                    placeholder="Tell us about your project, goals, and how we can help..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-blue hover:bg-accent-blue/90 text-black font-bold py-3 text-lg button-3d"
                >
                  {isSubmitting ? 'Processing...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {message && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              isSuccess ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="text-sm sm:text-base">{message}</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8 lg:mt-12 scroll-reveal">
          <p className="text-foreground/60 max-w-2xl mx-auto text-sm sm:text-base">
            Join hundreds of satisfied clients who have transformed their businesses with Neural Flow. 
            We typically respond within 2 hours during business days.
          </p>
        </div>
      </div>
      
      {/* Free Order Promotion */}
      <FreeOrderSection variant="compact" showBackground={false} />
    </section>
  );
};

export default ContactSection;
