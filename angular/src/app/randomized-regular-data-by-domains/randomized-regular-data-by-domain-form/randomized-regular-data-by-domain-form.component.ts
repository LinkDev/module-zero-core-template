import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { RandomizedRegularDataByDomainServiceProxy, RandomizedRegularDataByDomainDto, PagedResultDtoOfRandomizedRegularDataByDomainDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'randomized-regular-data-by-domain-form-modal',
  templateUrl: './randomized-regular-data-by-domain-form.component.html'
})
export class RandomizedRegularDataByDomainFormComponent extends FormComponentBase<RandomizedRegularDataByDomainDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _randomizedRegularDataByDomainService: RandomizedRegularDataByDomainServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new RandomizedRegularDataByDomainDto();
            this.item.id='00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._randomizedRegularDataByDomainService.get(id)
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
            this._randomizedRegularDataByDomainService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._randomizedRegularDataByDomainService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}