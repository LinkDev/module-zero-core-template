import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { RegExCategoryServiceProxy, RegExCategoryDto, PagedResultDtoOfRegExCategoryDto } from '@shared/service-proxies/service-proxies';
import { RegExCategoryFormComponent } from "app/reg-ex-categories/reg-ex-category-form/reg-ex-category-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'reg-ex-category',
    templateUrl: './reg-ex-categories.component.html',
    animations: [appModuleAnimation()],
    providers: [
		RegExCategoryServiceProxy,
	]
})
export class RegExCategoriesComponent extends FilteredComponentBase<RegExCategoryDto> {
	items: RegExCategoryDto[] = [];

    @ViewChild('regExCategoryFormModal') regExCategoryFormModal: RegExCategoryFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			nameEnFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _regExCategoryService: RegExCategoryServiceProxy
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
			this._regExCategoryService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfRegExCategoryDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: RegExCategoryDto): void {
        abp.message.confirm(
            'Delete Reg ex category?',
            (result: boolean) => {
                if (result) {
                    this._regExCategoryService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Reg ex category: ' + item.id);
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
        this.regExCategoryFormModal.show();
    }

    edit(item: RegExCategoryDto): void {
        this.regExCategoryFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}