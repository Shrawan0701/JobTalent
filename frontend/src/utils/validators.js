export const isValidWebsite = (url) => {
  if (!url) return false;

  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return (
      parsed.protocol === 'http:' ||
      parsed.protocol === 'https:'
    ) && parsed.hostname.includes('.');
  } catch {
    return false;
  }
};

export const isValidLinkedInCompany = (url) => {
  if (!url) return false;

  return /^https?:\/\/(www\.)?linkedin\.com\/company\/[a-zA-Z0-9\-]+\/?$/.test(
    url.trim()
  );
};

export const isValidEmailDomain = (email, website) => {
  if (!email || !website) return false;

  try {
    const emailDomain = email.split('@')[1];
    const siteDomain = new URL(
      website.startsWith('http') ? website : `https://${website}`
    ).hostname.replace('www.', '');

    return emailDomain.includes(siteDomain);
  } catch {
    return false;
  }
};
