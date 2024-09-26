import React from 'react';

export default function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void
): void {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler();
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, handler]);
}
