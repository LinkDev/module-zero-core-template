import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { SampleServiceProxy, SampleDto, PagedResultDtoOfSampleDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'sample-form-modal',
    templateUrl: './sample-form.component.html'
})
export class SampleFormComponent extends FormComponentBase<SampleDto> implements OnInit, AfterViewInit {

    sampleForm: FormGroup = new FormGroup({
        Bio: new FormControl(),
        Name: new FormControl(),
        publishDate: new FormControl()
    });
    constructor(
        injector: Injector,
        private _sampleService: SampleServiceProxy) {
        super(injector);
    }

    ngOnInit() {
    }

    show(id?: number): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new SampleDto({
                id: 0
            });
            this.isNew = true;
        }
        else {
            this._sampleService.get(id)
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
        this.saving = true;
        Object.keys(this.sampleForm.controls).forEach(key => {
            this.sampleForm.get(key).updateValueAndValidity();
        });
        if (this.sampleForm.invalid) {
            this.saving = false;
            return;
        }
        if (this.isNew) {
            this._sampleService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._sampleService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}