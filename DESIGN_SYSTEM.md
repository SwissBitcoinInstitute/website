# Swiss Bitcoin Institute Design System
## Complete Style Guide for Theme Recreation

---

## 1. OVERVIEW

This is a professional, corporate website for a Swiss Bitcoin think tank. The design aesthetic is:
- **Clean and minimalist** with Swiss design influences
- **Professional and trustworthy** - targeting executives and decision-makers
- **Light mode primary** with subtle gradients and accent colors
- **Modern corporate** feel with blue gradient accents (not typical "crypto" aesthetics)

**Framework**: Next.js + Tailwind CSS + shadcn/ui components + Radix UI primitives

---

## 2. COLOR SYSTEM

### 2.1 Base Colors (HSL Format)

```css
/* Light Mode (Primary) */
--background: 0 0% 100%;              /* #FFFFFF - Pure white */
--foreground: 222.2 84% 4.9%;         /* #030712 - Near black */
--card: 0 0% 100%;                    /* #FFFFFF */
--card-foreground: 222.2 84% 4.9%;    /* #030712 */
--popover: 0 0% 100%;                 /* #FFFFFF */
--popover-foreground: 222.2 84% 4.9%; /* #030712 */

/* Primary (Dark Blue-Gray) */
--primary: 222.2 47.4% 11.2%;         /* #0f172a - Slate 900 */
--primary-foreground: 210 40% 98%;    /* #f8fafc - Slate 50 */
--primary-hover: 222.2 47.4% 15%;     /* Slightly lighter on hover */

/* Secondary (Light Gray) */
--secondary: 210 40% 96%;             /* #f1f5f9 - Slate 100 */
--secondary-foreground: 222.2 84% 4.9%;
--secondary-hover: 210 40% 90%;

/* Muted */
--muted: 210 40% 96%;                 /* #f1f5f9 */
--muted-foreground: 215.4 16.3% 46.9%; /* #64748b - Slate 500 */

/* Accent (same as secondary) */
--accent: 210 40% 96%;
--accent-foreground: 222.2 84% 4.9%;

/* Destructive (Red) */
--destructive: 0 84.2% 60.2%;         /* #ef4444 - Red 500 */
--destructive-foreground: 210 40% 98%;

/* Borders & Inputs */
--border: 214.3 31.8% 91.4%;          /* #e2e8f0 - Slate 200 */
--input: 214.3 31.8% 91.4%;
--ring: 222.2 84% 4.9%;               /* Focus ring - dark */
--radius: 0.5rem;                     /* 8px base radius */
```

### 2.2 Brand Colors

```css
/* Bitcoin Orange - Used sparingly for brand emphasis */
--bitcoin-orange: 25 95% 53%;         /* #f7931a - Exact Bitcoin orange */
--bitcoin-orange-hover: 25 95% 48%;
--bitcoin-orange-light: 25 95% 75%;

/* Swiss Blue - PRIMARY BRAND ACCENT */
--swiss-blue: 199 37% 48%;           /* #4e8ba8 - Muted corporate blue */
--swiss-blue-hover: 199 37% 43%;
--swiss-blue-light: 199 37% 73%;

/* Swiss Red - Rarely used */
--swiss-red: 0 84% 50%;               /* #d32f2f */
--swiss-red-hover: 0 84% 45%;
--swiss-red-light: 0 84% 75%;

/* Primary Brand (same as Bitcoin Orange) */
--primary-brand: 25 95% 53%;
--primary-brand-hover: 25 95% 48%;
--primary-brand-light: 25 95% 75%;
```

### 2.3 Gradient System (CRITICAL - Primary Visual Identity)

```css
/* The signature gradient - refined corporate blues */
--gradient-blue-start: #669db6;       /* Soft blue-gray */
--gradient-blue-end: #3d6d84;         /* Deep corporate blue */

/* Opacity variants for different contexts */
--gradient-blue-opacity-subtle: 0.08;  /* Very light backgrounds */
--gradient-blue-opacity-light: 0.15;
--gradient-blue-opacity-medium: 0.25;
--gradient-blue-opacity-hero: 0.03;    /* Ultra-light for hero sections */
```

**Gradient Usage CSS Classes:**

```css
/* Full gradient - for buttons, accents */
.swiss-blue-gradient {
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
}

/* Gradient text - for headings, links */
.swiss-blue-gradient-text {
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Subtle gradient for backgrounds */
.swiss-blue-gradient-subtle {
  background: linear-gradient(135deg, rgba(171, 194, 204, 0.08), rgba(78, 139, 168, 0.08));
}

/* Accent bar (used as section dividers) */
.swiss-blue-gradient-accent {
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  height: 3px;
  width: 60px;
  border-radius: 2px;
}
```

### 2.4 Gray Scale

```css
--gray-50: 0 0% 98%;   /* #fafafa */
--gray-100: 0 0% 96%;  /* #f5f5f5 */
--gray-200: 0 0% 89%;  /* #e3e3e3 */
--gray-300: 0 0% 83%;  /* #d4d4d4 */
--gray-400: 0 0% 64%;  /* #a3a3a3 */
--gray-500: 0 0% 45%;  /* #737373 */
--gray-600: 0 0% 32%;  /* #525252 */
--gray-700: 0 0% 25%;  /* #404040 */
--gray-800: 0 0% 15%;  /* #262626 */
--gray-900: 0 0% 9%;   /* #171717 */
```

### 2.5 Dark Mode (Secondary)

```css
.dark {
  --background: 222.2 84% 4.9%;       /* #030712 */
  --foreground: 210 40% 98%;          /* #f8fafc */
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --swiss-blue: 199 37% 58%;         /* Adjusted for dark mode */
  --swiss-blue-hover: 199 37% 63%;
  --bitcoin-orange: 25 95% 53%;
  --bitcoin-orange-hover: 25 95% 58%;
}
```

---

## 3. TYPOGRAPHY

### 3.1 Font Family

```css
/* Primary Font: Open Sans */
font-family: 'Open Sans', system-ui, -apple-system, sans-serif;

/* Load with weights: 300 (light), 400 (normal), 600 (semibold), 700 (bold), 800 (extrabold) */
/* Next.js Google Font import example: */
const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});
```

### 3.2 Letter Spacing

```css
--letter-spacing-tight: -0.02em;   /* For headings */
--letter-spacing-normal: -0.01em;  /* For body */
```

### 3.3 Line Heights

```css
--line-height-relaxed: 1.75;  /* Body text */
--line-height-tight: 1.25;    /* Headings */
```

### 3.4 Heading Hierarchy

```css
/* H1 - Hero headings */
h1 {
  color: hsl(0 0% 9%);                /* gray-900 */
  font-size: clamp(2rem, 5vw, 3rem);  /* 32px to 48px responsive */
  font-weight: 700;                   /* Bold */
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}

/* H2 - Section headings */
h2 {
  color: hsl(0 0% 9%);
  font-size: clamp(1.75rem, 4vw, 2.5rem);  /* 28px to 40px */
  font-weight: 600;                        /* Semibold */
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}

/* H3 - Card/subsection headings */
h3 {
  color: hsl(0 0% 9%);
  font-size: clamp(1.5rem, 3vw, 2rem);    /* 24px to 32px */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
}

/* H4 */
h4 {
  color: hsl(0 0% 9%);
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);  /* 20px to 24px */
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

/* H5 */
h5 {
  color: hsl(0 0% 15%);              /* gray-800 */
  font-size: clamp(1.125rem, 2vw, 1.25rem);  /* 18px to 20px */
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

/* H6 */
h6 {
  color: hsl(0 0% 25%);              /* gray-700 */
  font-size: clamp(1rem, 1.5vw, 1.125rem);   /* 16px to 18px */
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}
```

### 3.5 Body Text Classes

```css
/* Standard prose */
.swiss-prose {
  font-size: 1rem;            /* 16px base */
  line-height: 1.75;
  color: hsl(0 0% 25%);       /* gray-700 */
  letter-spacing: -0.01em;
}

/* Large prose - for lead paragraphs */
.swiss-prose-lg {
  font-size: 1.125rem;        /* 18px */
  line-height: 1.75;
  color: hsl(0 0% 25%);
}
```

---

## 4. SPACING & LAYOUT

### 4.1 Section Padding

```css
/* Standard section */
--section-padding-y: 4rem;      /* 64px base */
--section-padding-y-md: 5rem;   /* 80px at md breakpoint */
--section-padding-y-lg: 6rem;   /* 96px at lg breakpoint */

/* Hero section (larger) */
--hero-padding-y: 6rem;         /* 96px */
--hero-padding-y-md: 8rem;      /* 128px */
--hero-padding-y-lg: 10rem;     /* 160px */
```

### 4.2 Container

```css
--container-max-width: 80rem;   /* 1280px */

/* Container class */
.swiss-grid {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;           /* 16px mobile */
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .swiss-grid {
    padding-left: 1.5rem;       /* 24px */
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .swiss-grid {
    padding-left: 2rem;         /* 32px */
    padding-right: 2rem;
  }
}
```

### 4.3 Tailwind Container Override

```javascript
// tailwind.config.ts
container: {
  center: true,
  padding: '2rem',
  screens: {
    '2xl': '1400px'
  }
}
```

---

## 5. SHADOWS & EFFECTS

### 5.1 Shadow Scale

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Special: Gradient glow for blue accent elements */
--shadow-gradient-glow: 0 0 20px rgba(78, 139, 168, 0.15);
--shadow-gradient-glow-hover: 0 0 30px rgba(78, 139, 168, 0.25);
```

### 5.2 Transitions

```css
--transition-base: 200ms ease-in-out;
--transition-smooth: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;

/* Utility classes */
.transition-base { transition: all 200ms ease-in-out; }
.transition-smooth { transition: all 300ms ease-in-out; }
.transition-slow { transition: all 500ms ease-in-out; }
```

### 5.3 Hover Effects

```css
/* Scale on hover (used for buttons, logo) */
--hover-scale: 1.05;
--hover-scale-subtle: 1.02;

.btn-hover-scale {
  transition: transform 300ms ease-in-out;
}
.btn-hover-scale:hover {
  transform: scale(1.05);
}

.btn-hover-scale-subtle:hover {
  transform: scale(1.02);
}
```

---

## 6. BORDER RADIUS

```css
--radius: 0.5rem;                      /* 8px - base */
border-radius-lg: 0.5rem;              /* 8px */
border-radius-md: calc(0.5rem - 2px);  /* 6px */
border-radius-sm: calc(0.5rem - 4px);  /* 4px */

/* Special cases */
rounded-full: 9999px;                  /* Pills, badges */
rounded-2xl: 1rem;                     /* 16px - cards */
```

---

## 7. COMPONENT STYLES

### 7.1 Buttons

**Primary Button (CTA - Blue Gradient)**
```css
.btn-primary {
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  color: white;
  font-weight: 500;
  padding: 0.75rem 2rem;        /* h-11 px-8 for lg size */
  border-radius: 0.375rem;      /* rounded-md */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 300ms ease-in-out;
}
.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: white;
  color: hsl(0 0% 9%);          /* gray-900 */
  font-weight: 500;
  border: 2px solid hsl(0 0% 89%);  /* gray-200 */
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  transition: all 300ms ease-in-out;
}
.btn-secondary:hover {
  background: hsl(0 0% 98%);    /* gray-50 */
  border-color: hsl(0 0% 83%);  /* gray-300 */
  transform: scale(1.05);
}
```

**Outline Button**
```css
.btn-outline {
  background: transparent;
  color: hsl(0 0% 9%);
  border: 2px solid hsl(0 0% 9%);
  transition: all 300ms ease-in-out;
}
.btn-outline:hover {
  background: hsl(0 0% 9%);
  color: white;
}
```

**Button Sizes**
```css
/* Small */
height: 2.25rem;    /* h-9 / 36px */
padding: 0 0.75rem; /* px-3 */
border-radius: 0.375rem;

/* Default */
height: 2.5rem;     /* h-10 / 40px */
padding: 0 1rem;    /* px-4 */

/* Large */
height: 2.75rem;    /* h-11 / 44px */
padding: 0 2rem;    /* px-8 */
```

### 7.2 Cards

**General Card (Services, Features)**
```css
.card-general {
  background: white;
  border-radius: 1rem;          /* rounded-2xl / 16px */
  padding: 2rem;                /* p-8 */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid hsl(0 0% 96%);  /* gray-100 */
  transition: box-shadow 300ms ease-in-out, border-color 300ms ease-in-out;
}
.card-general:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: hsla(199, 37%, 48%, 0.3);  /* swiss-blue/30 */
}
```

**Research Card (Articles)**
```css
.card-research {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid hsl(0 0% 96%);
  transition: box-shadow 300ms ease-in-out;
}
.card-research:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

**Glossary Card (Compact)**
```css
.card-glossary {
  background: white;
  border-radius: 0.75rem;       /* rounded-xl / 12px */
  padding: 1.5rem;              /* p-6 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid hsl(0 0% 89%);  /* gray-200 */
  transition: box-shadow 200ms ease-in-out, border-color 200ms ease-in-out;
}
.card-glossary:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: hsla(199, 37%, 48%, 0.3);
}
```

**Card with Gradient Hover Accent**
```css
.card-gradient-hover {
  position: relative;
  overflow: hidden;
}
.card-gradient-hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}
.card-gradient-hover:hover::before {
  opacity: 1;
}
```

### 7.3 Badges/Pills

**Hero Badge (Large, in hero sections)**
```css
.pill-hero {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;         /* py-2 px-4 */
  border-radius: 9999px;        /* rounded-full */
  background: hsla(199, 37%, 48%, 0.1);  /* swiss-blue/10 */
  font-size: 0.875rem;          /* text-sm */
  font-weight: 500;
}
/* Text inside uses gradient */
.pill-hero-text {
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Tag Badge - Blue Variant**
```css
.badge-tag-blue {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;     /* py-1 px-3 */
  border-radius: 9999px;
  background: #e6f5fd;          /* Light blue background */
  font-size: 0.75rem;           /* text-xs */
  font-weight: 500;
  border: none;
}
.badge-tag-blue:hover {
  background: #cceafb;
}
/* Text uses gradient */
.badge-tag-blue span {
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Tag Badge - Gray Variant**
```css
.badge-tag-gray {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: hsl(0 0% 96%);    /* gray-100 */
  color: hsl(0 0% 25%);         /* gray-700 */
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
}
.badge-tag-gray:hover {
  background: hsl(0 0% 89%);    /* gray-200 */
}
```

### 7.4 Inputs

```css
input, textarea, select {
  height: 2.5rem;               /* h-10 for inputs */
  width: 100%;
  border-radius: 0.375rem;      /* rounded-md */
  border: 1px solid hsl(214.3 31.8% 91.4%);  /* border color */
  background: white;
  padding: 0 0.75rem;           /* px-3 */
  font-size: 1rem;              /* text-base on mobile */
  transition: border-color 200ms, box-shadow 200ms;
}

@media (min-width: 768px) {
  input, textarea, select {
    font-size: 0.875rem;        /* text-sm on desktop */
  }
}

input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: hsl(199 37% 48%);  /* swiss-blue */
  box-shadow: 0 0 0 2px hsla(199, 37%, 48%, 0.2);
}

input::placeholder {
  color: hsl(215.4 16.3% 46.9%);  /* muted-foreground */
}
```

### 7.5 Links

**Research-style Link (Underlined)**
```css
.link-research {
  font-weight: 600;
  color: hsl(0 0% 9%);          /* gray-900 */
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: color 200ms ease-in-out;
}
.link-research:hover {
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Navigation Link**
```css
.nav-link {
  font-size: 0.875rem;          /* text-sm */
  font-weight: 600;
  color: hsl(0 0% 32%);         /* gray-600 */
  transition: color 200ms;
}
.nav-link:hover,
.nav-link.active {
  color: hsl(25 95% 53%);       /* bitcoin-orange / primary-brand */
}
```

**Footer Link**
```css
.footer-link {
  font-size: 0.875rem;
  color: hsl(0 0% 32%);
  transition: color 200ms;
}
.footer-link:hover {
  /* Gradient text on hover */
  background: linear-gradient(to right, #669db6 0%, #3d6d84 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 8. SECTION BACKGROUNDS

### 8.1 Hero Section

```css
.hero-section {
  padding-top: 6rem;
  padding-bottom: 6rem;
  background: linear-gradient(to bottom, hsl(0 0% 98%), white);
  position: relative;
  overflow: hidden;
}

/* Optional: Background image with white overlay */
.hero-bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: right top;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);  /* 80% white overlay */
}

@media (min-width: 768px) {
  .hero-section {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}
@media (min-width: 1024px) {
  .hero-section {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
}
```

### 8.2 Standard White Section

```css
.section-white {
  padding-top: 3.4rem;          /* ~85% of 4rem */
  padding-bottom: 4rem;
  background: white;
}
@media (min-width: 768px) {
  .section-white {
    padding-top: 4.25rem;
    padding-bottom: 5rem;
  }
}
@media (min-width: 1024px) {
  .section-white {
    padding-top: 5.1rem;
    padding-bottom: 6rem;
  }
}
```

### 8.3 Section with Subtle Gradient Background

```css
.section-gradient-subtle {
  position: relative;
}
.section-gradient-subtle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(171, 194, 204, 0.04), rgba(78, 139, 168, 0.04));
  opacity: 0.5;
}
```

### 8.4 Dark CTA Section

```css
.section-cta-dark {
  background: hsl(0 0% 9%);     /* gray-900 */
  color: white;
  position: relative;
  overflow: hidden;
}
/* Subtle blue gradient overlay */
.section-cta-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(171, 194, 204, 0.08),
    rgba(78, 139, 168, 0.12),
    rgba(171, 194, 204, 0.08)
  );
}
/* Headings in dark section */
.section-cta-dark h2 {
  color: white;
}
/* Body text in dark section */
.section-cta-dark p {
  color: hsl(0 0% 83%);         /* gray-300 */
}
```

---

## 9. HEADER & NAVIGATION

### 9.1 Header Structure

```css
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: hsla(0, 0%, 100%, 0.98);
  backdrop-filter: blur(24px);  /* blur-xl */
  border-bottom: 1px solid hsla(214.3, 31.8%, 91.4%, 0.6);  /* border-gray-200/60 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Supports backdrop-filter fallback */
@supports (backdrop-filter: blur(1px)) {
  header {
    background: hsla(0, 0%, 100%, 0.8);
  }
}

/* Nav container */
header nav {
  height: 5rem;                 /* h-20 / 80px */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### 9.2 Logo Area

```css
.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.logo-icon {
  width: 3rem;                  /* w-12 */
  height: 3rem;
  border-radius: 0.5rem;
  transition: transform 300ms;
}
.logo-container:hover .logo-icon {
  transform: scale(1.05);
}
.logo-text {
  font-size: 1.25rem;           /* text-xl */
  font-weight: 700;
  letter-spacing: -0.025em;     /* tracking-tight */
  color: hsl(0 0% 9%);
}
.logo-text .accent {
  color: hsl(25 95% 53%);       /* bitcoin-orange */
}
```

### 9.3 Dropdown Menu

```css
.dropdown-menu {
  position: absolute;
  top: 100%;
  margin-top: 0.5rem;
  width: 12rem;                 /* w-48 */
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid hsl(0 0% 89%);
  padding: 0.25rem 0;
  z-index: 50;
}
.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: hsl(0 0% 32%);
  transition: background 200ms;
}
.dropdown-item:hover {
  background: hsl(0 0% 98%);    /* gray-50 */
}
.dropdown-item.active {
  color: hsl(25 95% 53%);       /* bitcoin-orange */
}
```

---

## 10. FOOTER

```css
footer {
  background: white;
  border-top: 1px solid hsl(0 0% 89%);  /* gray-200 */
  padding: 4rem 0;
}

/* Footer section headers */
.footer-heading {
  font-size: 0.75rem;           /* text-xs */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;       /* tracking-wider */
  /* Gradient text */
  background: linear-gradient(to right, #abc2cc 0%, #00abfb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

/* Footer link list */
.footer-nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Copyright */
.footer-copyright {
  font-size: 0.875rem;
  color: hsl(0 0% 45%);         /* gray-500 */
  text-align: center;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid hsl(0 0% 89%);
}
```

---

## 11. SPECIAL PATTERNS

### 11.1 Section Accent Divider

A small gradient bar centered above section headings:

```css
.section-accent {
  width: 60px;
  height: 3px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(to right, #abc2cc 0%, #00abfb 100%);
  border-radius: 2px;
}
```

### 11.2 Icon Container (Feature Icons)

```css
.icon-container {
  width: 4rem;                  /* w-16 */
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;          /* rounded-2xl */
  background: linear-gradient(135deg, rgba(171, 194, 204, 0.08), rgba(0, 171, 251, 0.08));
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}
.icon-container .emoji {
  font-size: 1.875rem;          /* text-3xl */
}
```

### 11.3 Newsletter Card

```css
.newsletter-card {
  border: 2px solid hsla(210, 100%, 50%, 0.2);  /* swiss-blue/20 */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 3rem;                /* p-12 */
  text-align: center;
  background: white;
}

.newsletter-icon {
  width: 5rem;
  height: 5rem;
  margin: 0 auto 2rem;
  background: linear-gradient(to bottom right, hsla(210, 100%, 50%, 0.2), hsla(210, 100%, 50%, 0.1));
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.newsletter-icon .emoji {
  font-size: 2.25rem;           /* text-4xl */
}
```

---

## 12. RESPONSIVE BREAKPOINTS

Standard Tailwind breakpoints are used:

```css
/* Mobile first approach */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices (tablets) */
lg: 1024px   /* Large devices (laptops) */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X Extra large */
```

---

## 13. ANIMATIONS

### 13.1 Accordion Animation

```css
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
.animate-accordion-down {
  animation: accordion-down 0.2s ease-out;
}
.animate-accordion-up {
  animation: accordion-up 0.2s ease-out;
}
```

### 13.2 Tooltip Animation (via Tailwind CSS Animate plugin)

```css
/* Uses tailwindcss-animate plugin */
animate-in fade-in-0 zoom-in-95
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=closed]:zoom-out-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
```

---

## 14. DEPENDENCIES

Required packages for this design system:

```json
{
  "dependencies": {
    "tailwindcss": "^3.x",
    "tailwindcss-animate": "^1.x",
    "@radix-ui/react-slot": "^1.x",
    "@radix-ui/react-tooltip": "^1.x",
    "@radix-ui/react-separator": "^1.x",
    "class-variance-authority": "^0.7.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "lucide-react": "^0.x"
  }
}
```

### Utility function (lib/utils.ts):

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 15. KEY DESIGN PRINCIPLES

1. **Gradient as Identity**: The blue gradient (#abc2cc → #00abfb) is the primary visual identifier. Use it for:
   - Primary CTA buttons
   - Section heading accents
   - Link hover states (as gradient text)
   - Badge backgrounds
   - Card hover top borders

2. **White Space**: Generous padding and margins. Sections have significant vertical padding (64-160px).

3. **Subtle Backgrounds**: Avoid stark contrasts. Use very light gradient overlays (3-8% opacity) for visual interest.

4. **Professional Typography**: Open Sans font with tight letter spacing on headings. Font weights are 600-700 for headings, 400-500 for body.

5. **Hover States**: Cards lift (shadow increase), buttons scale slightly (1.05x), links get gradient text.

6. **Border Radius**: Cards use 16px (rounded-2xl), buttons use 6px (rounded-md), badges use full rounds (9999px).

7. **Colors**: Mostly grayscale with blue gradient accents. Bitcoin orange used only for the logo and occasional brand emphasis.

8. **Dark Sections**: The dark CTA sections use gray-900 (#171717) with subtle blue gradient overlays.

---

## 16. QUICK REFERENCE - MOST USED CLASSES

```css
/* Containers */
.swiss-grid          /* Main container with responsive padding */
.swiss-section       /* Standard section padding */
.swiss-hero          /* Hero section padding */

/* Cards */
.card-general        /* Feature/service cards */
.card-research       /* Article cards */
.card-glossary       /* Compact list cards */
.card-gradient-hover /* Add gradient top border on hover */

/* Gradients */
.swiss-blue-gradient       /* Full gradient background */
.swiss-blue-gradient-text  /* Gradient text effect */
.swiss-blue-gradient-subtle/* Very light gradient bg */
.swiss-blue-gradient-accent/* 3px gradient bar */

/* Typography */
.swiss-prose         /* Body text styling */
.swiss-prose-lg      /* Large body text */

/* Badges */
.pill-hero           /* Large hero badges */
.pill-hero-text      /* Gradient text for pills */

/* Links */
.link-research       /* Underlined link with gradient hover */

/* Buttons */
.btn-hover-scale     /* Scale animation on hover */

/* Backgrounds */
.swiss-gradient      /* Light gray to white gradient */
.cta-section-bg      /* Dark section with blue tint */
```

---

*This design system document was generated from the Swiss Bitcoin Institute website codebase. Use it to recreate the exact visual style in another application.*

