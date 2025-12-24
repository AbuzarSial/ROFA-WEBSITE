# ROFA - 3D Website

A modern, immersive 3D website built with Next.js, Three.js, GSAP, Lenis, and Tailwind CSS. Inspired by antimatterai.com.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Animation library with ScrollTrigger
- **Lenis** - Smooth scrolling
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

## ✨ Features

- 🎨 **3D Background Scene** - Interactive particles, geometric shapes, and animated elements
- 🎬 **GSAP Animations** - Smooth scroll-triggered animations and micro-interactions
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎯 **Modern UI/UX** - Clean design with smooth transitions
- 🔄 **Smooth Scrolling** - Lenis-powered smooth scroll experience
- 🎭 **Interactive Elements** - 3D card effects, hover animations, and parallax
- 📝 **Contact Forms** - Validated forms with toast notifications
- 🎪 **Modals** - Project details and signup modals

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Demo_project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with smooth scroll
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── Scene3D.tsx         # Three.js 3D background scene
│   ├── SectionFollower.tsx # 3D element that follows scroll
│   ├── Hero.tsx           # Hero section with GSAP animations
│   ├── Navigation.tsx     # Navbar with mobile menu
│   ├── WorkSection.tsx    # Selected work with 3D cards
│   ├── AboutSection.tsx   # Our beliefs section
│   ├── ServicesSection.tsx # Our services section
│   ├── ContactSection.tsx # Contact form
│   ├── Footer.tsx          # Footer component
│   ├── SmoothScroll.tsx   # Lenis smooth scroll wrapper
│   ├── ScrollIndicator.tsx # Scroll progress indicator
│   ├── ProgressBar.tsx    # Top progress bar
│   ├── Toast.tsx          # Toast notification system
│   └── LoadingSpinner.tsx # Loading spinner component
└── public/                # Static assets
```

## 🎨 Sections

- **Hero** - Dynamic typography with mouse parallax and interactive buttons
- **Selected Work** - 3D project cards with hover effects and detailed modals
- **Our Beliefs** - Expandable belief cards with background images
- **Our Services** - Horizontal service cards with tech stacks
- **Contact** - Contact form with validation and social links

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Scene3D
Interactive 3D background with particles, geometric shapes, and animated elements that respond to mouse movement and scroll.

### Hero
Dynamic hero section with split-word animations, gradient text effects, and three interactive buttons (View Our Work, Learn More, Sign Up).

### WorkSection
3D project cards with interactive hover effects, mouse-tracking rotation, and detailed project modals.

### Navigation
Responsive navbar that transforms into a capsule shape with blur effect on scroll. Includes mobile menu.

## 🔧 Configuration

- **Next.js Config**: `next.config.js`
- **Tailwind Config**: `tailwind.config.js`
- **TypeScript Config**: `tsconfig.json`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

ROFA AI

---

Built with ❤️ using Next.js, Three.js, and GSAP
