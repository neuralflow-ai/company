import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  getStoredEmails, 
  getEmailStats, 
  exportEmailsAsCSV, 
  clearAllEmails, 
  debugViewEmails,
  EmailEntry 
} from '../../utils/emailStorage';
import { Download, Trash2, Eye, RefreshCw, Mail, Users, Calendar } from 'lucide-react';

const EmailDashboard: React.FC = () => {
  const [emails, setEmails] = useState<EmailEntry[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    welcomePopup: 0,
    contactForm: 0,
    newsletter: 0,
    lastWeek: 0
  });

  const loadData = () => {
    const storedEmails = getStoredEmails();
    const emailStats = getEmailStats();
    setEmails(storedEmails);
    setStats(emailStats);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExport = () => {
    exportEmailsAsCSV();
  };

  const handleClear = () => {
    clearAllEmails();
    loadData();
  };

  const handleDebugView = () => {
    debugViewEmails();
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'welcome-popup':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contact-form':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'newsletter':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-dark-purple p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">📧 Email Dashboard</h1>
          <p className="text-gray-400">Manage and export collected emails from your website</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-glass border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Emails</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Contact Forms</p>
                  <p className="text-2xl font-bold text-white">{stats.contactForm}</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Welcome Popup</p>
                  <p className="text-2xl font-bold text-white">{stats.welcomePopup}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">This Week</p>
                  <p className="text-2xl font-bold text-white">{stats.lastWeek}</p>
                </div>
                <RefreshCw className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={emails.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV ({emails.length} emails)
          </Button>
          
          <Button 
            onClick={loadData}
            variant="outline"
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button 
            onClick={handleDebugView}
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <Eye className="h-4 w-4 mr-2" />
            Debug View (Console)
          </Button>

          <Button 
            onClick={handleClear}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            disabled={emails.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Email List */}
        <Card className="bg-glass border-gray-500/20">
          <CardHeader>
            <CardTitle className="text-white">Collected Emails ({emails.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {emails.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No emails collected yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Emails will appear here when users submit the welcome popup or contact form
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {emails.map((email) => (
                  <div 
                    key={email.id} 
                    className="bg-dark-purple/50 border border-gray-600/30 rounded-lg p-4 hover:border-gray-500/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-white">{email.email}</span>
                          <Badge className={getSourceBadgeColor(email.source)}>
                            {email.source.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        {email.additionalData && (
                          <div className="text-sm text-gray-400 space-y-1">
                            {email.additionalData.name && (
                              <p><span className="text-gray-500">Name:</span> {email.additionalData.name}</p>
                            )}
                            {email.additionalData.company && (
                              <p><span className="text-gray-500">Company:</span> {email.additionalData.company}</p>
                            )}
                            {email.additionalData.message && (
                              <p><span className="text-gray-500">Message:</span> {email.additionalData.message.substring(0, 100)}...</p>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {formatDate(email.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-glass border-yellow-500/20 mt-8">
          <CardContent className="p-6">
            <h3 className="text-yellow-400 font-semibold mb-3">📋 How to Access This Dashboard</h3>
            <div className="text-gray-300 space-y-2">
              <p>• Add <code className="bg-gray-800 px-2 py-1 rounded text-yellow-300">?admin=emails</code> to your URL</p>
              <p>• Example: <code className="bg-gray-800 px-2 py-1 rounded text-blue-300">http://localhost:8080/?admin=emails</code></p>
              <p>• All emails are stored locally in your browser's localStorage</p>
              <p>• Export to CSV to backup your email list</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailDashboard;