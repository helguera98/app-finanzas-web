# Finance App - Premium Fintech Dashboard

A professional, high-fidelity financial management application built with a premium **Obsidian Gold** aesthetic. Designed for users who value both functionality and high-end visual design.

## 🚀 Project Status
- **Current Phase**: Frontend Base Completed.
- **Completed Views**: Onboarding/Landing, Authentication (Login/Register), Dashboard (Summary), Bills Management, Debt/Loans Management, Insights/Analytics, and Category Selection.
- **Next Steps**: Integration with FastAPI Backend, JWT Authentication, and Persistent Data Storage.

## 🛠 Tech Stack
- **Framework**: [Svelte 4](https://svelte.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Material Symbols Outlined](https://fonts.google.com/icons)
- **Deployment**: Prepared for Vercel / Netlify.

## 🎨 Design System: "Obsidian Gold"
To maintain the premium look in future updates, follow these strict design rules:

### Color Palette
- **Background (Dark)**: `#0A0A0F` (Deep obsidian)
- **Primary (Gold)**: `#D4AF37` (Main accent)
- **Gold Gradient**: `linear-gradient(45deg, #996515, #D4AF37, #F9E2AF, #D4AF37)`
- **Card Surface**: `#161625` (Subtle elevation)
- **Borders**: `#232338` (Low contrast separators)
- **Accent Mint**: `#00FFA3` (For positive trends/income)
- **Accent Red**: `#FF4D4D` (For negative trends/expenses)

### Typography & Structure
- **Font**: Inter / Public Sans (Sans-serif display)
- **Border Radius**: 
  - Buttons/Inputs: `9999px` (Full rounded)
  - Cards: `1.5rem` to `2rem`
- **Glassmorphism**: Use `backdrop-blur-md` and semi-transparent backgrounds (`/80` or `/50`) for headers and floating elements.

## 📂 Project Structure
- `src/lib/components/`: Reusable UI elements (Navigation, Cards).
- `src/lib/pages/`: Main application views/routes.
- `src/app.css`: Global theme variables and base reset styles.
- `src/App.svelte`: Main routing and application state controller.

## ⚙️ Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---
*This README serves as the AI Memory for future development sessions. Always refer to the Obsidian Gold palette when creating new UI components.*
