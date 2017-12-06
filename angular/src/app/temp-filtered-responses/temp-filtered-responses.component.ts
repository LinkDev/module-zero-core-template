import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TempFilteredResponseServiceProxy, TempFilteredResponseDto, PagedResultDtoOfTempFilteredResponseDto } from '@shared/service-proxies/service-proxies';
import { TempFilteredResponseFormComponent } from "app/temp-filtered-responses/temp-filtered-response-form/temp-filtered-response-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'temp-filtered-response',
    templateUrl: './temp-filtered-responses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TempFilteredResponseServiceProxy,
	]
})
export class TempFilteredResponsesComponent extends FilteredComponentBase<TempFilteredResponseDto> {
	items: TempFilteredResponseDto[] = [];

    @ViewChild('tempFilteredResponseFormModal') tempFilteredResponseFormModal: TempFilteredResponseFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			parentResponseIdFilter: string;
			codeFilter: string;
			rowIndexFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _tempFilteredResponseService: TempFilteredResponseServiceProxy
    ) {

        super(injector);
    }

    
	ngOnInit() {

		this.activatedRoute.queryParams.subscribe((params: Params) => {
            let key = params['key'];
            let value = params['value'];
            this[key + "Filter"] = value;
            this.search();
        });

        super.ngOnInit();
    }


    protected list(request: FilteredResultRequestDto, pageNumber: number, finishedCallback: Function): void {
			this._tempFilteredResponseService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTempFilteredResponseDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TempFilteredResponseDto): void {
        abp.message.confirm(
            'Delete Temp filtered response?',
            (result: boolean) => {
                if (result) {
                    this._tempFilteredResponseService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Temp filtered response: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.parentResponseIdFilter !== undefined && this.parentResponseIdFilter !== null && this.parentResponseIdFilter.toString() !== '')
        items.push({ FilterName: "ParentResponseId", FilterType: FilterType.like, FilterValue: this.parentResponseIdFilter });
						        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.rowIndexFilter !== undefined && this.rowIndexFilter !== null && this.rowIndexFilter.toString() !== '')
		items.push({ FilterName: "RowIndex", FilterType: FilterType.eq, FilterValue: this.rowIndexFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.tempFilteredResponseFormModal.show();
    }

    edit(item: TempFilteredResponseDto): void {
        this.tempFilteredResponseFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}