import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NetworkBackground from '@/components/three/NetworkBackground';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <Helmet>
        <title>Blog Post - NeuralFlow AI</title>
        <meta name="description" content="Read our latest blog post about AI and technology." />
      </Helmet>
      
      <div className="min-h-screen relative overflow-hidden text-white py-20">
        <NetworkBackground 
          nodeCount={50}
          color="#00c2ff"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-purple/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Blog Post: {slug}</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-6">
                This is a placeholder for the blog post with slug: {slug}
              </p>
              <p className="text-gray-300">
                Blog functionality is coming soon. Stay tuned for insights about AI, 
                machine learning, and the latest developments in neural networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;