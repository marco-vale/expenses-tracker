import { useCallback, useState } from 'react';

export const useDialog = <T>() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const open = useCallback((data: T) => {
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
