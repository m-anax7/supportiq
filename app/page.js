'use client';

import { useState } from 'react';
import { autoReply } from '@/src/inbox';
import { sendLiveChatMessage } from '@/src/livechat';
import { summarizeThread } from '@/src/summarize';
import { suggestReply } from '@/src/suggest';
import { shouldEscalate } from '@/src/escalate';

const SAMPLE_TICKET =
  'Hi, I was charged twice for my subscription this month and I need a refund for the duplicate charge. Order #48291.';
const SAMPLE_CHAT = 'Are you still there? I sent my order number a few minutes ago.';
const SAMPLE_THREAD =
  'Customer: My order arrived broken.\nAgent: Sorry to hear that — can you send a photo?\nCustomer: Here it is, the mug is shattered.\nAgent: Got it, processing a replacement now.';
const SAMPLE_CONTEXT =
  'Customer is asking how to reset their password after getting a new phone. They no longer have access to the old 2FA device.';

export default function Home() {
  const [results, setResults] = useState({});

  async function callApi(key, fn, input) {
    setResults((prev) => ({ ...prev, [key]: { loading: true } }));
    try {
      const res = await fn(input);
      const data = await res.json();
      setResults((prev) => ({ ...prev, [key]: { data, loading: false } }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [key]: { error: 'Something went wrong. Please try again.', loading: false },
      }));
    }
  }

  const cards = [
    {
      key: 'inbox',
      title: 'Inbox',
      desc: 'Auto-reply to incoming support tickets.',
      icon: 'inbox',
      sample: SAMPLE_TICKET,
      action: () => callApi('inbox', autoReply, SAMPLE_TICKET),
    },
    {
      key: 'livechat',
      title: 'Live Chat',
      desc: 'Send messages in real-time conversations.',
      icon: 'chat',
      sample: SAMPLE_CHAT,
      action: () => callApi('livechat', sendLiveChatMessage, SAMPLE_CHAT),
    },
    {
      key: 'summarize',
      title: 'Summarize',
      desc: 'Condense long support threads into key points.',
      icon: 'summary',
      sample: SAMPLE_THREAD,
      action: () => callApi('summarize', summarizeThread, SAMPLE_THREAD),
    },
    {
      key: 'suggest',
      title: 'Suggest Reply',
      desc: 'Get AI-suggested responses for any context.',
      icon: 'suggest',
      sample: SAMPLE_CONTEXT,
      action: () => callApi('suggest', suggestReply, SAMPLE_CONTEXT),
    },
    {
      key: 'escalate',
      title: 'Escalate',
      desc: 'Decide whether a ticket needs human escalation.',
      icon: 'escalate',
      sample: SAMPLE_TICKET,
      action: () => callApi('escalate', shouldEscalate, SAMPLE_TICKET),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">SupportIQ</h1>
              <p className="text-xs text-slate-500">AI Customer Support Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-600">
            Five AI-powered tools to help your support team respond faster and smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.key}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <CardIcon name={card.icon} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-500">{card.desc}</p>
                </div>
              </div>

              <div className="mb-4 rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Sample input</p>
                <p className="mt-1 line-clamp-3 text-sm text-slate-600">
                  {card.sample}
                </p>
              </div>

              <button
                onClick={card.action}
                disabled={results[card.key]?.loading}
                className="mb-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {results[card.key]?.loading ? 'Processing…' : `Run ${card.title}`}
              </button>

              {results[card.key]?.loading && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
                  Contacting AI…
                </div>
              )}

              {results[card.key]?.data && (
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">AI Response</span>
                    <span className="text-xs text-slate-400">
                      Confidence: {Math.round(results[card.key].data.confidence * 100)}%
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">
                    {results[card.key].data.reply}
                  </p>
                  {card.key === 'escalate' && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        results[card.key].data.escalate
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {results[card.key].data.escalate
                        ? 'Escalation recommended'
                        : 'No escalation needed'}
                    </span>
                  )}
                </div>
              )}

              {results[card.key]?.error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {results[card.key].error}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function CardIcon({ name }) {
  const icons = {
    inbox: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.25 13.5h3.86a2.25 2.25 0 012.025 1.247l.256.512a2.25 2.25 0 002.025 1.247h3.828m-8.934 0h8.934M2.25 13.5V5.25A2.25 2.25 0 014.5 3h15a2.25 2.25 0 012.25 2.25v8.25M2.25 13.5l3.86 3.86a2.25 2.25 0 001.595.66h9.99a2.25 2.25 0 001.595-.66l3.86-3.86"
      />
    ),
    chat: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7.5 8.25h9m-9 3.75h9m-9 3.75h5.25m5.25 0H21l-3.75-3.75M21 15.75V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v9a2.25 2.25 0 002.25 2.25h6.75"
      />
    ),
    summary: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
      />
    ),
    suggest: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.813 15.904L9 18.75l-.75 2.25M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    ),
    escalate: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    ),
  };

  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {icons[name]}
    </svg>
  );
}
