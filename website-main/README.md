# NeuralFlow AI - Official Website

🚀 **Modern AI Automation Solutions Website** built with React, TypeScript, and cutting-edge web technologies.

## 🌟 Live Website

**GitHub Repository**: [https://github.com/neuralflow-ai/company](https://github.com/neuralflow-ai/company)

## 📋 Project Overview

NeuralFlow AI is a comprehensive website showcasing AI automation solutions for businesses. The site features:

- **Modern Design**: Clean, professional interface with animated backgrounds
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Performance Optimized**: Fast loading with lazy loading and code splitting
- **SEO Ready**: Comprehensive SEO optimization and meta tags
- **Interactive Elements**: 3D animations and smooth transitions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives with shadcn/ui
- **3D Graphics**: Three.js with React Three Fiber
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Custom CSS animations and transitions

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── sections/       # Page sections (hero, about, services, etc.)
│   ├── three/          # 3D components and animations
│   ├── layout/         # Layout components (header, footer, etc.)
│   └── Analytics/      # Analytics and tracking components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── config/             # Configuration files
└── lib/                # Library configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/neuralflow-ai/company.git
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

### Pages
- **Home**: Hero section with animated background and key features
- **About**: Company information and team details
- **Services**: AI automation services and solutions
- **Portfolio**: Case studies and project showcases
- **Industries**: Industry-specific solutions
- **Blog**: Articles and insights about AI automation
- **Contact**: Contact form and company information
- **FAQ**: Frequently asked questions

### Key Components
- **NetworkBackground**: Animated particle network background
- **HeroSection**: Dynamic hero with call-to-action
- **ServicesGrid**: Interactive services showcase
- **TestimonialsCarousel**: Client testimonials slider
- **ContactForm**: Functional contact form with validation

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Add your environment variables here
VITE_API_URL=your_api_url
VITE_CONTACT_EMAIL=your_email
```

### Customization

1. **Colors**: Edit `tailwind.config.ts` for theme colors
2. **Content**: Update page content in respective component files
3. **SEO**: Modify meta tags in `src/config/seo.ts`
4. **Analytics**: Configure tracking in `src/components/Analytics/`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## ⚡ Performance Features

- **Code Splitting**: Lazy loading for optimal performance
- **Image Optimization**: Optimized images with proper loading
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Proper caching strategies
- **Web Vitals**: Optimized for Core Web Vitals

## 🔒 Security

- Input validation with Zod schemas
- XSS protection
- Secure headers configuration
- Environment variable protection

## 📈 SEO Optimization

- Meta tags optimization
- Open Graph tags
- Twitter Card tags
- Structured data
- Sitemap generation
- Robots.txt

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by NeuralFlow AI.

## 📞 Support

For support and questions:
- **Email**: support@neuralflow-ai.com
- **Website**: [https://neuralflow-ai.com](https://neuralflow-ai.com)
- **GitHub Issues**: [Create an issue](https://github.com/neuralflow-ai/company/issues)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- 3D graphics with [Three.js](https://threejs.org/)

---

**Made with ❤️ by the NeuralFlow AI Team**
