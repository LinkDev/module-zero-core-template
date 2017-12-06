import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { ApplicationServiceProxy, ApplicationDto, PagedResultDtoOfApplicationDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'phase-form-modal',
  templateUrl: './phase-form.component.html'
})
export class PhaseFormComponent extends FormComponentBase<PhaseDto> implements OnInit, AfterViewInit {
	applicationIdList: ApplicationDto[] = null;
	baseDomainGroupIdList: DomainGroupDto[] = null;
	domainGroupIdList: DomainGroupDto[] = null;
	
    constructor(
        injector: Injector,
			private _phaseService: PhaseServiceProxy, 
		private _applicationService: ApplicationServiceProxy
, 
		private _domainGroupService: DomainGroupServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new PhaseDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.applicationId= '00000000-0000-0000-0000-000000000000';
			this.item.isActive= true;
			this.item.baseDomainGroupId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._phaseService.get(id)
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
            this._phaseService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._phaseService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}