import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { DomainTrainingCenterServiceProxy, DomainTrainingCenterDto, PagedResultDtoOfDomainTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { TrainingCenterServiceProxy, TrainingCenterDto, PagedResultDtoOfTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'domain-training-center-form-modal',
  templateUrl: './domain-training-center-form.component.html'
})
export class DomainTrainingCenterFormComponent extends FormComponentBase<DomainTrainingCenterDto> implements OnInit, AfterViewInit {
	trainingCenterIdList: TrainingCenterDto[] = null;
	domainIdList: DomainDto[] = null;
	
    constructor(
        injector: Injector,
			private _domainTrainingCenterService: DomainTrainingCenterServiceProxy, 
		private _trainingCenterService: TrainingCenterServiceProxy
, 
		private _domainService: DomainServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new DomainTrainingCenterDto();
			this.item.trainingCenterId= '00000000-0000-0000-0000-000000000000';
			this.item.domainId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._domainTrainingCenterService.get(id)
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
            this._domainTrainingCenterService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._domainTrainingCenterService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}