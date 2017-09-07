import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
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

    @ViewChild('sampleFormModal') sampleFormModal: SampleFormComponent;
    
    items: SampleDto[] = [];
	bioFilter: string;
	nameFilter: string;
	publishDateFilter: string;
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
            console.log(params);
            let key = params['key'];
            let value = params['value'];
            this[key + "Filter"] = value;
            this.search();
        });

        super.ngOnInit();
    }


    protected list(request: FilteredResultRequestDto, pageNumber: number, finishedCallback: Function): void {
			this._sampleService.getAll(request.search, request.maxResultCount, request.sorting, request.skipCount)
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
        if (this.publishDateFilter !== undefined && this.publishDateFilter !== null && this.publishDateFilter.toString() !== '')
        items.push({ FilterName: "PublishDate", FilterType: FilterType.like, FilterValue: this.publishDateFilter });

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