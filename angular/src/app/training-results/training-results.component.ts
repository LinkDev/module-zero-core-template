import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { TrainingResultServiceProxy, TrainingResultDto, PagedResultDtoOfTrainingResultDto } from '@shared/service-proxies/service-proxies';
import { TrainingMemberServiceProxy, TrainingMemberDto, PagedResultDtoOfTrainingMemberDto } from '@shared/service-proxies/service-proxies';
import { TrainingExamServiceProxy, TrainingExamDto, PagedResultDtoOfTrainingExamDto } from '@shared/service-proxies/service-proxies';
import { TrainingResultFormComponent } from "app/training-results/training-result-form/training-result-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'training-result',
    templateUrl: './training-results.component.html',
    animations: [appModuleAnimation()],
    providers: [
		TrainingResultServiceProxy,
		TrainingMemberServiceProxy,
		TrainingExamServiceProxy,
	]
})
export class TrainingResultsComponent extends FilteredComponentBase<TrainingResultDto> {
	items: TrainingResultDto[] = [];

    @ViewChild('trainingResultFormModal') trainingResultFormModal: TrainingResultFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			trainingMemberIdFilter: string;
	trainingMemberIdList: TrainingMemberDto[] = null;
			trainingExamIdFilter: string;
	trainingExamIdList: TrainingExamDto[] = null;
			scoreFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _trainingResultService: TrainingResultServiceProxy
			, private _trainingMemberService: TrainingMemberServiceProxy
			, private _trainingExamService: TrainingExamServiceProxy
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
			this._trainingResultService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfTrainingResultDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: TrainingResultDto): void {
        abp.message.confirm(
            'Delete Training result?',
            (result: boolean) => {
                if (result) {
                    this._trainingResultService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Training result: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.trainingMemberIdFilter !== undefined && this.trainingMemberIdFilter !== null && this.trainingMemberIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingMemberId", FilterType: FilterType.in, FilterValue: this.trainingMemberIdFilter });
				        if (this.trainingExamIdFilter !== undefined && this.trainingExamIdFilter !== null && this.trainingExamIdFilter.toString() !== '')
		items.push({ FilterName: "TrainingExamId", FilterType: FilterType.in, FilterValue: this.trainingExamIdFilter });
				        if (this.scoreFilter !== undefined && this.scoreFilter !== null && this.scoreFilter.toString() !== '')
		items.push({ FilterName: "Score", FilterType: FilterType.eq, FilterValue: this.scoreFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.trainingResultFormModal.show();
    }

    edit(item: TrainingResultDto): void {
        this.trainingResultFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}