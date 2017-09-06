import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DomainGroupServiceProxy, DomainGroupDto, PagedResultDtoOfDomainGroupDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupFormComponent } from "app/domain-groups/domain-group-form/domain-group-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'domain-group',
    templateUrl: './domain-groups.component.html',
    animations: [appModuleAnimation()],
    providers: [
		DomainGroupServiceProxy,
	]
})
export class DomainGroupsComponent extends FilteredComponentBase<DomainGroupDto> {

    @ViewChild('domainGroupFormModal') domainGroupFormModal: DomainGroupFormComponent;
    
    items: DomainGroupDto[] = [];
	nameFilter: string;
	typeFilter: number;
	isActiveFilter: boolean;
	createdDateFilter: string;
	lastUpdateTimeFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _domainGroupService: DomainGroupServiceProxy
    ) {

        super(injector);
    }

    
	ngOnInit() {

		this.activatedRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            let key = params['key'];
            let value = params['value'];
            this[key + "Filter"] = value;
            this.search();
        });

        super.ngOnInit();
    }


    protected list(request: FilteredResultRequestDto, pageNumber: number, finishedCallback: Function): void {
			this._domainGroupService.getAll(request.search, request.maxResultCount, request.sorting, request.skipCount)
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
        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
        if (this.createdDateFilter !== undefined && this.createdDateFilter !== null && this.createdDateFilter.toString() !== '')
        items.push({ FilterName: "CreatedDate", FilterType: FilterType.like, FilterValue: this.createdDateFilter });
        if (this.lastUpdateTimeFilter !== undefined && this.lastUpdateTimeFilter !== null && this.lastUpdateTimeFilter.toString() !== '')
        items.push({ FilterName: "LastUpdateTime", FilterType: FilterType.like, FilterValue: this.lastUpdateTimeFilter });

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