import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { AnnouncementServiceProxy, AnnouncementDto, PagedResultDtoOfAnnouncementDto } from '@shared/service-proxies/service-proxies';
import { DomainServiceProxy, DomainDto, PagedResultDtoOfDomainDto } from '@shared/service-proxies/service-proxies';
import { AnnouncementFormComponent } from "app/announcements/announcement-form/announcement-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'announcement',
    templateUrl: './announcements.component.html',
    animations: [appModuleAnimation()],
    providers: [
		AnnouncementServiceProxy,
		DomainServiceProxy,
	]
})
export class AnnouncementsComponent extends FilteredComponentBase<AnnouncementDto> {
	items: AnnouncementDto[] = [];

    @ViewChild('announcementFormModal') announcementFormModal: AnnouncementFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			messageFilter: string;
			domainIdFilter: string;
	domainIdList: DomainDto[] = null;
			dateFromFilter: moment.Moment=null;
	dateToFilter: moment.Moment=null;
				senderIdFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _announcementService: AnnouncementServiceProxy
			, private _domainService: DomainServiceProxy
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
			this._announcementService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfAnnouncementDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: AnnouncementDto): void {
        abp.message.confirm(
            'Delete Announcement?',
            (result: boolean) => {
                if (result) {
                    this._announcementService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Announcement: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.messageFilter !== undefined && this.messageFilter !== null && this.messageFilter.toString() !== '')
        items.push({ FilterName: "Message", FilterType: FilterType.like, FilterValue: this.messageFilter });
						        if (this.domainIdFilter !== undefined && this.domainIdFilter !== null && this.domainIdFilter.toString() !== '')
		items.push({ FilterName: "DomainId", FilterType: FilterType.in, FilterValue: this.domainIdFilter });
				  
			if (this.dateFromFilter !== undefined && this.dateFromFilter !== null && this.dateFromFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.ge, FilterValue: moment(this.dateFromFilter).format("YYYY/MM/DD")  });
			if (this.dateToFilter !== undefined && this.dateToFilter !== null && this.dateToFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.le, FilterValue: moment(this.dateToFilter).format("YYYY/MM/DD")  });
						        if (this.senderIdFilter !== undefined && this.senderIdFilter !== null && this.senderIdFilter.toString() !== '')
        items.push({ FilterName: "SenderId", FilterType: FilterType.like, FilterValue: this.senderIdFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.announcementFormModal.show();
    }

    edit(item: AnnouncementDto): void {
        this.announcementFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}