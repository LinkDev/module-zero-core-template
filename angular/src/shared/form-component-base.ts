import { Injector, ElementRef, AfterViewInit, ViewChildren, QueryList, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';

export abstract class FormComponentBase<EntityDto> extends AppComponentBase implements AfterViewInit {

    elementRef: ElementRef;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modalContent') modalContent: ElementRef;
    @ViewChild('FormModal') modal: ModalDirective;
    @ViewChildren('options') options: QueryList<any>;

    item: EntityDto = null;
    active: boolean = false;
    saving: boolean = false;
    isNew: boolean = true;

    constructor(injector: Injector) {
        super(injector);
    }

    ngAfterViewInit() {
        this.options.changes.subscribe(() => {
            (<any>$('select')).selectpicker('refresh');
        });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
        $('form').find('input[type=text],textarea,select').filter(':visible:first').focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    
}
