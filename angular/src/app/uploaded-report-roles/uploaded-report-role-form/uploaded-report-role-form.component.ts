import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { UploadedReportRoleServiceProxy, UploadedReportRoleDto, PagedResultDtoOfUploadedReportRoleDto } from '@shared/service-proxies/service-proxies';
import { UploadedReportServiceProxy, UploadedReportDto, PagedResultDtoOfUploadedReportDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'uploaded-report-role-form-modal',
  templateUrl: './uploaded-report-role-form.component.html'
})
export class UploadedReportRoleFormComponent extends FormComponentBase<UploadedReportRoleDto> implements OnInit, AfterViewInit {
	uploadedReportIdList: UploadedReportDto[] = null;
	
    constructor(
        injector: Injector,
			private _uploadedReportRoleService: UploadedReportRoleServiceProxy, 
		private _uploadedReportService: UploadedReportServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new UploadedReportRoleDto();
            this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.uploadedReportId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._uploadedReportRoleService.get(id)
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
            this._uploadedReportRoleService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._uploadedReportRoleService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}