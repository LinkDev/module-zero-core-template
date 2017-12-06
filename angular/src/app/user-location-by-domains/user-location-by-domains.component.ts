import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UserLocationByDomainServiceProxy, UserLocationByDomainDto, PagedResultDtoOfUserLocationByDomainDto } from '@shared/service-proxies/service-proxies';
import { UserLocationByDomainFormComponent } from "app/user-location-by-domains/user-location-by-domain-form/user-location-by-domain-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'user-location-by-domain',
    templateUrl: './user-location-by-domains.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UserLocationByDomainServiceProxy,
	]
})
export class UserLocationByDomainsComponent extends FilteredComponentBase<UserLocationByDomainDto> {
	items: UserLocationByDomainDto[] = [];

    @ViewChild('userLocationByDomainFormModal') userLocationByDomainFormModal: UserLocationByDomainFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			domainIdFilter: string;
			parentDomainIdFilter: string;
			domainNameFilter: string;
			domainCodeFilter: string;
			inAreaLocationCountFilter: number;
			outOfAreaLocationCountFilter: number;
			unavailableAreaLocationCountFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _userLocationByDomainService: UserLocationByDomainServiceProxy
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
			this._userLocationByDomainService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUserLocationByDomainDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UserLocationByDomainDto): void {
        abp.message.confirm(
            'Delete User location by domain?',
            (result: boolean) => {
                if (result) {
                    this._userLocationByDomainService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted User location by domain: ' + item.id);
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

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.userLocationByDomainFormModal.show();
    }

    edit(item: UserLocationByDomainDto): void {
        this.userLocationByDomainFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}