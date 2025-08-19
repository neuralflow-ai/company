import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';


interface BlogPostProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    image: string;
    keywords: string;
    slug: string;
    content: string;
  };
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <section className="relative z-10 py-8 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:text-accent-blue hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative z-10 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-glass border-white/10">
            <CardHeader className="pb-8">
              {/* Category and Meta */}
              <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                <span className="bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Article</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {post.title}
              </CardTitle>

              {/* Excerpt */}
              <p className="text-xl text-foreground/80 mt-4 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Keywords */}
              <div className="mt-6 flex flex-wrap gap-2">
                {post.keywords.split(', ').map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-white/5 text-foreground/70 px-2 py-1 rounded text-xs border border-white/10"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="prose prose-lg prose-invert max-w-none">
              {/* Featured Image */}
              <div className="aspect-video bg-gradient-to-br from-accent-blue/20 to-accent-pink/20 rounded-lg overflow-hidden mb-8">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Article Content */}
              <div 
                className="text-foreground/90 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75'
                }}
              />

              {/* Call to Action */}
              <div className="mt-12 p-6 bg-gradient-to-r from-accent-blue/10 to-accent-pink/10 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Ready to Implement AI Solutions?
                </h3>
                <p className="text-foreground/80 mb-4">
                  Transform your business with cutting-edge AI automation and intelligent systems. 
                  Our expert team can help you implement the strategies discussed in this article.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-accent-blue hover:bg-accent-blue/90 text-black">
                    Get Free Consultation
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Our Services
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;