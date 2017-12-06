import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { DomainSettingServiceProxy, DomainSettingDto, PagedResultDtoOfDomainSettingDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'domain-setting-form-modal',
  templateUrl: './domain-setting-form.component.html'
})
export class DomainSettingFormComponent extends FormComponentBase<DomainSettingDto> implements OnInit, AfterViewInit {
	domainIdList: DomainDto[] = null;
	surveyIdList: SurveyDto[] = null;
	
    constructor(
        injector: Injector,
			private _domainSettingService: DomainSettingServiceProxy, 
		private _domainService: DomainServiceProxy
, 
		private _surveyService: SurveyServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new DomainSettingDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.domainId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._domainSettingService.get(id)
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
            this._domainSettingService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._domainSettingService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}