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
    active: boolean = false;
    saving: boolean = false;
    isNew: boolean = true;

    @Output() saveItem: EventEmitter<EntityDto> = new EventEmitter<EntityDto>();
    @Input() isChild?: boolean = false;
    constructor(injector: Injector) {
        super(injector);
    }

    ngAfterViewInit() {
        this.options.changes.subscribe(() => {
            (<any>$('select')).selectpicker('refresh');
        });
    }

    bindData(data: EntityDto): void {
        this.item = data;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

}
