import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'domain-form-modal',
  templateUrl: './domain-form.component.html'
})
export class DomainFormComponent extends FormComponentBase<DomainDto> implements OnInit, AfterViewInit {
	parentDomainIdList: DomainDto[] = null;
	domainGroupIdList: DomainGroupDto[] = null;
	
    constructor(
        injector: Injector,
			private _domainService: DomainServiceProxy, 
		private _domainGroupService: DomainGroupServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {
        this._domainGroupService.getAll().subscribe((data: PagedResultDtoOfDomainGroupDto) => {
            this.domainGroupIdList = data.items;
        });
    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new DomainDto({
				domainId: '00000000-0000-0000-0000-000000000000',
            });
            this.isNew = true;
        }
        else {
            this._domainService.get(id)
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
            this._domainService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._domainService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}