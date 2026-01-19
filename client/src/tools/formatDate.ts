export const formatDate = (dateString: string): string => {
  return new Date(dateString).toISOString().slice(0, 16).replace('T', ' ');
};
