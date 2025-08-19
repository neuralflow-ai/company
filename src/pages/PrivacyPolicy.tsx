import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck, FileText, Mail } from "lucide-react";
import NetworkBackground from '@/components/three/NetworkBackground';
import SEOHead from "@/components/SEO/SEOHead";

const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead page="privacy" />
      <div className="min-h-screen py-20 px-4 relative overflow-hidden">
        {/* 3D Background */}
        <NetworkBackground 
          nodeCount={50}
          color="#00c2ff"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-purple/80 via-transparent to-dark-purple/80"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-4">
              Privacy Policy
            </h1>
            <p className="text-foreground/60">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-accent-blue font-semibold mt-2">
              NeuralFlow AI - Professional AI Automation Services
            </p>
          </div>

          <Card className="glass-card">
            <CardContent className="p-8 space-y-8">
              <section>
                <p className="text-foreground/80 mb-6 text-lg">
                  At NeuralFlow AI, we are committed to protecting your privacy and maintaining the highest standards 
                  of data protection. This Privacy Policy outlines how we collect, use, protect, and handle your 
                  personal information in accordance with applicable data protection laws including GDPR and CCPA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-accent-blue mb-2">Personal Information</h3>
                    <p className="text-foreground/80 mb-3">
                      We collect information you provide directly to us when engaging our AI automation services:
                    </p>
                    <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                      <li>Full name, email address, phone number, and business contact details</li>
                      <li>Company name, industry, business size, and organizational structure</li>
                      <li>Project requirements, technical specifications, and business objectives</li>
                      <li>Payment information and billing details (processed securely through third-party providers)</li>
                      <li>Communication records and correspondence related to our services</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-accent-blue mb-2">Technical Information</h3>
                    <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                      <li>System architecture, existing software integrations, and technical infrastructure</li>
                      <li>Usage data from AI automation systems we develop and deploy</li>
                      <li>Performance metrics, analytics, and optimization data</li>
                      <li>Website usage data, cookies, and browsing behavior on our platforms</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-accent-blue mb-2">Service Delivery</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                    <li>Design, develop, and implement custom AI automation solutions</li>
                    <li>Provide ongoing technical support, maintenance, and system optimization</li>
                    <li>Process payments and manage billing for our professional services</li>
                    <li>Communicate project updates, deliverables, and service-related information</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-accent-blue mb-2 mt-6">Business Operations</h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                    <li>Improve our AI automation services and develop new solutions</li>
                    <li>Conduct market research and analyze industry trends</li>
                    <li>Comply with legal obligations and regulatory requirements</li>
                    <li>Protect against fraud, security threats, and unauthorized access</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing and Disclosure</h2>
                <div className="space-y-4">
                  <p className="text-foreground/80">
                    NeuralFlow AI maintains strict confidentiality standards. We do not sell, rent, or trade 
                    your personal information to third parties. Information may be shared only in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                    <li><strong>Service Providers:</strong> Trusted third-party vendors who assist in service delivery (cloud hosting, payment processing)</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                    <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our clients</li>
                    <li><strong>Consent:</strong> When you have provided explicit consent for specific sharing purposes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Security and Protection</h2>
                <div className="space-y-4">
                  <p className="text-foreground/80 mb-4">
                    We implement enterprise-grade security measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                    <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
                    <li><strong>Access Controls:</strong> Strict role-based access controls and multi-factor authentication</li>
                    <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                    <li><strong>Secure Infrastructure:</strong> Cloud hosting with SOC 2 Type II certified providers</li>
                    <li><strong>Employee Training:</strong> Regular security awareness training for all team members</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention and Deletion</h2>
                <p className="text-foreground/80 mb-4">
                  We retain your personal information only as long as necessary to fulfill the purposes outlined 
                  in this policy or as required by law. Typically:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                  <li>Project data is retained for the duration of our service agreement plus 3 years</li>
                  <li>Communication records are kept for 7 years for business and legal purposes</li>
                  <li>Marketing data is retained until you opt-out or request deletion</li>
                  <li>You may request data deletion at any time, subject to legal retention requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
                <div className="space-y-4">
                  <p className="text-foreground/80 mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                    <li><strong>Restriction:</strong> Request limitation of processing in certain circumstances</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. International Data Transfers</h2>
                <p className="text-foreground/80">
                  As a global AI automation company, we may transfer your information to countries outside your 
                  jurisdiction. We ensure appropriate safeguards are in place, including standard contractual 
                  clauses and adequacy decisions, to protect your information during international transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Updates to This Policy</h2>
                <p className="text-foreground/80">
                  We may update this Privacy Policy periodically to reflect changes in our practices or legal 
                  requirements. We will notify you of material changes via email or prominent notice on our website. 
                  Continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
                <p className="text-foreground/80 mb-4">
                  For questions about this Privacy Policy or to exercise your rights, please contact our 
                  Data Protection Officer:
                </p>
                <div className="p-6 bg-gradient-to-r from-accent-blue/10 to-accent-pink/10 rounded-lg border border-accent-blue/30">
                  <h4 className="text-lg font-semibold text-white mb-3">NeuralFlow AI - Data Protection Office</h4>
                  <div className="space-y-2">
                    <p className="text-white"><strong>Email:</strong> hello@neuralflow.cloud</p>
                    <p className="text-white"><strong>Business Inquiries:</strong> hello@neuralflow.cloud</p>
                    <p className="text-white"><strong>WhatsApp:</strong> +92 310 5163094</p>
                    <p className="text-white"><strong>Response Time:</strong> We respond to all privacy requests within 30 days</p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
