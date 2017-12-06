import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ExamResultServiceProxy, ExamResultDto, PagedResultDtoOfExamResultDto } from '@shared/service-proxies/service-proxies';
import { ExamResultFormComponent } from "app/exam-results/exam-result-form/exam-result-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'exam-result',
    templateUrl: './exam-results.component.html',
    animations: [appModuleAnimation()],
    providers: [
		ExamResultServiceProxy,
	]
})
export class ExamResultsComponent extends FilteredComponentBase<ExamResultDto> {
	items: ExamResultDto[] = [];

    @ViewChild('examResultFormModal') examResultFormModal: ExamResultFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			userIdFilter: string;
			questionnaireIdFilter: string;
			scoreFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _examResultService: ExamResultServiceProxy
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
			this._examResultService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfExamResultDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: ExamResultDto): void {
        abp.message.confirm(
            'Delete Exam result?',
            (result: boolean) => {
                if (result) {
                    this._examResultService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Exam result: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						        if (this.questionnaireIdFilter !== undefined && this.questionnaireIdFilter !== null && this.questionnaireIdFilter.toString() !== '')
        items.push({ FilterName: "QuestionnaireId", FilterType: FilterType.like, FilterValue: this.questionnaireIdFilter });
						        if (this.scoreFilter !== undefined && this.scoreFilter !== null && this.scoreFilter.toString() !== '')
		items.push({ FilterName: "Score", FilterType: FilterType.eq, FilterValue: this.scoreFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.examResultFormModal.show();
    }

    edit(item: ExamResultDto): void {
        this.examResultFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}