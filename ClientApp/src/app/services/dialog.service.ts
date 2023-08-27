import { Injectable } from "@angular/core";
import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { ConfirmationDialogComponent } from "../components/confirmation-dialog/confirmation-dialog.component";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class DialogService {

  constructor(private readonly _modalService: BsModalService) {
  }

  openConfirmationDialog(): Observable<boolean> | undefined {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Сonfirmation of the delete operation',
        message: `Are you sure that you want to permanently remove this items?`,
        yesCaption: "Delete",
        noCaption: "Cancel"
      }
    };
    const modalRef = this._modalService.show(ConfirmationDialogComponent, initialState);
    return modalRef.content?.onClose;
  }
}