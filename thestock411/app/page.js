'use client';

import React, { useMemo, useState } from 'react';
import { Search, TrendingUp, TrendingDown, Newspaper, CalendarDays, FileText, Star, Activity, BarChart3, Lock, Bell, LineChart } from 'lucide-react';

const marketIndexes = [
  { name: 'S&P 500', ticker: 'SPY', value: '5,342.88', change: '+0.42%', positive: true },
  { name: 'Nasdaq', ticker: 'QQQ', value: '18,921.72', change: '+0.77%', positive: true },
  { name: 'Dow Jones', ticker: 'DIA', value: '39,842.11', change: '-0.18%', positive: false },
  { name: 'VIX', ticker: 'VIX', value: '13.92', change: '-2.14%', positive: true },
];

const trendingStocks = [
  { ticker: 'NVDA', name: 'NVIDIA Corp.', price: '$1,124.40', change: '+3.82%', positive: true, volume: '62.4M' },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: '$182.63', change: '-1.41%', positive: false, volume: '91.8M' },
  { ticker: 'AAPL', name: 'Apple Inc.', price: '$191.24', change: '+0.88%', positive: true, volume: '48.2M' },
  { ticker: 'AMD', name: 'Advanced Micro Devices', price: '$164.05', change: '+2.16%', positive: true, volume: '54.7M' },
  { ticker: 'PLTR', name: 'Palantir Technologies', price: '$23.81', change: '-0.56%', positive: false, volume: '37.9M' },
];

const news = [
  { source: 'Market Feed', title: 'Tech stocks lead market higher as chip names gain momentum', ticker: 'NVDA', time: '12 min ago', tag: 'Technology' },
  { source: 'SEC Watch', title: 'New 8-K filing detected for large-cap consumer company', ticker: 'AAPL', time: '28 min ago', tag: 'Filing' },
  { source: 'Earnings Desk', title: 'Retail earnings calendar heats up as investors watch margin guidance', ticker: 'WMT', time: '44 min ago', tag: 'Earnings' },
  { source: 'Macro Brief', title: 'Treasury yields move lower ahead of inflation data', ticker: 'SPY', time: '1 hr ago', tag: 'Macro' },
];

const earnings = [
  { ticker: 'CRM', company: 'Salesforce', date: 'Today', when: 'After Close' },
  { ticker: 'COST', company: 'Costco', date: 'Tomorrow', when: 'After Close' },
  { ticker: 'DELL', company: 'Dell Technologies', date: 'This Week', when: 'After Close' },
  { ticker: 'MRVL', company: 'Marvell', date: 'This Week', when: 'After Close' },
];

const filings = [
  { ticker: 'MSFT', form: '10-Q', description: 'Quarterly report filed', time: 'Today' },
  { ticker: 'AMZN', form: '8-K', description: 'Current report filed', time: 'Today' },
  { ticker: 'META', form: '4', description: 'Insider transaction reported', time: 'Yesterday' },
];

function Card({ children, className = '' }) {
  return <div className={`rounded-3xl bg-white border border-slate-200 shadow-sm ${className}`}>{children}</div>;
}

function MiniChart() {
  return (
    <div className="h-28 w-full rounded-2xl bg-gradient-to-br from-slate-100 to-white p-4 border border-slate-200 flex items-end gap-2 overflow-hidden">
      {[35, 48, 42, 58, 54, 70, 64, 82, 76, 91, 84, 96].map((h, i) => (
        <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t-lg bg-slate-900/80" />
      ))}
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const filteredStocks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return trendingStocks;
    return trendingStocks.filter((s) => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-sm"><LineChart size={24} /></div>
            <div><div className="text-2xl font-black tracking-tight">TheStock411</div><div className="text-xs text-slate-500 -mt-1">Market news. Data. Filings. One place.</div></div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#markets">Markets</a><a href="#news">News</a><a href="#earnings">Earnings</a><a href="#filings">SEC Filings</a>
          </nav>
          <button className="rounded-2xl bg-slate-950 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-800">Join Watchlist</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="grid lg:grid-cols-[1.25fr_.75fr] gap-6 items-stretch">
          <Card className="p-8 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-slate-100" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 mb-5"><Activity size={16} /> Real-time-ready market intelligence dashboard</div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight max-w-3xl leading-tight">Your one-stop location for stock market news, data, and filings.</h1>
              <p className="text-lg text-slate-600 mt-5 max-w-2xl">Search any ticker, track market movers, read company news, monitor SEC filings, and view earnings information from one clean dashboard.</p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 max-w-2xl">
                <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ticker or company..." className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-slate-200" /></div>
                <button className="rounded-2xl bg-slate-950 text-white px-6 py-4 font-bold hover:bg-slate-800">Search</button>
              </div>
            </div>
          </Card>
          <Card className="p-6"><div className="flex items-center justify-between mb-4"><div><h2 className="text-xl font-black">Market Pulse</h2><p className="text-sm text-slate-500">Prototype chart area</p></div><BarChart3 className="text-slate-500" /></div><MiniChart /><div className="grid grid-cols-2 gap-3 mt-4">{marketIndexes.map((item) => <div key={item.ticker} className="rounded-2xl border border-slate-200 p-4"><div className="text-xs text-slate-500">{item.name}</div><div className="font-black mt-1">{item.value}</div><div className={`text-sm font-bold mt-1 ${item.positive ? 'text-emerald-600' : 'text-red-600'}`}>{item.change}</div></div>)}</div></Card>
        </section>

        <section id="markets" className="grid lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2 p-6"><div className="flex items-center justify-between mb-5"><div><h2 className="text-2xl font-black">Trending Stocks</h2><p className="text-sm text-slate-500">Top names by volume, news, and watchlist activity</p></div><Star className="text-slate-400" /></div><div className="space-y-3">{filteredStocks.map((stock) => <div key={stock.ticker} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"><div className="flex items-center gap-4"><div className="h-12 w-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black">{stock.ticker.slice(0, 2)}</div><div><div className="font-black">{stock.ticker}</div><div className="text-sm text-slate-500">{stock.name}</div></div></div><div className="text-right"><div className="font-black">{stock.price}</div><div className={`text-sm font-bold flex items-center gap-1 justify-end ${stock.positive ? 'text-emerald-600' : 'text-red-600'}`}>{stock.positive ? <TrendingUp size={15} /> : <TrendingDown size={15} />} {stock.change}</div></div><div className="hidden md:block text-right"><div className="text-xs text-slate-500">Volume</div><div className="font-bold">{stock.volume}</div></div></div>)}</div></Card>
          <Card className="p-6"><div className="flex items-center gap-3 mb-5"><Bell className="text-slate-500" /><div><h2 className="text-xl font-black">Premium Alerts</h2><p className="text-sm text-slate-500">Future monetization area</p></div></div><div className="space-y-3 text-sm text-slate-600"><div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex gap-3"><Lock size={18} /> Unusual volume alerts</div><div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex gap-3"><Lock size={18} /> SEC insider transaction alerts</div><div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex gap-3"><Lock size={18} /> Earnings surprise watchlist</div></div><button className="mt-5 w-full rounded-2xl bg-slate-950 text-white py-3 font-bold">Start Free Account</button></Card>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mt-6">
          <Card id="news" className="lg:col-span-2 p-6"><div className="flex items-center gap-3 mb-5"><Newspaper className="text-slate-500" /><div><h2 className="text-2xl font-black">Latest Market News</h2><p className="text-sm text-slate-500">Connect to licensed news APIs or RSS feeds</p></div></div><div className="space-y-4">{news.map((item, idx) => <div key={idx} className="rounded-2xl border border-slate-200 p-5 hover:bg-slate-50"><div className="flex items-center gap-2 text-xs text-slate-500 mb-2"><span className="font-bold text-slate-700">{item.source}</span><span>•</span><span>{item.time}</span><span className="rounded-full bg-slate-100 px-2 py-1">{item.tag}</span></div><h3 className="font-black text-lg">{item.title}</h3><div className="mt-2 text-sm font-bold text-slate-600">Related ticker: {item.ticker}</div></div>)}</div></Card>
          <div className="space-y-6"><Card id="earnings" className="p-6"><div className="flex items-center gap-3 mb-5"><CalendarDays className="text-slate-500" /><h2 className="text-xl font-black">Earnings Calendar</h2></div><div className="space-y-3">{earnings.map((item) => <div key={item.ticker} className="rounded-2xl border border-slate-200 p-4"><div className="flex justify-between font-black"><span>{item.ticker}</span><span>{item.date}</span></div><div className="text-sm text-slate-500 mt-1">{item.company} • {item.when}</div></div>)}</div></Card><Card id="filings" className="p-6"><div className="flex items-center gap-3 mb-5"><FileText className="text-slate-500" /><h2 className="text-xl font-black">SEC Filings</h2></div><div className="space-y-3">{filings.map((item) => <div key={`${item.ticker}-${item.form}`} className="rounded-2xl border border-slate-200 p-4"><div className="flex justify-between font-black"><span>{item.ticker}</span><span>{item.form}</span></div><div className="text-sm text-slate-500 mt-1">{item.description} • {item.time}</div></div>)}</div></Card></div>
        </section>
      </main>
    </div>
  );
}
