import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { EncodingResponseServiceProxy, EncodingResponseDto, PagedResultDtoOfEncodingResponseDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'encoding-response-form-modal',
  templateUrl: './encoding-response-form.component.html'
})
export class EncodingResponseFormComponent extends FormComponentBase<EncodingResponseDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _encodingResponseService: EncodingResponseServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new EncodingResponseDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.surveyId= '00000000-0000-0000-0000-000000000000';
			this.item.domainId= '00000000-0000-0000-0000-000000000000';
			this.item.index= 0;
            this.isNew = true;
        }
        else {
            this._encodingResponseService.get(id)
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
            this._encodingResponseService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._encodingResponseService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}