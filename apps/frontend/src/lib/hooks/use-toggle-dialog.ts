import { useState } from 'react';

export const useToggleDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = () => setIsOpen((open) => !open);
  return [isOpen, setIsOpen, toggleDialog] as const;
};
