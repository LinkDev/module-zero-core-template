import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { QualityCallBackResponseServiceProxy, QualityCallBackResponseDto, PagedResultDtoOfQualityCallBackResponseDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'quality-call-back-response-form-modal',
  templateUrl: './quality-call-back-response-form.component.html'
})
export class QualityCallBackResponseFormComponent extends FormComponentBase<QualityCallBackResponseDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _qualityCallBackResponseService: QualityCallBackResponseServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:number): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new QualityCallBackResponseDto();
			this.item.id= 0;
			this.item.responseId= '00000000-0000-0000-0000-000000000000';
			this.item.surveyId= '00000000-0000-0000-0000-000000000000';
			this.item.domainId= '00000000-0000-0000-0000-000000000000';
			this.item.phaseId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._qualityCallBackResponseService.get(id)
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
            this._qualityCallBackResponseService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._qualityCallBackResponseService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}