import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { UploadedReportRoleServiceProxy, UploadedReportRoleDto, PagedResultDtoOfUploadedReportRoleDto } from '@shared/service-proxies/service-proxies';
import { UploadedReportServiceProxy, UploadedReportDto, PagedResultDtoOfUploadedReportDto } from '@shared/service-proxies/service-proxies';
import { UploadedReportRoleFormComponent } from "app/uploaded-report-roles/uploaded-report-role-form/uploaded-report-role-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'uploaded-report-role',
    templateUrl: './uploaded-report-roles.component.html',
    animations: [appModuleAnimation()],
    providers: [
		UploadedReportRoleServiceProxy,
		UploadedReportServiceProxy,
	]
})
export class UploadedReportRolesComponent extends FilteredComponentBase<UploadedReportRoleDto> {
	items: UploadedReportRoleDto[] = [];

    @ViewChild('uploadedReportRoleFormModal') uploadedReportRoleFormModal: UploadedReportRoleFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			uploadedReportIdFilter: string;
	uploadedReportIdList: UploadedReportDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _uploadedReportRoleService: UploadedReportRoleServiceProxy
			, private _uploadedReportService: UploadedReportServiceProxy
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
			this._uploadedReportRoleService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfUploadedReportRoleDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: UploadedReportRoleDto): void {
        abp.message.confirm(
            'Delete Uploaded report role?',
            (result: boolean) => {
                if (result) {
                    this._uploadedReportRoleService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Uploaded report role: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.uploadedReportRoleFormModal.show();
    }

    edit(item: UploadedReportRoleDto): void {
        this.uploadedReportRoleFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}