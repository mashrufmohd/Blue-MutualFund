# Financial Analysis Web Application

Real-time financial analysis dashboard for Nifty 100 companies with ML-powered insights.

## Features

- **Company Grid View**: Browse all Nifty 100 companies with search functionality
- **Detailed Analysis Dashboard**: 
  - Compounded growth metrics (3/5/10 years)
  - ML-generated Pros & Cons
  - Financial statements (P&L, Balance Sheet, Cash Flow)
  - Annual report document links
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Data**: Fetches latest financial data from API

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── analysis/
│   │   ├── CompanyCard.jsx          # Company grid item
│   │   ├── DocumentsList.jsx        # PDF document links
│   │   ├── FinancialTable.jsx       # Reusable table component
│   │   └── ProsConsSection.jsx      # ML insights display
│   ├── common/
│   │   ├── ErrorMessage.jsx         # Error display
│   │   └── Loader.jsx               # Loading spinner
│   └── layout/
│       └── Navbar.jsx               # App navigation
├── pages/
│   ├── CompanyAnalysis.jsx          # Detail view
│   └── CompanyList.jsx              # Home grid view
├── services/
│   └── api.js                       # API client
├── store/
│   ├── companySlice.js              # Redux slice
│   └── store.js                     # Redux store
├── utils/
│   ├── companies.js                 # Nifty 100 list
│   └── formatters.js                # Currency/percentage formatters
├── App.jsx                          # Main component
├── main.jsx                         # Entry point
└── index.css                        # Global styles
```

## API Configuration

The app uses a Vite proxy to avoid CORS issues:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'https://bluemutualfund.in/server/api',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

No environment variables required. API key is included in the codebase for demo purposes.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build command: `npm run build`
Output directory: `dist`

## Troubleshooting

**White screen on load**
- Check browser console for errors
- Ensure dev server is running
- Clear browser cache

**API errors**
- Restart dev server to apply proxy config
- Check network tab for failed requests
- Verify API endpoint is accessible

**Styling issues**
- Run `npm install` to ensure all dependencies are installed
- Check Tailwind CSS configuration

## License

Internal project for educational purposes.
