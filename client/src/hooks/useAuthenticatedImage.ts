import { useEffect, useState } from 'react';
import { API_URL, LOCALSTORAGE_USERTOKEN_KEY } from '../constants/constants';

/**
 * Fetches a private `/uploads` image with the auth token in the `Authorization`
 * header (never in the URL) and exposes it as an object URL for use in `src`.
 * The object URL is revoked automatically when the path changes or on unmount.
 *
 * @param path - The stored picture path (e.g. `/uploads/123-avatar.png`), or null/undefined.
 * @returns The object URL, or `undefined` while loading or if none/failed.
 */
export const useAuthenticatedImage = (path?: string | null): string | undefined => {
  const [objectUrl, setObjectUrl] = useState<string>();

  useEffect(() => {
    if (!path) {
      setObjectUrl(undefined);
      return;
    }

    const token = localStorage.getItem(LOCALSTORAGE_USERTOKEN_KEY);
    let active = true;
    let currentUrl: string | undefined;

    fetch(`${API_URL}${path}`, {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    })
      .then((response) => (response.ok ? response.blob() : Promise.reject(new Error('Failed to load image'))))
      .then((blob) => {
        if (!active) {
          return;
        }
        currentUrl = URL.createObjectURL(blob);
        setObjectUrl(currentUrl);
      })
      .catch(() => {
        if (active) {
          setObjectUrl(undefined);
        }
      });

    return () => {
      active = false;
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [path]);

  return objectUrl;
};
