import { AppComponentBase } from "shared/app-component-base";
import { Injector, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base'

export class PagedAndSortedRequestDto extends PagedRequestDto {
    sorting: string;
}

export abstract class PagedAndSortedListingComponentBase<EntityDto> extends PagedListingComponentBase<EntityDto> {
    private sortColumn: string = "";
    private sortDirection: string = "ASC";

    order(sort: string) {
        this.sortDirection == "ASC" ? this.sortDirection = "DESC" : this.sortDirection = "ASC";
        this.sortColumn = sort ;
        this.refresh();
    }

    public getDataPage(page: number): void {
        var req = new PagedAndSortedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;
        req.sorting = this.sortColumn + "," + this.sortDirection;;
        this.isTableLoading = true;
        this.list(req, page, () => {
            this.isTableLoading = false;
        });
    }

    protected abstract list(request: PagedAndSortedRequestDto, pageNumber: number, finishedCallback: Function): void;
}