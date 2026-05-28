import { NextResponse } from 'next/server';

// SEC requires a descriptive User-Agent in production.
// Replace with your business email/domain once live.
const SEC_HEADERS = { 'User-Agent': 'TheStock411 contact@thestock411.com' };

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cik = searchParams.get('cik') || '0000320193'; // Apple demo CIK

  try {
    const cleanCik = cik.toString().padStart(10, '0');
    const res = await fetch(`https://data.sec.gov/submissions/CIK${cleanCik}.json`, {
      headers: SEC_HEADERS,
      next: { revalidate: 3600 }
    });

    if (!res.ok) return NextResponse.json({ error: 'Unable to fetch SEC filings' }, { status: 500 });

    const data = await res.json();
    const recent = data?.filings?.recent || {};
    const filings = (recent.form || []).slice(0, 20).map((form, i) => ({
      form,
      filingDate: recent.filingDate?.[i],
      reportDate: recent.reportDate?.[i],
      accessionNumber: recent.accessionNumber?.[i],
      primaryDocument: recent.primaryDocument?.[i]
    }));

    return NextResponse.json({ cik: cleanCik, name: data.name, ticker: data.tickers?.[0], filings });
  } catch (error) {
    return NextResponse.json({ error: 'SEC filings request failed' }, { status: 500 });
  }
}
