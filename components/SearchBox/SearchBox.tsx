import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    onSearch(newQuery.trim());
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search notes..."
      aria-label="Search notes"
    />
  );
}
