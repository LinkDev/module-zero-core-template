import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionTemplateAnswerServiceProxy, QuestionTemplateAnswerDto, PagedResultDtoOfQuestionTemplateAnswerDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateServiceProxy, QuestionTemplateDto, PagedResultDtoOfQuestionTemplateDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateAnswerFormComponent } from "app/question-template-answers/question-template-answer-form/question-template-answer-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question-template-answer',
    templateUrl: './question-template-answers.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionTemplateAnswerServiceProxy,
		QuestionTemplateServiceProxy,
	]
})
export class QuestionTemplateAnswersComponent extends FilteredComponentBase<QuestionTemplateAnswerDto> {
	items: QuestionTemplateAnswerDto[] = [];

    @ViewChild('questionTemplateAnswerFormModal') questionTemplateAnswerFormModal: QuestionTemplateAnswerFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			questionTemplateIdFilter: string;
	questionTemplateIdList: QuestionTemplateDto[] = null;
			nameFilter: string;
			nameEnFilter: string;
			codeFilter: string;
			orderFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionTemplateAnswerService: QuestionTemplateAnswerServiceProxy
			, private _questionTemplateService: QuestionTemplateServiceProxy
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
			this._questionTemplateAnswerService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionTemplateAnswerDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionTemplateAnswerDto): void {
        abp.message.confirm(
            'Delete Question template answer?',
            (result: boolean) => {
                if (result) {
                    this._questionTemplateAnswerService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question template answer: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.questionTemplateIdFilter !== undefined && this.questionTemplateIdFilter !== null && this.questionTemplateIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionTemplateId", FilterType: FilterType.in, FilterValue: this.questionTemplateIdFilter });
				        if (this.nameFilter !== undefined && this.nameFilter !== null && this.nameFilter.toString() !== '')
        items.push({ FilterName: "Name", FilterType: FilterType.like, FilterValue: this.nameFilter });
						        if (this.nameEnFilter !== undefined && this.nameEnFilter !== null && this.nameEnFilter.toString() !== '')
        items.push({ FilterName: "NameEn", FilterType: FilterType.like, FilterValue: this.nameEnFilter });
						        if (this.codeFilter !== undefined && this.codeFilter !== null && this.codeFilter.toString() !== '')
        items.push({ FilterName: "Code", FilterType: FilterType.like, FilterValue: this.codeFilter });
						        if (this.orderFilter !== undefined && this.orderFilter !== null && this.orderFilter.toString() !== '')
		items.push({ FilterName: "Order", FilterType: FilterType.eq, FilterValue: this.orderFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionTemplateAnswerFormModal.show();
    }

    edit(item: QuestionTemplateAnswerDto): void {
        this.questionTemplateAnswerFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}