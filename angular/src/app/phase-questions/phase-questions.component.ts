import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { PhaseQuestionServiceProxy, PhaseQuestionDto, PagedResultDtoOfPhaseQuestionDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { PhaseQuestionFormComponent } from "app/phase-questions/phase-question-form/phase-question-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'phase-question',
    templateUrl: './phase-questions.component.html',
    animations: [appModuleAnimation()],
    providers: [
		PhaseQuestionServiceProxy,
		PhaseServiceProxy,
		QuestionServiceProxy,
	]
})
export class PhaseQuestionsComponent extends FilteredComponentBase<PhaseQuestionDto> {
	items: PhaseQuestionDto[] = [];

    @ViewChild('phaseQuestionFormModal') phaseQuestionFormModal: PhaseQuestionFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			phaseIdFilter: string;
	phaseIdList: PhaseDto[] = null;
			questionIdFilter: string;
	questionIdList: QuestionDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _phaseQuestionService: PhaseQuestionServiceProxy
			, private _phaseService: PhaseServiceProxy
			, private _questionService: QuestionServiceProxy
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
			this._phaseQuestionService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfPhaseQuestionDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: PhaseQuestionDto): void {
        abp.message.confirm(
            'Delete Phase question?',
            (result: boolean) => {
                if (result) {
                    this._phaseQuestionService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Phase question: ' + item.id);
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
        this.phaseQuestionFormModal.show();
    }

    edit(item: PhaseQuestionDto): void {
        this.phaseQuestionFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}