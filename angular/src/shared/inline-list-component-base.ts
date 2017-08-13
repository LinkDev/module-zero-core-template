import { Injector, ElementRef, AfterViewInit, ViewChildren, QueryList, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormComponentBase } from '@shared/form-component-base';
import { PagedAndSortedListingComponentBase,PagedAndSortedRequestDto } from '@shared/paged-sorted-listing-component-base';

export abstract class InlineListComponentBase<EntityDto> extends PagedAndSortedListingComponentBase<EntityDto> implements AfterViewInit {

    @Input()
    items?: EntityDto[] = [];

    @Input()
    isChild?: boolean = false;
    @Output() saveItems: EventEmitter<EntityDto[]> = new EventEmitter<EntityDto[]>();

    onSaveItem(data) {
        if (this.items === undefined || this.items === null)
            this.items = [];
        this.items.push(data);
        this.saveItems.emit(this.items);
    }

}
