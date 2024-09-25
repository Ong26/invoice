'use client';

import { usePathname as usePath } from 'next/navigation';

export const usePathName = () => {
  const pathname = usePath();
  const mode = pathname.split('/')[pathname.split('/').length - 1];
  const isEdit = mode === 'edit';
  const isCreate = mode === 'create';
  const isView = mode === 'view';
  const cMode = mode.charAt(0).toUpperCase() + mode.slice(1);
  return { pathname, isEdit, isCreate, isView, mode: cMode };
};
