import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemeberDetailResolver implements Resolve<User> {
    constructor(private userServive: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userServive.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retreiving data');
                this.router.navigate(['/memebers']);
                return of(null);
            })
        );
    }
}