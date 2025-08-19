import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import NetworkBackground from '@/components/three/NetworkBackground';
import SEOHead from '@/components/SEO/SEOHead';

const TermsOfService = () => {
  return (
    <>
      <SEOHead page="terms" />
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
            Terms of Service
          </h1>
          <p className="text-foreground/60">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="text-accent-blue font-semibold mt-2">
            NeuralFlow AI - Professional AI Automation Services Agreement
          </p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-8 space-y-8">
            <section>
              <p className="text-foreground/80 mb-6 text-lg">
                These Terms of Service ("Agreement") govern your use of NeuralFlow AI's professional 
                AI automation services. By engaging our services, you agree to these terms and our 
                commitment to delivering exceptional AI solutions for your business.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-foreground/80 mb-4">
                By accessing, using, or contracting for NeuralFlow AI's services, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. 
                If you do not agree to these terms, please discontinue use of our services immediately.
              </p>
              <p className="text-foreground/80">
                These terms constitute a legally binding agreement between you (the "Client") and 
                NeuralFlow AI (the "Company") for all AI automation services provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Professional Service Offerings</h2>
              <div className="space-y-4">
                <p className="text-foreground/80 mb-4">
                  NeuralFlow AI provides comprehensive AI automation solutions designed to transform 
                  business operations and drive measurable results:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-accent-blue/10 p-4 rounded-lg border border-accent-blue/30">
                    <h3 className="text-lg font-semibold text-accent-blue mb-2">Core Services</h3>
                    <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
                      <li>Custom AI agent development and deployment</li>
                      <li>Intelligent Process Automation (IPA)</li>
                      <li>AI workflow optimization and integration</li>
                      <li>Enterprise AI automation systems</li>
                    </ul>
                  </div>
                  <div className="bg-accent-pink/10 p-4 rounded-lg border border-accent-pink/30">
                    <h3 className="text-lg font-semibold text-accent-pink mb-2">Specialized Solutions</h3>
                    <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
                      <li>AI chatbots and virtual assistants</li>
                      <li>Multimodal AI and voice agents</li>
                      <li>AI-powered content automation</li>
                      <li>Business intelligence and analytics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms and Billing</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500/10 to-accent-blue/10 p-6 rounded-lg border border-green-500/30">
                  <h3 className="text-xl font-semibold text-green-400 mb-3">Payment Structure</h3>
                  <div className="space-y-3">
                    <p className="text-foreground/80">
                      <strong>50% Upfront Payment:</strong> Half of the total project cost is required before 
                      project commencement to secure resources and begin development.
                    </p>
                    <p className="text-foreground/80">
                      <strong>50% Upon Completion:</strong> The remaining balance is due upon successful 
                      project delivery, testing, and client approval.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Additional Payment Terms:</h4>
                  <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                    <li>Monthly retainer services require payment in advance by the 1st of each month</li>
                    <li>All payments are due within 15 days of invoice date unless otherwise agreed</li>
                    <li>Late payments may incur a 1.5% monthly service charge</li>
                    <li>We accept bank transfers, credit cards, and approved digital payment methods</li>
                    <li>All prices are quoted in USD unless otherwise specified</li>
                    <li>Refunds are considered on a case-by-case basis within 30 days of payment</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Client Responsibilities and Obligations</h2>
              <div className="space-y-4">
                <p className="text-foreground/80 mb-4">
                  To ensure successful project delivery, clients agree to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-accent-blue mb-2">Project Collaboration</h4>
                    <ul className="list-disc list-inside text-foreground/80 space-y-2 text-sm">
                      <li>Provide accurate and complete project requirements</li>
                      <li>Designate authorized representatives for decision-making</li>
                      <li>Respond to requests for information within 48 hours</li>
                      <li>Participate in scheduled meetings and reviews</li>
                      <li>Provide timely feedback during development phases</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-accent-blue mb-2">Technical Requirements</h4>
                    <ul className="list-disc list-inside text-foreground/80 space-y-2 text-sm">
                      <li>Ensure system access and necessary permissions</li>
                      <li>Provide required data and documentation</li>
                      <li>Maintain appropriate testing environments</li>
                      <li>Comply with security and data protection protocols</li>
                      <li>Support integration and deployment activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property Rights</h2>
              <div className="space-y-4">
                <div className="bg-accent-pink/10 p-4 rounded-lg border border-accent-pink/30">
                  <h4 className="text-lg font-semibold text-accent-pink mb-2">Custom Development</h4>
                  <p className="text-foreground/80 text-sm">
                    Custom AI solutions developed specifically for your business become your intellectual 
                    property upon full payment completion, including source code and documentation.
                  </p>
                </div>
                
                <div className="bg-accent-blue/10 p-4 rounded-lg border border-accent-blue/30">
                  <h4 className="text-lg font-semibold text-accent-blue mb-2">Proprietary Technology</h4>
                  <p className="text-foreground/80 text-sm">
                    NeuralFlow AI retains ownership of proprietary frameworks, methodologies, and 
                    general-purpose tools used in service delivery. Clients receive perpetual usage rights.
                  </p>
                </div>
                
                <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                  <li>Third-party software and APIs remain subject to their respective licenses</li>
                  <li>Clients warrant they have rights to all provided data and materials</li>
                  <li>Both parties respect each other's existing intellectual property rights</li>
                  <li>Confidential information is protected under separate non-disclosure agreements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Service Level Agreements and Warranties</h2>
              <div className="space-y-4">
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-lg font-semibold text-green-400 mb-2">Performance Guarantees</h4>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
                    <li>99.9% uptime for hosted AI solutions</li>
                    <li>24/7 technical support for enterprise clients</li>
                    <li>Response time: 4 hours for critical issues, 24 hours for standard support</li>
                    <li>30-day warranty on all custom development work</li>
                  </ul>
                </div>
                
                <p className="text-foreground/80">
                  We warrant that our services will be performed with professional skill and care. 
                  Any defects or non-conformities will be corrected at no additional cost within 
                  the warranty period.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability and Indemnification</h2>
              <div className="space-y-4">
                <p className="text-foreground/80 mb-4">
                  <strong>Liability Limitation:</strong> NeuralFlow AI's total liability for any claim 
                  is limited to the amount paid for services in the 12 months preceding the claim. 
                  We are not liable for indirect, incidental, consequential, or punitive damages.
                </p>
                
                <p className="text-foreground/80 mb-4">
                  <strong>Mutual Indemnification:</strong> Each party agrees to indemnify the other 
                  against claims arising from their negligent acts, omissions, or breach of this agreement.
                </p>
                
                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                  <p className="text-yellow-400 text-sm">
                    <strong>Force Majeure:</strong> Neither party is liable for delays or failures 
                    due to circumstances beyond reasonable control, including natural disasters, 
                    government actions, or technical infrastructure failures.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Protection and Confidentiality</h2>
              <div className="space-y-4">
                <p className="text-foreground/80 mb-4">
                  We maintain strict confidentiality and data protection standards in compliance 
                  with GDPR, CCPA, and other applicable regulations:
                </p>
                <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                  <li>All client data is encrypted in transit and at rest</li>
                  <li>Access controls and audit trails for all data processing activities</li>
                  <li>Regular security assessments and compliance audits</li>
                  <li>Data processing agreements available upon request</li>
                  <li>Right to data portability and deletion upon contract termination</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Termination and Dispute Resolution</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Termination Rights</h4>
                    <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
                      <li>Either party may terminate with 30 days written notice</li>
                      <li>Immediate termination for material breach</li>
                      <li>Client pays for work completed to termination date</li>
                      <li>Data return and deletion procedures apply</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Dispute Resolution</h4>
                    <ul className="list-disc list-inside text-foreground/80 space-y-1 text-sm">
                      <li>Good faith negotiation as first step</li>
                      <li>Mediation through agreed neutral party</li>
                      <li>Binding arbitration if mediation fails</li>
                      <li>Governing law: [Jurisdiction to be specified]</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Modifications and Governing Law</h2>
              <div className="space-y-4">
                <p className="text-foreground/80 mb-4">
                  These terms may be updated periodically to reflect changes in our services or legal 
                  requirements. Material changes will be communicated with 30 days advance notice. 
                  Continued use of services constitutes acceptance of updated terms.
                </p>
                
                <p className="text-foreground/80">
                  This agreement is governed by applicable laws and regulations. Any disputes will be 
                  resolved in accordance with the dispute resolution procedures outlined above.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information and Support</h2>
              <p className="text-foreground/80 mb-4">
                For questions about these Terms of Service, billing inquiries, or technical support:
              </p>
              <div className="p-6 bg-gradient-to-r from-accent-blue/10 to-accent-pink/10 rounded-lg border border-accent-blue/30">
                <h4 className="text-lg font-semibold text-white mb-3">NeuralFlow AI - Professional Services</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-white"><strong>Business Inquiries:</strong> hello@neuralflow.cloud</p>
            <p className="text-white"><strong>Technical Support:</strong> hello@neuralflow.cloud</p>
            <p className="text-white"><strong>Billing Questions:</strong> hello@neuralflow.cloud</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white"><strong>WhatsApp:</strong> +92 310 5163094</p>
                    <p className="text-white"><strong>Response Time:</strong> 24 hours for business inquiries</p>
                    <p className="text-white"><strong>Support Hours:</strong> 24/7 for enterprise clients</p>
                  </div>
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

export default TermsOfService;
