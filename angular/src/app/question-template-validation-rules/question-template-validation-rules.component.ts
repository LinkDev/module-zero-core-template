import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionTemplateValidationRuleServiceProxy, QuestionTemplateValidationRuleDto, PagedResultDtoOfQuestionTemplateValidationRuleDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateServiceProxy, QuestionTemplateDto, PagedResultDtoOfQuestionTemplateDto } from '@shared/service-proxies/service-proxies';
import { QuestionTemplateValidationRuleFormComponent } from "app/question-template-validation-rules/question-template-validation-rule-form/question-template-validation-rule-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'question-template-validation-rule',
    templateUrl: './question-template-validation-rules.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionTemplateValidationRuleServiceProxy,
		QuestionTemplateServiceProxy,
	]
})
export class QuestionTemplateValidationRulesComponent extends FilteredComponentBase<QuestionTemplateValidationRuleDto> {
	items: QuestionTemplateValidationRuleDto[] = [];

    @ViewChild('questionTemplateValidationRuleFormModal') questionTemplateValidationRuleFormModal: QuestionTemplateValidationRuleFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			questionTemplateIdFilter: string;
	questionTemplateIdList: QuestionTemplateDto[] = null;
			ruleTypeFilter: number;
			errorMessageFilter: string;
			answersFilter: string;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionTemplateValidationRuleService: QuestionTemplateValidationRuleServiceProxy
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
			this._questionTemplateValidationRuleService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionTemplateValidationRuleDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionTemplateValidationRuleDto): void {
        abp.message.confirm(
            'Delete Question template validation rule?',
            (result: boolean) => {
                if (result) {
                    this._questionTemplateValidationRuleService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Question template validation rule: ' + item.id);
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
				        if (this.ruleTypeFilter !== undefined && this.ruleTypeFilter !== null && this.ruleTypeFilter.toString() !== '')
		items.push({ FilterName: "RuleType", FilterType: FilterType.eq, FilterValue: this.ruleTypeFilter });
				        if (this.errorMessageFilter !== undefined && this.errorMessageFilter !== null && this.errorMessageFilter.toString() !== '')
        items.push({ FilterName: "ErrorMessage", FilterType: FilterType.like, FilterValue: this.errorMessageFilter });
						        if (this.answersFilter !== undefined && this.answersFilter !== null && this.answersFilter.toString() !== '')
        items.push({ FilterName: "Answers", FilterType: FilterType.like, FilterValue: this.answersFilter });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionTemplateValidationRuleFormModal.show();
    }

    edit(item: QuestionTemplateValidationRuleDto): void {
        this.questionTemplateValidationRuleFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}