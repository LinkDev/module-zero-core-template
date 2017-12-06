import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ResponseSubStatusServiceProxy, ResponseSubStatusDto, PagedResultDtoOfResponseSubStatusDto } from '@shared/service-proxies/service-proxies';
import { ResponseSubStatusFormComponent } from "app/response-sub-statuses/response-sub-status-form/response-sub-status-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'response-sub-status',
    templateUrl: './response-sub-statuses.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ResponseSubStatusServiceProxy,
	]
})
export class ResponseSubStatusesComponent extends FilteredComponentBase<ResponseSubStatusDto> {
	items: ResponseSubStatusDto[] = [];

    @ViewChild('responseSubStatusFormModal') responseSubStatusFormModal: ResponseSubStatusFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			nameEnFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _responseSubStatusService: ResponseSubStatusServiceProxy
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
			this._responseSubStatusService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfResponseSubStatusDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ResponseSubStatusDto): void {
        abp.message.confirm(
            'Delete Response sub status?',
            (result: boolean) => {
                if (result) {
                    this._responseSubStatusService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Response sub status: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
						        if (this.nameEnFilter !== undefined && this.nameEnFilter !== null && this.nameEnFilter.toString() !== '')
        items.push({ FilterName: "NameEn", FilterType: FilterType.like, FilterValue: this.nameEnFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.responseSubStatusFormModal.show();
    }

    edit(item: ResponseSubStatusDto): void {
        this.responseSubStatusFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}