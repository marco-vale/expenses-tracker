const handleException = (ex: unknown): Error => {
  // Log the full error (stack included) server-side for diagnosis.
  console.error(ex);

  if (ex instanceof Error) {
    return new Error(`An error occurred: ${ex.message}`);
  }

  return new Error('Unknown error');
};

export default handleException;
