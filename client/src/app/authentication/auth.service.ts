import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, throwError, Subscription, iif } from 'rxjs';
import { tap, catchError, concatMap, shareReplay, take, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  refreshSub: Subscription;

  auth0Client$: Observable<Auth0Client> = from(
    createAuth0Client({
     domain: environment.AUTH_DOMAIN,
     client_id: environment.AUTH_CLIENT_ID,
     redirect_uri: environment.BASE_URL,
     audience: environment.AUTH_API_DOMAIN
   })).pipe(shareReplay(1), catchError(err => throwError(err)));

  isAuthenticated$ = this.auth0Client$.pipe(concatMap((client: Auth0Client) =>
    from(client.isAuthenticated())),
    tap(res => this.loggedIn = res));

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback())));

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  loggedIn: boolean = null;

  constructor(public router: Router) {
    this.localAuthSetup();
    this.handleAuthCallback();
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(concatMap((client: Auth0Client) =>
      from(client.getTokenSilently(options))));
  }

  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/'): Observable<void> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) =>
        client.loginWithRedirect({
        redirect_uri: environment.BASE_URL,
        appState: { target: redirectPath }
      })));
  }

  handleAuthCallback(): Observable<{ loggedIn: boolean; targetUrl: string }> {
    return of(window.location.search).pipe(concatMap(params =>
      iif(
        () => params.includes('code=') && params.includes('state='),
        this.handleRedirectCallback$.pipe(concatMap(redirectResult =>
          this.isAuthenticated$.pipe(take(1), map(loggedIn => {
            let targetUrl;
            if (redirectResult.appState && redirectResult.appState.target) {
              targetUrl = redirectResult.appState.target;
            } else {
              targetUrl = '/';
            }
            return { loggedIn, targetUrl };
          }))
        )),
        this.isAuthenticated$.pipe(take(1), map(loggedIn =>
          ({ loggedIn, targetUrl: null }),
        )),
      )
    ));
  }

  logout() {
   this.auth0Client$.subscribe((client: Auth0Client) => {
     client.logout({
       client_id: environment.AUTH_CLIENT_ID,
       returnTo: environment.BASE_URL
    });
  });
 }
}
