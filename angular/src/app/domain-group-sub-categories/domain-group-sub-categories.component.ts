import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { DomainGroupSubCategoryServiceProxy, DomainGroupSubCategoryDto, PagedResultDtoOfDomainGroupSubCategoryDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupCategoryServiceProxy, DomainGroupCategoryDto, PagedResultDtoOfDomainGroupCategoryDto } from '@shared/service-proxies/service-proxies';
import { DomainGroupSubCategoryFormComponent } from "app/domain-group-sub-categories/domain-group-sub-category-form/domain-group-sub-category-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'domain-group-sub-category',
    templateUrl: './domain-group-sub-categories.component.html',
    animations: [appModuleAnimation()],
    providers: [
		DomainGroupSubCategoryServiceProxy,
		DomainGroupCategoryServiceProxy,
	]
})
export class DomainGroupSubCategoriesComponent extends FilteredComponentBase<DomainGroupSubCategoryDto> {
	items: DomainGroupSubCategoryDto[] = [];

    @ViewChild('domainGroupSubCategoryFormModal') domainGroupSubCategoryFormModal: DomainGroupSubCategoryFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			nameEnFilter: string;
			domainGroupCategoryIdFilter: string;
	domainGroupCategoryIdList: DomainGroupCategoryDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _domainGroupSubCategoryService: DomainGroupSubCategoryServiceProxy
			, private _domainGroupCategoryService: DomainGroupCategoryServiceProxy
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
			this._domainGroupSubCategoryService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfDomainGroupSubCategoryDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: DomainGroupSubCategoryDto): void {
        abp.message.confirm(
            'Delete Domain group sub category?',
            (result: boolean) => {
                if (result) {
                    this._domainGroupSubCategoryService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Domain group sub category: ' + item.id);
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
						        if (this.domainGroupCategoryIdFilter !== undefined && this.domainGroupCategoryIdFilter !== null && this.domainGroupCategoryIdFilter.toString() !== '')
		items.push({ FilterName: "DomainGroupCategoryId", FilterType: FilterType.in, FilterValue: this.domainGroupCategoryIdFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.domainGroupSubCategoryFormModal.show();
    }

    edit(item: DomainGroupSubCategoryDto): void {
        this.domainGroupSubCategoryFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}