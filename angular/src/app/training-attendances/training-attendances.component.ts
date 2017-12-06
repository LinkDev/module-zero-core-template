import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TrainingAttendanceServiceProxy, TrainingAttendanceDto, PagedResultDtoOfTrainingAttendanceDto } from '@shared/service-proxies/service-proxies';
import { TrainingMemberServiceProxy, TrainingMemberDto, PagedResultDtoOfTrainingMemberDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramServiceProxy, TrainingProgramDto, PagedResultDtoOfTrainingProgramDto } from '@shared/service-proxies/service-proxies';
import { TrainingAttendanceFormComponent } from "app/training-attendances/training-attendance-form/training-attendance-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'training-attendance',
    templateUrl: './training-attendances.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TrainingAttendanceServiceProxy,
		TrainingMemberServiceProxy,
		TrainingProgramServiceProxy,
	]
})
export class TrainingAttendancesComponent extends FilteredComponentBase<TrainingAttendanceDto> {
	items: TrainingAttendanceDto[] = [];

    @ViewChild('trainingAttendanceFormModal') trainingAttendanceFormModal: TrainingAttendanceFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			timeFromFilter: moment.Moment=null;
	timeToFilter: moment.Moment=null;
				trainingMemberIdFilter: string;
	trainingMemberIdList: TrainingMemberDto[] = null;
			trainingProgramIdFilter: string;
	trainingProgramIdList: TrainingProgramDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _trainingAttendanceService: TrainingAttendanceServiceProxy
			, private _trainingMemberService: TrainingMemberServiceProxy
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
			this._trainingAttendanceService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTrainingAttendanceDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TrainingAttendanceDto): void {
        abp.message.confirm(
            'Delete Training attendance?',
            (result: boolean) => {
                if (result) {
                    this._trainingAttendanceService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Training attendance: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				  
			if (this.timeFromFilter !== undefined && this.timeFromFilter !== null && this.timeFromFilter.toString() !== '')
				items.push({ FilterName: "Time", FilterType: FilterType.ge, FilterValue: moment(this.timeFromFilter).format("YYYY/MM/DD")  });
			if (this.timeToFilter !== undefined && this.timeToFilter !== null && this.timeToFilter.toString() !== '')
				items.push({ FilterName: "Time", FilterType: FilterType.le, FilterValue: moment(this.timeToFilter).format("YYYY/MM/DD")  });
						        if (this.trainingMemberIdFilter !== undefined && this.trainingMemberIdFilter !== null && this.trainingMemberIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingMemberId", FilterType: FilterType.in, FilterValue: this.trainingMemberIdFilter });
				        if (this.trainingProgramIdFilter !== undefined && this.trainingProgramIdFilter !== null && this.trainingProgramIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingProgramId", FilterType: FilterType.in, FilterValue: this.trainingProgramIdFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.trainingAttendanceFormModal.show();
    }

    edit(item: TrainingAttendanceDto): void {
        this.trainingAttendanceFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}