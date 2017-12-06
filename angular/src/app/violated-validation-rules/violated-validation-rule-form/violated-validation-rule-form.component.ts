import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { ViolatedValidationRuleServiceProxy, ViolatedValidationRuleDto, PagedResultDtoOfViolatedValidationRuleDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'violated-validation-rule-form-modal',
  templateUrl: './violated-validation-rule-form.component.html'
})
export class ViolatedValidationRuleFormComponent extends FormComponentBase<ViolatedValidationRuleDto> implements OnInit, AfterViewInit {
	
    constructor(
        injector: Injector,
			private _violatedValidationRuleService: ViolatedValidationRuleServiceProxy    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new ViolatedValidationRuleDto();
            this.item.id='00000000-0000-0000-0000-000000000000';
			this.item.responseAnswerId= '00000000-0000-0000-0000-000000000000';
			this.item.validationRuleId= '00000000-0000-0000-0000-000000000000';
			this.item.responseId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._violatedValidationRuleService.get(id)
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
            this._violatedValidationRuleService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._violatedValidationRuleService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}