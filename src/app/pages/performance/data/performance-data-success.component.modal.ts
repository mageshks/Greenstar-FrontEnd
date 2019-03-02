import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PerformanceService } from "../performance.service";

@Component({
    selector: 'ngx-modal',
    template: `
    <div class="modal-header">
      <span>Alert</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Ok</button>
    </div>
  `,
})
export class PerformanceDataSuccessModalComponent {

    public modalContent: string;

    constructor(
        private activeModal: NgbActiveModal,
        private performanceService: PerformanceService
    ) { }

    public uploadBulkData(): void {

    }

    public closeModal(): void {
        this.activeModal.close();
    }

}