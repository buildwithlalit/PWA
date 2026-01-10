import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth);
    private router: Router = inject(Router);
    user$: Observable<User | null> = user(this.auth);

    constructor() { }

    async loginWithGoogle(): Promise<void> {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(this.auth, provider);
            this.router.navigate(['/']); // Redirect to home on success
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await signOut(this.auth);
            this.router.navigate(['/auth/login']);
        } catch (error) {
            console.error('Logout failed', error);
        }
    }
}
