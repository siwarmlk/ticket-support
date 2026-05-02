import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'support_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const url = req.url;
  const isPublic =
    url.includes('/api/public/') || url.includes('/api/auth/login');

  if (!token || isPublic) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
