import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { UserDomainServiceProxy, UserDomainDto, PagedResultDtoOfUserDomainDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { ApplicationServiceProxy, ApplicationDto, PagedResultDtoOfApplicationDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'user-domain-form-modal',
  templateUrl: './user-domain-form.component.html'
})
export class UserDomainFormComponent extends FormComponentBase<UserDomainDto> implements OnInit, AfterViewInit {
	domainIdList: DomainDto[] = null;
	applicationIdList: ApplicationDto[] = null;
	
    constructor(
        injector: Injector,
			private _userDomainService: UserDomainServiceProxy, 
		private _domainService: DomainServiceProxy
, 
		private _applicationService: ApplicationServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new UserDomainDto();
            this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.domainId= '00000000-0000-0000-0000-000000000000';
			this.item.applicationId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._userDomainService.get(id)
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
            this._userDomainService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._userDomainService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}