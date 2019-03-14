import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorDialogModalComponent } from '../error-dialog/errordialog.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    private allowedStatusCodes: number[] = [200,201,202,203,204,205,206,207,208,226];

    constructor(private modalService: NgbModal) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // clone the request to add the api authendication key to header.
        // const newRequest: HttpRequest<any> = request.clone({ headers: request.headers.set('apiKey', API_KEY)});
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                
                if (event instanceof HttpResponse) {
                    // if block to check the http allowed status code and show the error message popup
                    if (!this.allowedStatusCodes.includes(event.status)) {
                        const activeModal = this.modalService.open(ErrorDialogModalComponent, { size: 'lg', container: 'nb-layout' });
                        activeModal.componentInstance.modalContent = 'Error Occured, Please try again later';
                    }
                }
                return event;
            }),
            // catch error block to check error and show to error popup alert.
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                console.log('Error--->>>', JSON.stringify(error));
                const activeModal = this.modalService.open(ErrorDialogModalComponent, { size: 'lg', container: 'nb-layout' });
                activeModal.componentInstance.modalContent = 'Error Occured, Please try again later';
                return throwError(error);
            }));
    }
}
