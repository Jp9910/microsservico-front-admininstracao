import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rotasGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UsuarioService);
    const router = inject(Router);

    if (userService.estaLogado()) {
        console.log("pode acessar");
        return true;
    } else {
        console.log("não pode acessar");
        router.navigate(['/login']);
        return false;
    }
};
