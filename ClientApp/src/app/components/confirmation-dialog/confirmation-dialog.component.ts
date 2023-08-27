import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  private _onClose$: Subject<boolean>;

  title: string = "";
  message: string = "";
  yesCaption: string = "Ok";
  noCaption: string = "Cancel";

  constructor(public modalRef: BsModalRef) {
    this._onClose$ = new Subject<boolean>();
  }

  get onClose(): Observable<boolean> {
    return this._onClose$.asObservable();
  }

  confirm(): void {
    this._onClose$.next(true);
    this.modalRef?.hide();
  }
 
  decline(): void {
    this._onClose$.next(false);
    this.modalRef?.hide();
  }
}
