import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { RandomizedRegularDatumServiceProxy, RandomizedRegularDatumDto, PagedResultDtoOfRandomizedRegularDatumDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'randomized-regular-datum-form-modal',
  templateUrl: './randomized-regular-datum-form.component.html'
})
export class RandomizedRegularDatumFormComponent extends FormComponentBase<RandomizedRegularDatumDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _randomizedRegularDatumService: RandomizedRegularDatumServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:number): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new RandomizedRegularDatumDto();
			this.item.id=0;
            this.isNew = true;
        }
        else {
            this._randomizedRegularDatumService.get(id)
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
            this._randomizedRegularDatumService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._randomizedRegularDatumService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}