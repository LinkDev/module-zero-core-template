import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { TempFilteredResponseServiceProxy, TempFilteredResponseDto, PagedResultDtoOfTempFilteredResponseDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'temp-filtered-response-form-modal',
  templateUrl: './temp-filtered-response-form.component.html'
})
export class TempFilteredResponseFormComponent extends FormComponentBase<TempFilteredResponseDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _tempFilteredResponseService: TempFilteredResponseServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new TempFilteredResponseDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.rowIndex= 0;
            this.isNew = true;
        }
        else {
            this._tempFilteredResponseService.get(id)
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
            this._tempFilteredResponseService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._tempFilteredResponseService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}