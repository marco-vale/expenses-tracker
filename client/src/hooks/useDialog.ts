import { useCallback, useState } from 'react';

/**
 * Custom hook to manage dialog state with optional data payload.
 *
 * @template T - The type of data associated with the dialog
 *
 * @returns An object containing:
 * - `isOpen`: Boolean indicating whether the dialog is currently open
 * - `data`: The data of type T associated with the dialog (undefined when closed)
 * - `open`: Function to open the dialog, optionally passing data of type T
 * - `close`: Function to close the dialog and clear the associated data
 *
 * @example
 * ```typescript
 * interface UserData {
 *   id: string;
 *   name: string;
 * }
 *
 * const { isOpen, data, open, close } = useDialog<UserData>();
 *
 * // Open dialog with data
 * open({ id: '1', name: 'John' });
 *
 * // Close dialog
 * close();
 * ```
 */
export const useDialog = <T>() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const open = useCallback((data?: T) => {
    setData(data);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(undefined);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
  };
};
