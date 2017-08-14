import { Injector, ElementRef, OnInit,AfterViewInit, ViewChildren, QueryList, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedAndSortedListingComponentBase,PagedAndSortedRequestDto } from '@shared/paged-sorted-listing-component-base';
import { sortData } from 'shared/helpers/sortData';
import * as _ from "lodash";
export abstract class InlineListComponentBase<EntityDto> extends AppComponentBase implements AfterViewInit, OnInit {

    @Input()
    items?: EntityDto[] = [];

    @Input()
    sortColumn: string;
    sortDirection:string;

    @ViewChildren("options")
    options: QueryList<any>;

    ngOnInit() {

    }
    ngAfterViewInit() {
        this.options.changes.subscribe(() => {
            (<any>$("select")).selectpicker('refresh');
        });
    }
    onSaveItem(data) {
        if (this.items === undefined || this.items === null)
            this.items = [];
        this.items.push(data);
    }

    order(sort: string, event) {
        if (this.sortColumn !== sort) {
            this.sortColumn = sort;
            this.sortDirection = "asc";
        }
        else {
            this.sortDirection == "desc" ? this.sortDirection = "asc" : this.sortDirection = "desc";
        }
        this.items= _.orderBy(this.items, [sort], [this.sortDirection]);
        sortData(event.target, this.sortDirection);
    }
}
