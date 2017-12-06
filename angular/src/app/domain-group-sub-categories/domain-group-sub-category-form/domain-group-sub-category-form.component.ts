import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { DomainGroupSubCategoryServiceProxy, DomainGroupSubCategoryDto, PagedResultDtoOfDomainGroupSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupCategoryServiceProxy, DomainGroupCategoryDto, PagedResultDtoOfDomainGroupCategoryDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'domain-group-sub-category-form-modal',
  templateUrl: './domain-group-sub-category-form.component.html'
})
export class DomainGroupSubCategoryFormComponent extends FormComponentBase<DomainGroupSubCategoryDto> implements OnInit, AfterViewInit {
	domainGroupCategoryIdList: DomainGroupCategoryDto[] = null;
	
    constructor(
        injector: Injector,
			private _domainGroupSubCategoryService: DomainGroupSubCategoryServiceProxy, 
		private _domainGroupCategoryService: DomainGroupCategoryServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new DomainGroupSubCategoryDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.domainGroupCategoryId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._domainGroupSubCategoryService.get(id)
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
            this._domainGroupSubCategoryService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._domainGroupSubCategoryService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}