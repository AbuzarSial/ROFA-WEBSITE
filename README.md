# 3D Website Project

A modern, immersive 3D website built with Next.js, Three.js, GSAP, Lenis, and Tailwind CSS.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Animation library
- **Lenis** - Smooth scrolling
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with smooth scroll
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Scene3D.tsx      # Three.js 3D scene
│   ├── Hero.tsx         # Hero section with GSAP animations
│   ├── Section.tsx      # Reusable section component
│   └── SmoothScroll.tsx # Lenis smooth scroll wrapper
└── public/              # Static assets
```

## Features

- ✨ Smooth scrolling with Lenis
- 🎨 3D graphics with Three.js
- 🎬 GSAP animations
- 📱 Responsive design
- 🎯 Modern UI/UX

## Next Steps

We'll build this step by step, adding more features and refining the design based on the antimatterai.com reference.

