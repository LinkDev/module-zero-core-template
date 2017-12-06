import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ApprovalRequestStepServiceProxy, ApprovalRequestStepDto, PagedResultDtoOfApprovalRequestStepDto } from '@shared/service-proxies/service-proxies';
import { ApprovalRequestServiceProxy, ApprovalRequestDto, PagedResultDtoOfApprovalRequestDto } from '@shared/service-proxies/service-proxies';
import { ApprovalStepServiceProxy, ApprovalStepDto, PagedResultDtoOfApprovalStepDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'approval-request-step-form-modal',
  templateUrl: './approval-request-step-form.component.html'
})
export class ApprovalRequestStepFormComponent extends FormComponentBase<ApprovalRequestStepDto> implements OnInit, AfterViewInit {
	approvalRequestIdList: ApprovalRequestDto[] = null;
	approvalStepIdList: ApprovalStepDto[] = null;
	
    constructor(
        injector: Injector,
			private _approvalRequestStepService: ApprovalRequestStepServiceProxy, 
		private _approvalRequestService: ApprovalRequestServiceProxy
, 
		private _approvalStepService: ApprovalStepServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new ApprovalRequestStepDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.approvalRequestId= '00000000-0000-0000-0000-000000000000';
			this.item.approvalStepId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._approvalRequestStepService.get(id)
                .subscribe(
                (result) => {
                    this.item = result;
                    this.active = true;
                    this.modal.show();
                });
            this.isNew = false;
        }
    }

	save(): void {
        console.log(this.item);
        this.saving = true;

        if (this.isNew) {
            this._approvalRequestStepService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._approvalRequestStepService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}