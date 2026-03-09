import { createContext } from 'react';
import type { ErrorsContextData } from '../types/types';

export const ErrorsContext = createContext<ErrorsContextData | undefined>(undefined);
