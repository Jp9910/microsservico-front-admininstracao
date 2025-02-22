import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    if (!req.url.includes(environment.urlApiUsuarios) || req.url.includes("/auth/login")) {
        return next(req);
    }

    console.log("auth interceptor");
    // Inject the current `TokenService` and use it to get an authentication token:
    const authToken = inject(TokenService).getToken();

    // Clone the request to add the authentication header.
    const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer '+authToken)
    });
    console.log("new req:",newReq);
    return next(newReq);
};
