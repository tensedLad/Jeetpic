# Jeetpic Website Clone

A high-fidelity, pixel-perfect clone of the Jeetpic marketing website, built using **React (Vite)** and **Tailwind CSS**.

## 🚀 Project Overview

This project replicates the design and functionality of the Jeetpic brand website. It features a modern, responsive user interface with custom styling, smooth navigation, and interactive elements. The design focuses on brand consistency, visual appeal, and user experience.

## ✨ Features

- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop devices.
- **Modern UI/UX**: Clean aesthetic with brand-specific colors (Red: `#B91C1C` / `#EF4444`, Blue: `#1E3A8A` / `#2563EB`).
- **Functional Components**:
  - **Hero Section**: Engaging main section with call-to-action buttons.
  - **Promise Section**: Feature highlights with custom icons.
  - **Comparison Table**: Styled data presentation comparing brand benefits.
  - **Trust Section**: Trust indicators with icons and high-contrast styling.
  - **Partner Form**: Functional-looking enquiry form with validation styles.
  - **Footer**: Comprehensive footer with social links and navigation.
- **Smooth Navigation**: One-page navigation with smooth scrolling to sections (`#home`, `#why-jeetpic`, `#distributor-enquiry`, `#contact`).

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (powered by [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: JavaScript (JSX)

## 📦 Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd JP
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:5173/` (or the port shown in your terminal).

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist` folder, ready for deployment.

## 📁 Project Structure

```
d:/JP/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images (jeetpic.png) and branding
│   ├── components/      # React components (Header, Hero, Footer, etc.)
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles & Tailwind directives
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## 🎨 Customizations

- **Colors**: Custom primary colors are configured in the Tailwind theme extension.
- **Fonts**: Uses a clean sans-serif system font stack for readability.
- **Images**: Product images are located in `src/assets`.

---

© 2025 Jeetpic Clone Project. All rights reserved.
