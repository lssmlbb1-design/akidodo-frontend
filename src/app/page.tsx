'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CalendarDays, MessageCircle, RefreshCw } from 'lucide-react';

type Post = {
  id: string;
  title: string;
  content: string;
  links: string[];
  created_at: string;
  updated_at: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ? '/api' : '/api';
const publicBotUsername = process.env.NEXT_PUBLIC_PUBLIC_BOT_USERNAME || '';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function PublicBoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const botHref = useMemo(() => {
    if (!publicBotUsername) return '';
    return `https://t.me/${publicBotUsername.replace('@', '')}`;
  }, []);

  const loadPosts = async () => {
    setError('');
    try {
      const response = await fetch(`${apiBase}/posts`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Не удалось загрузить новости');
      setPosts(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    const timer = window.setInterval(loadPosts, 20_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(212,168,83,0.18),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(76,175,122,0.14),transparent_30%)]">
        <div className="mx-auto flex min-h-[42vh] w-full max-w-5xl flex-col justify-end px-5 pb-10 pt-16 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-amber-300">AkiDoDo</p>
            <h1 className="font-serif text-5xl leading-none text-zinc-50 sm:text-7xl">
              Новости и заметки автора
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Публичная доска коротких сообщений, мыслей, ссылок и обновлений.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {botHref && (
              <a
                href={botHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-amber-300 px-4 text-sm font-medium text-zinc-950 transition hover:bg-amber-200"
              >
                <MessageCircle size={17} />
                Написать автору
              </a>
            )}
            <button
              onClick={loadPosts}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 px-4 text-sm text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
            >
              <RefreshCw size={16} />
              Обновить
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8">
        {loading && (
          <div className="grid gap-4">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-36 animate-pulse rounded-md border border-white/10 bg-white/[0.03]" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-5 py-10 text-center text-zinc-400">
            Пока нет опубликованных заметок.
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article key={post.id} className="rounded-md border border-white/10 bg-zinc-900/70 p-5 shadow-2xl shadow-black/10">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-serif text-2xl leading-tight text-zinc-50">{post.title}</h2>
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500">
                    <CalendarDays size={14} />
                    {formatDate(post.created_at)}
                  </span>
                </div>

                <p className="whitespace-pre-wrap text-[15px] leading-7 text-zinc-300">{post.content}</p>

                {post.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.links.map((link) => (
                      <a
                        key={link}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex max-w-full items-center gap-1 rounded-md border border-emerald-300/25 px-3 py-1.5 text-xs text-emerald-200 transition hover:bg-emerald-300/10"
                      >
                        <span className="truncate">{link}</span>
                        <ArrowUpRight size={13} className="shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
