import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = (searchParams.get('symbol') || '').toUpperCase();
  const key = process.env.FINNHUB_API_KEY;

  if (!key) {
    return NextResponse.json({
      demo: true,
      articles: [
        { headline: 'Demo market news article', source: 'TheStock411 Demo', url: '#', datetime: Date.now() / 1000, related: symbol || 'MARKET' }
      ],
      message: 'Demo news. Add FINNHUB_API_KEY to use live data.'
    });
  }

  const endpoint = symbol
    ? `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2026-01-01&to=2026-12-31&token=${key}`
    : `https://finnhub.io/api/v1/news?category=general&token=${key}`;

  const res = await fetch(endpoint, { next: { revalidate: 300 } });
  if (!res.ok) return NextResponse.json({ error: 'Unable to fetch news' }, { status: 500 });

  const articles = await res.json();
  return NextResponse.json({ articles: articles.slice(0, 20) });
}
