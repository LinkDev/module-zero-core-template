import { Injector, ElementRef, AfterViewInit, ViewChildren, QueryList,ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormComponentBase } from '@shared/form-component-base';
export abstract class InlineFormComponentBase<EntityDto> extends FormComponentBase<EntityDto> implements AfterViewInit {

    elementRef: ElementRef;
    @ViewChild('modalContent') modalContent: ElementRef;
    @ViewChild('FormModal') modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChildren('options')
    options: QueryList<any>;


    item: EntityDto = null;
    itemTemp: EntityDto = null;
    active: boolean = false;
    saving: boolean = false;

    @Output() saveItem: EventEmitter<EntityDto> = new EventEmitter<EntityDto>();


    constructor(injector: Injector) {
        super(injector);
    }

    ngAfterViewInit() {
        this.options.changes.subscribe(() => {
            (<any>$('select')).selectpicker('refresh');
        });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }


}
