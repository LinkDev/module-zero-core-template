import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { SampleServiceProxy, SampleDto, PagedResultDtoOfSampleDto } from '@shared/service-proxies/service-proxies';
import { SampleFormComponent } from "app/samples/sample-form/sample-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'sample',
    templateUrl: './samples.component.html',
    animations: [appModuleAnimation()],
    providers: [
		SampleServiceProxy,
	]
})
export class SamplesComponent extends FilteredComponentBase<SampleDto> {
	items: SampleDto[] = [];

    @ViewChild('sampleFormModal') sampleFormModal: SampleFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			createByFilter: string;
			assignedUserIdFilter: string;
			sampleSizeFilter: number;
			sampleDateFromFilter: moment.Moment=null;
	sampleDateToFilter: moment.Moment=null;
				propertiesFilter: string;
			typeOfSampleFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _sampleService: SampleServiceProxy
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
			this._sampleService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfSampleDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: SampleDto): void {
        abp.message.confirm(
            'Delete Sample?',
            (result: boolean) => {
                if (result) {
                    this._sampleService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Sample: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.createByFilter !== undefined && this.createByFilter !== null && this.createByFilter.toString() !== '')
        items.push({ FilterName: "CreateBy", FilterType: FilterType.like, FilterValue: this.createByFilter });
						        if (this.assignedUserIdFilter !== undefined && this.assignedUserIdFilter !== null && this.assignedUserIdFilter.toString() !== '')
        items.push({ FilterName: "AssignedUserId", FilterType: FilterType.like, FilterValue: this.assignedUserIdFilter });
						        if (this.sampleSizeFilter !== undefined && this.sampleSizeFilter !== null && this.sampleSizeFilter.toString() !== '')
		items.push({ FilterName: "SampleSize", FilterType: FilterType.eq, FilterValue: this.sampleSizeFilter });
				  
			if (this.sampleDateFromFilter !== undefined && this.sampleDateFromFilter !== null && this.sampleDateFromFilter.toString() !== '')
				items.push({ FilterName: "SampleDate", FilterType: FilterType.ge, FilterValue: moment(this.sampleDateFromFilter).format("YYYY/MM/DD")  });
			if (this.sampleDateToFilter !== undefined && this.sampleDateToFilter !== null && this.sampleDateToFilter.toString() !== '')
				items.push({ FilterName: "SampleDate", FilterType: FilterType.le, FilterValue: moment(this.sampleDateToFilter).format("YYYY/MM/DD")  });
						        if (this.propertiesFilter !== undefined && this.propertiesFilter !== null && this.propertiesFilter.toString() !== '')
        items.push({ FilterName: "Properties", FilterType: FilterType.like, FilterValue: this.propertiesFilter });
						        if (this.typeOfSampleFilter !== undefined && this.typeOfSampleFilter !== null && this.typeOfSampleFilter.toString() !== '')
		items.push({ FilterName: "TypeOfSample", FilterType: FilterType.eq, FilterValue: this.typeOfSampleFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.sampleFormModal.show();
    }

    edit(item: SampleDto): void {
        this.sampleFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}