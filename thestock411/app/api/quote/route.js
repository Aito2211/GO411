import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = (searchParams.get('symbol') || 'AAPL').toUpperCase();
  const key = process.env.FINNHUB_API_KEY;

  if (!key) {
    return NextResponse.json({
      symbol,
      demo: true,
      price: 191.24,
      change: 1.68,
      percentChange: 0.88,
      message: 'Demo quote. Add FINNHUB_API_KEY to use live data.'
    });
  }

  const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Unable to fetch quote' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json({
    symbol,
    price: data.c,
    change: data.d,
    percentChange: data.dp,
    high: data.h,
    low: data.l,
    open: data.o,
    previousClose: data.pc
  });
}
