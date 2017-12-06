import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { DomainGroupCategoryServiceProxy, DomainGroupCategoryDto, PagedResultDtoOfDomainGroupCategoryDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupCategoryFormComponent } from "app/domain-group-categories/domain-group-category-form/domain-group-category-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'domain-group-category',
    templateUrl: './domain-group-categories.component.html',
    animations: [appModuleAnimation()],
    providers: [
		DomainGroupCategoryServiceProxy,
	]
})
export class DomainGroupCategoriesComponent extends FilteredComponentBase<DomainGroupCategoryDto> {
	items: DomainGroupCategoryDto[] = [];

    @ViewChild('domainGroupCategoryFormModal') domainGroupCategoryFormModal: DomainGroupCategoryFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			nameEnFilter: string;
			typeFilter: number;
			isAdministrativeFilter: boolean;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _domainGroupCategoryService: DomainGroupCategoryServiceProxy
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
			this._domainGroupCategoryService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfDomainGroupCategoryDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: DomainGroupCategoryDto): void {
        abp.message.confirm(
            'Delete Domain group category?',
            (result: boolean) => {
                if (result) {
                    this._domainGroupCategoryService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Domain group category: ' + item.id);
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
						        if (this.typeFilter !== undefined && this.typeFilter !== null && this.typeFilter.toString() !== '')
		items.push({ FilterName: "Type", FilterType: FilterType.eq, FilterValue: this.typeFilter });
				        if (this.isAdministrativeFilter !== undefined && this.isAdministrativeFilter !== null && this.isAdministrativeFilter.toString() !== '')
		items.push({ FilterName: "IsAdministrative", FilterType: FilterType.eq, FilterValue: this.isAdministrativeFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.domainGroupCategoryFormModal.show();
    }

    edit(item: DomainGroupCategoryDto): void {
        this.domainGroupCategoryFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}