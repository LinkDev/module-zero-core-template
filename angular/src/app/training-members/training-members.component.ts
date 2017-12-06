import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TrainingMemberServiceProxy, TrainingMemberDto, PagedResultDtoOfTrainingMemberDto } from '@shared/service-proxies/service-proxies';
import { TrainingCenterServiceProxy, TrainingCenterDto, PagedResultDtoOfTrainingCenterDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramServiceProxy, TrainingProgramDto, PagedResultDtoOfTrainingProgramDto } from '@shared/service-proxies/service-proxies';
import { TrainingMemberFormComponent } from "app/training-members/training-member-form/training-member-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'training-member',
    templateUrl: './training-members.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TrainingMemberServiceProxy,
		TrainingCenterServiceProxy,
		TrainingProgramServiceProxy,
	]
})
export class TrainingMembersComponent extends FilteredComponentBase<TrainingMemberDto> {
	items: TrainingMemberDto[] = [];

    @ViewChild('trainingMemberFormModal') trainingMemberFormModal: TrainingMemberFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			ageFilter: number;
			telephoneFilter: string;
			emailFilter: string;
			nationalIdFilter: string;
			addressFilter: string;
			dateCreatedFromFilter: moment.Moment=null;
	dateCreatedToFilter: moment.Moment=null;
				createdByIdFilter: string;
			trainingCenterIdFilter: string;
	trainingCenterIdList: TrainingCenterDto[] = null;
			trainingProgramIdFilter: string;
	trainingProgramIdList: TrainingProgramDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _trainingMemberService: TrainingMemberServiceProxy
			, private _trainingCenterService: TrainingCenterServiceProxy
			, private _trainingProgramService: TrainingProgramServiceProxy
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
			this._trainingMemberService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTrainingMemberDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TrainingMemberDto): void {
        abp.message.confirm(
            'Delete Training member?',
            (result: boolean) => {
                if (result) {
                    this._trainingMemberService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Training member: ' + item.id);
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
						        if (this.ageFilter !== undefined && this.ageFilter !== null && this.ageFilter.toString() !== '')
		items.push({ FilterName: "Age", FilterType: FilterType.eq, FilterValue: this.ageFilter });
				        if (this.telephoneFilter !== undefined && this.telephoneFilter !== null && this.telephoneFilter.toString() !== '')
        items.push({ FilterName: "Telephone", FilterType: FilterType.like, FilterValue: this.telephoneFilter });
						        if (this.emailFilter !== undefined && this.emailFilter !== null && this.emailFilter.toString() !== '')
        items.push({ FilterName: "Email", FilterType: FilterType.like, FilterValue: this.emailFilter });
						        if (this.nationalIdFilter !== undefined && this.nationalIdFilter !== null && this.nationalIdFilter.toString() !== '')
        items.push({ FilterName: "NationalId", FilterType: FilterType.like, FilterValue: this.nationalIdFilter });
						        if (this.addressFilter !== undefined && this.addressFilter !== null && this.addressFilter.toString() !== '')
        items.push({ FilterName: "Address", FilterType: FilterType.like, FilterValue: this.addressFilter });
						  
			if (this.dateCreatedFromFilter !== undefined && this.dateCreatedFromFilter !== null && this.dateCreatedFromFilter.toString() !== '')
				items.push({ FilterName: "DateCreated", FilterType: FilterType.ge, FilterValue: moment(this.dateCreatedFromFilter).format("YYYY/MM/DD")  });
			if (this.dateCreatedToFilter !== undefined && this.dateCreatedToFilter !== null && this.dateCreatedToFilter.toString() !== '')
				items.push({ FilterName: "DateCreated", FilterType: FilterType.le, FilterValue: moment(this.dateCreatedToFilter).format("YYYY/MM/DD")  });
						        if (this.createdByIdFilter !== undefined && this.createdByIdFilter !== null && this.createdByIdFilter.toString() !== '')
        items.push({ FilterName: "CreatedById", FilterType: FilterType.like, FilterValue: this.createdByIdFilter });
						        if (this.trainingCenterIdFilter !== undefined && this.trainingCenterIdFilter !== null && this.trainingCenterIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingCenterId", FilterType: FilterType.in, FilterValue: this.trainingCenterIdFilter });
				        if (this.trainingProgramIdFilter !== undefined && this.trainingProgramIdFilter !== null && this.trainingProgramIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingProgramId", FilterType: FilterType.in, FilterValue: this.trainingProgramIdFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.trainingMemberFormModal.show();
    }

    edit(item: TrainingMemberDto): void {
        this.trainingMemberFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}