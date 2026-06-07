import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AkiDoDo - Новости автора',
  description: 'Публичная доска заметок и новостей, опубликованных через Telegram.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
