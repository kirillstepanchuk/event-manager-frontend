export const getCookie = (cookie: string): string | null => {
  const cookies = document.cookie.split('; ');
  if (cookies) {
    const cookieValue = cookies.find((row) => row.startsWith(cookie))?.split('=')[1];
    return cookieValue!;
  }
  return null;
};

export const setCookie = (name: string, value?: number | string): void => {
  document.cookie = `${name}${value}; path=/`;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}; max-age=${-1}`;
};
