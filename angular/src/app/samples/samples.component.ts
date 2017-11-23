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
		bioFilter: string;
		nameFilter: string;
		publishDateFromFilter: moment.Moment=null;
	publishDateToFilter: moment.Moment=null;
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
		        if (this.bioFilter !== undefined && this.bioFilter !== null && this.bioFilter.toString() !== '')
        items.push({ FilterName: "Bio", FilterType: FilterType.like, FilterValue: this.bioFilter });
				        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
				  
			if (this.publishDateFromFilter !== undefined && this.publishDateFromFilter !== null && this.publishDateFromFilter.toString() !== '')
				items.push({ FilterName: "PublishDate", FilterType: FilterType.ge, FilterValue: moment(this.publishDateFromFilter).format("YYYY/MM/DD")  });
			if (this.publishDateToFilter !== undefined && this.publishDateToFilter !== null && this.publishDateToFilter.toString() !== '')
				items.push({ FilterName: "PublishDate", FilterType: FilterType.le, FilterValue: moment(this.publishDateToFilter).format("YYYY/MM/DD")  });
		
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