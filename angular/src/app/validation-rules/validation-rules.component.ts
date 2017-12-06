import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { ValidationRuleDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { ValidationRuleFormComponent } from "app/validation-rules/validation-rule-form/validation-rule-form.component";
import { InlineListComponentBase } from "@shared/inline-list-component-base";

@Component({
	selector: 'validation-rule',
    templateUrl: './validation-rules.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionServiceProxy,
	]
})
export class ValidationRulesComponent extends InlineListComponentBase<ValidationRuleDto> {

    @ViewChild('validationRuleFormModal') validationRuleFormModal: ValidationRuleFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			questionIdFilter: string;
	questionIdList: QuestionDto[] = null;
			questionGroupIdFilter: string;
			answersFilter: string;
			dependentQuestionIdFilter: string;
			dependentAnswersFilter: string;
			dependentQuestionsFilter: string;
			ruleTypeFilter: number;
			errorMessageFilter: string;
			isActiveFilter: boolean;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
    ) {

        super(injector);
    }

    protected delete(item: ValidationRuleDto): void {
        abp.message.confirm(
            'Delete Validation rule?',
            (result: boolean) => {
                if (result) {
					let index = this.items.findIndex(x => x.id == item.id);
                    this.items.splice(index, 1);
                    abp.notify.info('Deleted Validation rule');
                    return;
                }
            }
        );
    }
    // Show Modals
    create(): void {
        this.validationRuleFormModal.show();
    }

    edit(item: ValidationRuleDto): void {
		this.validationRuleFormModal.show(item);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}