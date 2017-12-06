import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupSubCategoryServiceProxy, DomainGroupSubCategoryDto, PagedResultDtoOfDomainGroupSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupFormComponent } from "app/domain-groups/domain-group-form/domain-group-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'domain-group',
    templateUrl: './domain-groups.component.html',
    animations: [appModuleAnimation()],
    providers: [
		DomainGroupServiceProxy,
		DomainGroupSubCategoryServiceProxy,
	]
})
export class DomainGroupsComponent extends FilteredComponentBase<DomainGroupDto> {
	items: DomainGroupDto[] = [];

    @ViewChild('domainGroupFormModal') domainGroupFormModal: DomainGroupFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			typeFilter: number;
			subCategoryIdFilter: string;
	subCategoryIdList: DomainGroupSubCategoryDto[] = null;
			isActiveFilter: boolean;
			createdDateFromFilter: moment.Moment=null;
	createdDateToFilter: moment.Moment=null;
				lastUpdateTimeFromFilter: moment.Moment=null;
	lastUpdateTimeToFilter: moment.Moment=null;
		constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _domainGroupService: DomainGroupServiceProxy
			, private _domainGroupSubCategoryService: DomainGroupSubCategoryServiceProxy
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
			this._domainGroupService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfDomainGroupDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: DomainGroupDto): void {
        abp.message.confirm(
            'Delete Domain group?',
            (result: boolean) => {
                if (result) {
                    this._domainGroupService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Domain group: ' + item.id);
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
						        if (this.typeFilter !== undefined && this.typeFilter !== null && this.typeFilter.toString() !== '')
		items.push({ FilterName: "Type", FilterType: FilterType.eq, FilterValue: this.typeFilter });
				        if (this.subCategoryIdFilter !== undefined && this.subCategoryIdFilter !== null && this.subCategoryIdFilter.toString() !== '')
		items.push({ FilterName: "SubCategoryId", FilterType: FilterType.in, FilterValue: this.subCategoryIdFilter });
				        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				  
			if (this.createdDateFromFilter !== undefined && this.createdDateFromFilter !== null && this.createdDateFromFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.ge, FilterValue: moment(this.createdDateFromFilter).format("YYYY/MM/DD")  });
			if (this.createdDateToFilter !== undefined && this.createdDateToFilter !== null && this.createdDateToFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.le, FilterValue: moment(this.createdDateToFilter).format("YYYY/MM/DD")  });
						  
			if (this.lastUpdateTimeFromFilter !== undefined && this.lastUpdateTimeFromFilter !== null && this.lastUpdateTimeFromFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.ge, FilterValue: moment(this.lastUpdateTimeFromFilter).format("YYYY/MM/DD")  });
			if (this.lastUpdateTimeToFilter !== undefined && this.lastUpdateTimeToFilter !== null && this.lastUpdateTimeToFilter.toString() !== '')
				items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.le, FilterValue: moment(this.lastUpdateTimeToFilter).format("YYYY/MM/DD")  });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.domainGroupFormModal.show();
    }

    edit(item: DomainGroupDto): void {
        this.domainGroupFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}