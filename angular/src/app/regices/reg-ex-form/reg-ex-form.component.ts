import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { RegExServiceProxy, RegExDto, PagedResultDtoOfRegExDto } from '@shared/service-proxies/service-proxies';
import { RegExCategoryServiceProxy, RegExCategoryDto, PagedResultDtoOfRegExCategoryDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'reg-ex-form-modal',
  templateUrl: './reg-ex-form.component.html'
})
export class RegExFormComponent extends FormComponentBase<RegExDto> implements OnInit, AfterViewInit {
	categoryIdList: RegExCategoryDto[] = null;
	
    constructor(
        injector: Injector,
			private _regExService: RegExServiceProxy, 
		private _regExCategoryService: RegExCategoryServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new RegExDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._regExService.get(id)
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
            this._regExService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._regExService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}