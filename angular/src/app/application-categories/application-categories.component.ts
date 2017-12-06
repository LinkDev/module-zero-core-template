import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ApplicationCategoryServiceProxy, ApplicationCategoryDto, PagedResultDtoOfApplicationCategoryDto } from '@shared/service-proxies/service-proxies';
import { ApplicationCategoryFormComponent } from "app/application-categories/application-category-form/application-category-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'application-category',
    templateUrl: './application-categories.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ApplicationCategoryServiceProxy,
	]
})
export class ApplicationCategoriesComponent extends FilteredComponentBase<ApplicationCategoryDto> {
	items: ApplicationCategoryDto[] = [];

    @ViewChild('applicationCategoryFormModal') applicationCategoryFormModal: ApplicationCategoryFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			nameEnFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _applicationCategoryService: ApplicationCategoryServiceProxy
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
			this._applicationCategoryService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfApplicationCategoryDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ApplicationCategoryDto): void {
        abp.message.confirm(
            'Delete Application category?',
            (result: boolean) => {
                if (result) {
                    this._applicationCategoryService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Application category: ' + item.id);
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
        this.applicationCategoryFormModal.show();
    }

    edit(item: ApplicationCategoryDto): void {
        this.applicationCategoryFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}