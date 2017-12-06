import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UploadedReportServiceProxy, UploadedReportDto, PagedResultDtoOfUploadedReportDto } from '@shared/service-proxies/service-proxies';
import { ReportTypeServiceProxy, ReportTypeDto, PagedResultDtoOfReportTypeDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { UploadedReportFormComponent } from "app/uploaded-reports/uploaded-report-form/uploaded-report-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'uploaded-report',
    templateUrl: './uploaded-reports.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UploadedReportServiceProxy,
		ReportTypeServiceProxy,
		DomainServiceProxy,
		PhaseServiceProxy,
	]
})
export class UploadedReportsComponent extends FilteredComponentBase<UploadedReportDto> {
	items: UploadedReportDto[] = [];

    @ViewChild('uploadedReportFormModal') uploadedReportFormModal: UploadedReportFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			reportTypeIdFilter: string;
	reportTypeIdList: ReportTypeDto[] = null;
			domainIdFilter: string;
	domainIdList: DomainDto[] = null;
			ratingFilter: number;
			fileFilter: string;
			createdDateFromFilter: moment.Moment=null;
	createdDateToFilter: moment.Moment=null;
				createdByFilter: string;
			phaseIdFilter: string;
	phaseIdList: PhaseDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _uploadedReportService: UploadedReportServiceProxy
			, private _reportTypeService: ReportTypeServiceProxy
			, private _domainService: DomainServiceProxy
			, private _phaseService: PhaseServiceProxy
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
			this._uploadedReportService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUploadedReportDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UploadedReportDto): void {
        abp.message.confirm(
            'Delete Uploaded report?',
            (result: boolean) => {
                if (result) {
                    this._uploadedReportService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Uploaded report: ' + item.id);
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
						        if (this.reportTypeIdFilter !== undefined && this.reportTypeIdFilter !== null && this.reportTypeIdFilter.toString() !== '')
		items.push({ FilterName: "ReportTypeId", FilterType: FilterType.in, FilterValue: this.reportTypeIdFilter });
				        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
		items.push({ FilterName: "DomainId", FilterType: FilterType.in, FilterValue: this.domainIdFilter });
				        if (this.ratingFilter !== undefined && this.ratingFilter !== null && this.ratingFilter.toString() !== '')
		items.push({ FilterName: "Rating", FilterType: FilterType.eq, FilterValue: this.ratingFilter });
				        if (this.fileFilter !== undefined && this.fileFilter !== null && this.fileFilter.toString() !== '')
        items.push({ FilterName: "File", FilterType: FilterType.like, FilterValue: this.fileFilter });
						  
			if (this.createdDateFromFilter !== undefined && this.createdDateFromFilter !== null && this.createdDateFromFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.ge, FilterValue: moment(this.createdDateFromFilter).format("YYYY/MM/DD")  });
			if (this.createdDateToFilter !== undefined && this.createdDateToFilter !== null && this.createdDateToFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.le, FilterValue: moment(this.createdDateToFilter).format("YYYY/MM/DD")  });
						        if (this.createdByFilter !== undefined && this.createdByFilter !== null && this.createdByFilter.toString() !== '')
        items.push({ FilterName: "CreatedBy", FilterType: FilterType.like, FilterValue: this.createdByFilter });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
		items.push({ FilterName: "PhaseId", FilterType: FilterType.in, FilterValue: this.phaseIdFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.uploadedReportFormModal.show();
    }

    edit(item: UploadedReportDto): void {
        this.uploadedReportFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}