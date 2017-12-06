import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { SimilarityPercentageServiceProxy, SimilarityPercentageDto, PagedResultDtoOfSimilarityPercentageDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'similarity-percentage-form-modal',
  templateUrl: './similarity-percentage-form.component.html'
})
export class SimilarityPercentageFormComponent extends FormComponentBase<SimilarityPercentageDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _similarityPercentageService: SimilarityPercentageServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new SimilarityPercentageDto();
			this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.surveyId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._similarityPercentageService.get(id)
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
            this._similarityPercentageService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._similarityPercentageService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}