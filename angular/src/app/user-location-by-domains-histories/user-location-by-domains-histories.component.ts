import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UserLocationByDomainsHistoryServiceProxy, UserLocationByDomainsHistoryDto, PagedResultDtoOfUserLocationByDomainsHistoryDto } from '@shared/service-proxies/service-proxies';
import { UserLocationByDomainsHistoryFormComponent } from "app/user-location-by-domains-histories/user-location-by-domains-history-form/user-location-by-domains-history-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'user-location-by-domains-history',
    templateUrl: './user-location-by-domains-histories.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UserLocationByDomainsHistoryServiceProxy,
	]
})
export class UserLocationByDomainsHistoriesComponent extends FilteredComponentBase<UserLocationByDomainsHistoryDto> {
	items: UserLocationByDomainsHistoryDto[] = [];

    @ViewChild('userLocationByDomainsHistoryFormModal') userLocationByDomainsHistoryFormModal: UserLocationByDomainsHistoryFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			domainIdFilter: string;
			parentDomainIdFilter: string;
			domainNameFilter: string;
			domainCodeFilter: string;
			inAreaLocationCountFilter: number;
			outOfAreaLocationCountFilter: number;
			unavailableAreaLocationCountFilter: number;
			dateFromFilter: moment.Moment=null;
	dateToFilter: moment.Moment=null;
		constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _userLocationByDomainsHistoryService: UserLocationByDomainsHistoryServiceProxy
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
			this._userLocationByDomainsHistoryService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUserLocationByDomainsHistoryDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UserLocationByDomainsHistoryDto): void {
        abp.message.confirm(
            'Delete User location by domains history?',
            (result: boolean) => {
                if (result) {
                    this._userLocationByDomainsHistoryService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted User location by domains history: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
        items.push({ FilterName: "DomainId", FilterType: FilterType.like, FilterValue: this.domainIdFilter });
						        if (this.parentDomainIdFilter !== undefined && this.parentDomainIdFilter !== null && this.parentDomainIdFilter.toString() !== '')
        items.push({ FilterName: "ParentDomainId", FilterType: FilterType.like, FilterValue: this.parentDomainIdFilter });
						        if (this.domainNameFilter !== undefined && this.domainNameFilter !== null && this.domainNameFilter.toString() !== '')
        items.push({ FilterName: "DomainName", FilterType: FilterType.like, FilterValue: this.domainNameFilter });
						        if (this.domainCodeFilter !== undefined && this.domainCodeFilter !== null && this.domainCodeFilter.toString() !== '')
        items.push({ FilterName: "DomainCode", FilterType: FilterType.like, FilterValue: this.domainCodeFilter });
						        if (this.inAreaLocationCountFilter !== undefined && this.inAreaLocationCountFilter !== null && this.inAreaLocationCountFilter.toString() !== '')
		items.push({ FilterName: "InAreaLocationCount", FilterType: FilterType.eq, FilterValue: this.inAreaLocationCountFilter });
				        if (this.outOfAreaLocationCountFilter !== undefined && this.outOfAreaLocationCountFilter !== null && this.outOfAreaLocationCountFilter.toString() !== '')
		items.push({ FilterName: "OutOfAreaLocationCount", FilterType: FilterType.eq, FilterValue: this.outOfAreaLocationCountFilter });
				        if (this.unavailableAreaLocationCountFilter !== undefined && this.unavailableAreaLocationCountFilter !== null && this.unavailableAreaLocationCountFilter.toString() !== '')
		items.push({ FilterName: "UnavailableAreaLocationCount", FilterType: FilterType.eq, FilterValue: this.unavailableAreaLocationCountFilter });
				  
			if (this.dateFromFilter !== undefined && this.dateFromFilter !== null && this.dateFromFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.ge, FilterValue: moment(this.dateFromFilter).format("YYYY/MM/DD")  });
			if (this.dateToFilter !== undefined && this.dateToFilter !== null && this.dateToFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.le, FilterValue: moment(this.dateToFilter).format("YYYY/MM/DD")  });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.userLocationByDomainsHistoryFormModal.show();
    }

    edit(item: UserLocationByDomainsHistoryDto): void {
        this.userLocationByDomainsHistoryFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}