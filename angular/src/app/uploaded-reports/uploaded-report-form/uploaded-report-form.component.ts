import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { UploadedReportServiceProxy, UploadedReportDto, PagedResultDtoOfUploadedReportDto } from '@shared/service-proxies/service-proxies';
import { ReportTypeServiceProxy, ReportTypeDto, PagedResultDtoOfReportTypeDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'uploaded-report-form-modal',
  templateUrl: './uploaded-report-form.component.html'
})
export class UploadedReportFormComponent extends FormComponentBase<UploadedReportDto> implements OnInit, AfterViewInit {
	reportTypeIdList: ReportTypeDto[] = null;
	domainIdList: DomainDto[] = null;
	phaseIdList: PhaseDto[] = null;
	
    constructor(
        injector: Injector,
			private _uploadedReportService: UploadedReportServiceProxy, 
		private _reportTypeService: ReportTypeServiceProxy
, 
		private _domainService: DomainServiceProxy
, 
		private _phaseService: PhaseServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new UploadedReportDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.reportTypeId= '00000000-0000-0000-0000-000000000000';
			this.item.phaseId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._uploadedReportService.get(id)
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
            this._uploadedReportService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._uploadedReportService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}