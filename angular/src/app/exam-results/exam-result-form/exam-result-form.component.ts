import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ExamResultServiceProxy, ExamResultDto, PagedResultDtoOfExamResultDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'exam-result-form-modal',
  templateUrl: './exam-result-form.component.html'
})
export class ExamResultFormComponent extends FormComponentBase<ExamResultDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _examResultService: ExamResultServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new ExamResultDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.userId= '00000000-0000-0000-0000-000000000000';
			this.item.questionnaireId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._examResultService.get(id)
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
            this._examResultService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._examResultService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}