import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { EncodingMapperQuestionServiceProxy, EncodingMapperQuestionDto, PagedResultDtoOfEncodingMapperQuestionDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'encoding-mapper-question-form-modal',
  templateUrl: './encoding-mapper-question-form.component.html'
})
export class EncodingMapperQuestionFormComponent extends FormComponentBase<EncodingMapperQuestionDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _encodingMapperQuestionService: EncodingMapperQuestionServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:number): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new EncodingMapperQuestionDto();
			this.item.id= 0;
			this.item.collectorQuestionId= '00000000-0000-0000-0000-000000000000';
			this.item.encoderQuestionId= '00000000-0000-0000-0000-000000000000';
			this.item.reviewerQuestionId= '00000000-0000-0000-0000-000000000000';
			this.item.collectorDetailsQuestionId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._encodingMapperQuestionService.get(id)
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
            this._encodingMapperQuestionService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._encodingMapperQuestionService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}