'use client';

interface ErrorProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorProps) {
  return (
    <div style={{ padding: '2rem', color: 'red' }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}
