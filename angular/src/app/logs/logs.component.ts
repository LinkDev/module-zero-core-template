import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { LogServiceProxy, LogDto, PagedResultDtoOfLogDto } from '@shared/service-proxies/service-proxies';
import { LogFormComponent } from "app/logs/log-form/log-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'log',
    templateUrl: './logs.component.html',
    animations: [appModuleAnimation()],
    providers: [
		LogServiceProxy,
	]
})
export class LogsComponent extends FilteredComponentBase<LogDto> {
	items: LogDto[] = [];

    @ViewChild('logFormModal') logFormModal: LogFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			actionTypeIdFilter: number;
			actionDateFromFilter: moment.Moment=null;
	actionDateToFilter: moment.Moment=null;
				createdByIdFilter: string;
			userIdFilter: string;
			domainsIdsFilter: string;
			domainsNamesFilter: string;
			propertiesFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _logService: LogServiceProxy
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
			this._logService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfLogDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: LogDto): void {
        abp.message.confirm(
            'Delete Log?',
            (result: boolean) => {
                if (result) {
                    this._logService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Log: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.actionTypeIdFilter !== undefined && this.actionTypeIdFilter !== null && this.actionTypeIdFilter.toString() !== '')
		items.push({ FilterName: "ActionTypeId", FilterType: FilterType.eq, FilterValue: this.actionTypeIdFilter });
				  
			if (this.actionDateFromFilter !== undefined && this.actionDateFromFilter !== null && this.actionDateFromFilter.toString() !== '')
				items.push({ FilterName: "ActionDate", FilterType: FilterType.ge, FilterValue: moment(this.actionDateFromFilter).format("YYYY/MM/DD")  });
			if (this.actionDateToFilter !== undefined && this.actionDateToFilter !== null && this.actionDateToFilter.toString() !== '')
				items.push({ FilterName: "ActionDate", FilterType: FilterType.le, FilterValue: moment(this.actionDateToFilter).format("YYYY/MM/DD")  });
						        if (this.createdByIdFilter !== undefined && this.createdByIdFilter !== null && this.createdByIdFilter.toString() !== '')
        items.push({ FilterName: "CreatedById", FilterType: FilterType.like, FilterValue: this.createdByIdFilter });
						        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						        if (this.domainsIdsFilter !== undefined && this.domainsIdsFilter !== null && this.domainsIdsFilter.toString() !== '')
        items.push({ FilterName: "DomainsIds", FilterType: FilterType.like, FilterValue: this.domainsIdsFilter });
						        if (this.domainsNamesFilter !== undefined && this.domainsNamesFilter !== null && this.domainsNamesFilter.toString() !== '')
        items.push({ FilterName: "DomainsNames", FilterType: FilterType.like, FilterValue: this.domainsNamesFilter });
						        if (this.propertiesFilter !== undefined && this.propertiesFilter !== null && this.propertiesFilter.toString() !== '')
        items.push({ FilterName: "Properties", FilterType: FilterType.like, FilterValue: this.propertiesFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.logFormModal.show();
    }

    edit(item: LogDto): void {
        this.logFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}