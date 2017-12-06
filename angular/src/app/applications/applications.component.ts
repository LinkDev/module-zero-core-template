import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ApplicationServiceProxy, ApplicationDto, PagedResultDtoOfApplicationDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { ApplicationCategoryServiceProxy, ApplicationCategoryDto, PagedResultDtoOfApplicationCategoryDto } from '@shared/service-proxies/service-proxies';
import { ApplicationFormComponent } from "app/applications/application-form/application-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'application',
    templateUrl: './applications.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ApplicationServiceProxy,
		PhaseServiceProxy,
		ApplicationCategoryServiceProxy,
	]
})
export class ApplicationsComponent extends FilteredComponentBase<ApplicationDto> {
	items: ApplicationDto[] = [];

    @ViewChild('applicationFormModal') applicationFormModal: ApplicationFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			currentPhaseIdFilter: string;
	currentPhaseIdList: PhaseDto[] = null;
			isEnabledFilter: boolean;
			isActiveFilter: boolean;
			logoFilter: string;
			categoryIdFilter: string;
	categoryIdList: ApplicationCategoryDto[] = null;
			availableForFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _applicationService: ApplicationServiceProxy
			, private _phaseService: PhaseServiceProxy
			, private _applicationCategoryService: ApplicationCategoryServiceProxy
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
			this._applicationService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfApplicationDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ApplicationDto): void {
        abp.message.confirm(
            'Delete Application?',
            (result: boolean) => {
                if (result) {
                    this._applicationService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Application: ' + item.id);
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
						        if (this.currentPhaseIdFilter !== undefined && this.currentPhaseIdFilter !== null && this.currentPhaseIdFilter.toString() !== '')
		items.push({ FilterName: "CurrentPhaseId", FilterType: FilterType.in, FilterValue: this.currentPhaseIdFilter });
				        if (this.isEnabledFilter !== undefined && this.isEnabledFilter !== null && this.isEnabledFilter.toString() !== '')
		items.push({ FilterName: "IsEnabled", FilterType: FilterType.eq, FilterValue: this.isEnabledFilter });
				        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				        if (this.logoFilter !== undefined && this.logoFilter !== null && this.logoFilter.toString() !== '')
        items.push({ FilterName: "Logo", FilterType: FilterType.like, FilterValue: this.logoFilter });
						        if (this.categoryIdFilter !== undefined && this.categoryIdFilter !== null && this.categoryIdFilter.toString() !== '')
		items.push({ FilterName: "CategoryId", FilterType: FilterType.in, FilterValue: this.categoryIdFilter });
				        if (this.availableForFilter !== undefined && this.availableForFilter !== null && this.availableForFilter.toString() !== '')
		items.push({ FilterName: "AvailableFor", FilterType: FilterType.eq, FilterValue: this.availableForFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.applicationFormModal.show();
    }

    edit(item: ApplicationDto): void {
        this.applicationFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}