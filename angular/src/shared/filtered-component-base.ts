import { AppComponentBase } from "shared/app-component-base";
import { Injector, OnInit, AfterViewInit } from '@angular/core';
import { PagedAndSortedListingComponentBase, PagedAndSortedRequestDto } from 'shared/paged-sorted-listing-component-base'



export enum FilterType {
    eq,
    ne,
    gt,
    ge,
    lt,
    le,
    like,
    in
}

export class FilterCriteria {
    FilterName: string;
    FilterType: FilterType;
    FilterValue: any;
}



export class FilteredResultRequestDto extends PagedAndSortedRequestDto {
    search: string;
}

export abstract class FilteredComponentBase<EntityDto> extends PagedAndSortedListingComponentBase<EntityDto>{
    req: FilteredResultRequestDto = new FilteredResultRequestDto();
    Filter(FilterCriteria: Array<FilterCriteria>) {
        this.req = new FilteredResultRequestDto();
        if (FilterCriteria !== undefined && FilterCriteria !== null && FilterCriteria.length > 0) {
            let searchItems: Array<string> = []
            FilterCriteria.forEach((element, index) => {
                if (typeof (element.FilterValue) === "string") {
                    searchItems.push(element.FilterName + ' ' + FilterType[element.FilterType] + ' "' + element.FilterValue + '"');
                }
                else if (element.FilterValue instanceof Array) {
                    searchItems.push(element.FilterName + ' ' + FilterType[element.FilterType] + ' "' + element.FilterValue.join(",") + '"');
                }
                else
                    searchItems.push(element.FilterName + ' ' + FilterType[element.FilterType] + ' ' + element.FilterValue);
            });
            this.req.search = searchItems.join(" and ");
            console.log("all " + this.req.search);
        }

        this.pageNumber = 1;
        this.refresh();

    }
    public getDataPage(page: number): void {
        this.req.maxResultCount = this.pageSize;
        this.req.skipCount = (page - 1) * this.pageSize;
        if (this.sortColumn != "") {
            this.req.sorting = this.sortColumn + " " + this.sortDirection;
        }
        this.isTableLoading = true;
        this.list(this.req, page, () => {
            this.isTableLoading = false;
        });
    }

    protected abstract list(request: FilteredResultRequestDto, pageNumber: number, finishedCallback: Function): void;
}