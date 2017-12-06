import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TrainingProgramServiceProxy, TrainingProgramDto, PagedResultDtoOfTrainingProgramDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { TrainingProgramFormComponent } from "app/training-programs/training-program-form/training-program-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'training-program',
    templateUrl: './training-programs.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TrainingProgramServiceProxy,
		PhaseServiceProxy,
	]
})
export class TrainingProgramsComponent extends FilteredComponentBase<TrainingProgramDto> {
	items: TrainingProgramDto[] = [];

    @ViewChild('trainingProgramFormModal') trainingProgramFormModal: TrainingProgramFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			nameFilter: string;
			fromFromFilter: moment.Moment=null;
	fromToFilter: moment.Moment=null;
				toFromFilter: moment.Moment=null;
	toToFilter: moment.Moment=null;
				phaseIdFilter: string;
	phaseIdList: PhaseDto[] = null;
			isActiveFilter: boolean;
			attendanceTimeFilter: string;
			roleIdFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _trainingProgramService: TrainingProgramServiceProxy
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
			this._trainingProgramService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTrainingProgramDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TrainingProgramDto): void {
        abp.message.confirm(
            'Delete Training program?',
            (result: boolean) => {
                if (result) {
                    this._trainingProgramService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Training program: ' + item.id);
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
						  
			if (this.fromFromFilter !== undefined && this.fromFromFilter !== null && this.fromFromFilter.toString() !== '')
				items.push({ FilterName: "From", FilterType: FilterType.ge, FilterValue: moment(this.fromFromFilter).format("YYYY/MM/DD")  });
			if (this.fromToFilter !== undefined && this.fromToFilter !== null && this.fromToFilter.toString() !== '')
				items.push({ FilterName: "From", FilterType: FilterType.le, FilterValue: moment(this.fromToFilter).format("YYYY/MM/DD")  });
						  
			if (this.toFromFilter !== undefined && this.toFromFilter !== null && this.toFromFilter.toString() !== '')
				items.push({ FilterName: "To", FilterType: FilterType.ge, FilterValue: moment(this.toFromFilter).format("YYYY/MM/DD")  });
			if (this.toToFilter !== undefined && this.toToFilter !== null && this.toToFilter.toString() !== '')
				items.push({ FilterName: "To", FilterType: FilterType.le, FilterValue: moment(this.toToFilter).format("YYYY/MM/DD")  });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
		items.push({ FilterName: "PhaseId", FilterType: FilterType.in, FilterValue: this.phaseIdFilter });
				        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				        if (this.attendanceTimeFilter !== undefined && this.attendanceTimeFilter !== null && this.attendanceTimeFilter.toString() !== '')
        items.push({ FilterName: "AttendanceTime", FilterType: FilterType.like, FilterValue: this.attendanceTimeFilter });
						        if (this.roleIdFilter !== undefined && this.roleIdFilter !== null && this.roleIdFilter.toString() !== '')
        items.push({ FilterName: "RoleId", FilterType: FilterType.like, FilterValue: this.roleIdFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.trainingProgramFormModal.show();
    }

    edit(item: TrainingProgramDto): void {
        this.trainingProgramFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}