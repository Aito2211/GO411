import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const key = process.env.FINNHUB_API_KEY;

  if (!key) {
    return NextResponse.json({
      demo: true,
      results: [
        { symbol: 'AAPL', description: 'Apple Inc.' },
        { symbol: 'NVDA', description: 'NVIDIA Corp.' },
        { symbol: 'TSLA', description: 'Tesla Inc.' }
      ].filter((item) => item.symbol.includes(q.toUpperCase()) || item.description.toLowerCase().includes(q.toLowerCase()))
    });
  }

  const res = await fetch(`https://finnhub.io/api/v1/search?q=${encodeURIComponent(q)}&token=${key}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) return NextResponse.json({ error: 'Unable to search tickers' }, { status: 500 });
  const data = await res.json();
  return NextResponse.json({ results: data.result?.slice(0, 20) || [] });
}
