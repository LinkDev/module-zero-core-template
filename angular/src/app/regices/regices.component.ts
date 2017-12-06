import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { RegExServiceProxy, RegExDto, PagedResultDtoOfRegExDto } from '@shared/service-proxies/service-proxies';
import { RegExCategoryServiceProxy, RegExCategoryDto, PagedResultDtoOfRegExCategoryDto } from '@shared/service-proxies/service-proxies';
import { RegExFormComponent } from "app/regices/reg-ex-form/reg-ex-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'reg-ex',
    templateUrl: './regices.component.html',
    animations: [appModuleAnimation()],
    providers: [
		RegExServiceProxy,
		RegExCategoryServiceProxy,
	]
})
export class RegicesComponent extends FilteredComponentBase<RegExDto> {
	items: RegExDto[] = [];

    @ViewChild('regExFormModal') regExFormModal: RegExFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			nameEnFilter: string;
			regExFilter: string;
			categoryIdFilter: string;
	categoryIdList: RegExCategoryDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _regExService: RegExServiceProxy
			, private _regExCategoryService: RegExCategoryServiceProxy
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
			this._regExService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfRegExDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: RegExDto): void {
        abp.message.confirm(
            'Delete Reg ex?',
            (result: boolean) => {
                if (result) {
                    this._regExService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Reg ex: ' + item.id);
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
						        if (this.regExFilter !== undefined && this.regExFilter !== null && this.regExFilter.toString() !== '')
        items.push({ FilterName: "RegEx", FilterType: FilterType.like, FilterValue: this.regExFilter });
						        if (this.categoryIdFilter !== undefined && this.categoryIdFilter !== null && this.categoryIdFilter.toString() !== '')
		items.push({ FilterName: "CategoryId", FilterType: FilterType.in, FilterValue: this.categoryIdFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.regExFormModal.show();
    }

    edit(item: RegExDto): void {
        this.regExFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}