import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupSubCategoryServiceProxy, DomainGroupSubCategoryDto, PagedResultDtoOfDomainGroupSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'domain-group-form-modal',
  templateUrl: './domain-group-form.component.html'
})
export class DomainGroupFormComponent extends FormComponentBase<DomainGroupDto> implements OnInit, AfterViewInit {
	subCategoryIdList: DomainGroupSubCategoryDto[] = null;
	
    constructor(
        injector: Injector,
			private _domainGroupService: DomainGroupServiceProxy, 
		private _domainGroupSubCategoryService: DomainGroupSubCategoryServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new DomainGroupDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.isActive= true;
            this.isNew = true;
        }
        else {
            this._domainGroupService.get(id)
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
            this._domainGroupService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._domainGroupService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}