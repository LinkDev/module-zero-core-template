import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ReportTypeServiceProxy, ReportTypeDto, PagedResultDtoOfReportTypeDto } from '@shared/service-proxies/service-proxies';
import { ReportTypeFormComponent } from "app/report-types/report-type-form/report-type-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'report-type',
    templateUrl: './report-types.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ReportTypeServiceProxy,
	]
})
export class ReportTypesComponent extends FilteredComponentBase<ReportTypeDto> {
	items: ReportTypeDto[] = [];

    @ViewChild('reportTypeFormModal') reportTypeFormModal: ReportTypeFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _reportTypeService: ReportTypeServiceProxy
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
			this._reportTypeService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfReportTypeDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ReportTypeDto): void {
        abp.message.confirm(
            'Delete Report type?',
            (result: boolean) => {
                if (result) {
                    this._reportTypeService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Report type: ' + item.id);
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
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.reportTypeFormModal.show();
    }

    edit(item: ReportTypeDto): void {
        this.reportTypeFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}