import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ApprovalRequestServiceProxy, ApprovalRequestDto, PagedResultDtoOfApprovalRequestDto } from '@shared/service-proxies/service-proxies';
import { ApprovalStepServiceProxy, ApprovalStepDto, PagedResultDtoOfApprovalStepDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'approval-request-form-modal',
  templateUrl: './approval-request-form.component.html'
})
export class ApprovalRequestFormComponent extends FormComponentBase<ApprovalRequestDto> implements OnInit, AfterViewInit {
	approvalStepIdList: ApprovalStepDto[] = null;
	
    constructor(
        injector: Injector,
			private _approvalRequestService: ApprovalRequestServiceProxy, 
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
            this.item = new ApprovalRequestDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.contentId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._approvalRequestService.get(id)
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
            this._approvalRequestService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._approvalRequestService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}