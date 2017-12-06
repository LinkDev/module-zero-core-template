import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { SyncLogServiceProxy, SyncLogDto, PagedResultDtoOfSyncLogDto } from '@shared/service-proxies/service-proxies';
import { SyncLogFormComponent } from "app/sync-logs/sync-log-form/sync-log-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'sync-log',
    templateUrl: './sync-logs.component.html',
    animations: [appModuleAnimation()],
    providers: [
		SyncLogServiceProxy,
	]
})
export class SyncLogsComponent extends FilteredComponentBase<SyncLogDto> {
	items: SyncLogDto[] = [];

    @ViewChild('syncLogFormModal') syncLogFormModal: SyncLogFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			statusFilter: number;
			timeFromFilter: moment.Moment=null;
	timeToFilter: moment.Moment=null;
				isServerFilter: boolean;
			countFilter: number;
			userIdFilter: string;
			messageFilter: string;
			serviceFilter: string;
			domainCodeFilter: string;
			arabicErrorDescriptionFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _syncLogService: SyncLogServiceProxy
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
			this._syncLogService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfSyncLogDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: SyncLogDto): void {
        abp.message.confirm(
            'Delete Sync log?',
            (result: boolean) => {
                if (result) {
                    this._syncLogService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Sync log: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.statusFilter !== undefined && this.statusFilter !== null && this.statusFilter.toString() !== '')
		items.push({ FilterName: "Status", FilterType: FilterType.eq, FilterValue: this.statusFilter });
				  
			if (this.timeFromFilter !== undefined && this.timeFromFilter !== null && this.timeFromFilter.toString() !== '')
				items.push({ FilterName: "Time", FilterType: FilterType.ge, FilterValue: moment(this.timeFromFilter).format("YYYY/MM/DD")  });
			if (this.timeToFilter !== undefined && this.timeToFilter !== null && this.timeToFilter.toString() !== '')
				items.push({ FilterName: "Time", FilterType: FilterType.le, FilterValue: moment(this.timeToFilter).format("YYYY/MM/DD")  });
						        if (this.isServerFilter !== undefined && this.isServerFilter !== null && this.isServerFilter.toString() !== '')
		items.push({ FilterName: "IsServer", FilterType: FilterType.eq, FilterValue: this.isServerFilter });
				        if (this.countFilter !== undefined && this.countFilter !== null && this.countFilter.toString() !== '')
		items.push({ FilterName: "Count", FilterType: FilterType.eq, FilterValue: this.countFilter });
				        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						        if (this.messageFilter !== undefined && this.messageFilter !== null && this.messageFilter.toString() !== '')
        items.push({ FilterName: "Message", FilterType: FilterType.like, FilterValue: this.messageFilter });
						        if (this.serviceFilter !== undefined && this.serviceFilter !== null && this.serviceFilter.toString() !== '')
        items.push({ FilterName: "Service", FilterType: FilterType.like, FilterValue: this.serviceFilter });
						        if (this.domainCodeFilter !== undefined && this.domainCodeFilter !== null && this.domainCodeFilter.toString() !== '')
        items.push({ FilterName: "DomainCode", FilterType: FilterType.like, FilterValue: this.domainCodeFilter });
						        if (this.arabicErrorDescriptionFilter !== undefined && this.arabicErrorDescriptionFilter !== null && this.arabicErrorDescriptionFilter.toString() !== '')
        items.push({ FilterName: "ArabicErrorDescription", FilterType: FilterType.like, FilterValue: this.arabicErrorDescriptionFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.syncLogFormModal.show();
    }

    edit(item: SyncLogDto): void {
        this.syncLogFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}