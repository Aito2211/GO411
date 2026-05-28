# TheStock411

A deploy-ready Next.js MVP for a stock market news and data hub.

## Features
- Market dashboard homepage
- Ticker search UI
- API route for stock quote data
- API route for market news
- API route for SEC filings
- Environment variable placeholders for private API keys

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel
1. Create a GitHub repo named `thestock411`.
2. Upload this project to the repo.
3. Go to Vercel and click **Add New Project**.
4. Import the GitHub repo.
5. Add environment variables:
   - `FINNHUB_API_KEY`
   - `FMP_API_KEY`
6. Deploy.
7. In Vercel, go to **Settings > Domains** and add your domain, such as `thestock411.com`.
8. Copy the DNS records Vercel gives you into your domain registrar.

## API Notes
The homepage currently works with safe fallback demo data if API keys are missing.
For production, use licensed APIs and official sources. Do not scrape restricted financial websites.
