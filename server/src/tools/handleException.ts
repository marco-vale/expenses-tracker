export const handleException = (ex: unknown): Error => {
  if (ex instanceof Error) {
    return new Error(`An error occurred: ${ex.message}`);
  }

  return new Error('Unknown error');
};
