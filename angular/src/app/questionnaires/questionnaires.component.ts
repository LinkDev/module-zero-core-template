import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { QuestionnaireServiceProxy, QuestionnaireDto, PagedResultDtoOfQuestionnaireDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { QuestionnaireFormComponent } from "app/questionnaires/questionnaire-form/questionnaire-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'questionnaire',
    templateUrl: './questionnaires.component.html',
    animations: [appModuleAnimation()],
    providers: [
		QuestionnaireServiceProxy,
		PhaseServiceProxy,
	]
})
export class QuestionnairesComponent extends FilteredComponentBase<QuestionnaireDto> {
	items: QuestionnaireDto[] = [];

    @ViewChild('questionnaireFormModal') questionnaireFormModal: QuestionnaireFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			titleFilter: string;
			descriptionFilter: string;
			typeFilter: number;
			createdDateFromFilter: moment.Moment=null;
	createdDateToFilter: moment.Moment=null;
				phaseIdFilter: string;
	phaseIdList: PhaseDto[] = null;
			isActiveFilter: boolean;
			questionsCountFilter: number;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _questionnaireService: QuestionnaireServiceProxy
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
			this._questionnaireService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfQuestionnaireDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: QuestionnaireDto): void {
        abp.message.confirm(
            'Delete Questionnaire?',
            (result: boolean) => {
                if (result) {
                    this._questionnaireService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Questionnaire: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						        if (this.descriptionFilter !== undefined && this.descriptionFilter !== null && this.descriptionFilter.toString() !== '')
        items.push({ FilterName: "Description", FilterType: FilterType.like, FilterValue: this.descriptionFilter });
						        if (this.typeFilter !== undefined && this.typeFilter !== null && this.typeFilter.toString() !== '')
		items.push({ FilterName: "Type", FilterType: FilterType.eq, FilterValue: this.typeFilter });
				  
			if (this.createdDateFromFilter !== undefined && this.createdDateFromFilter !== null && this.createdDateFromFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.ge, FilterValue: moment(this.createdDateFromFilter).format("YYYY/MM/DD")  });
			if (this.createdDateToFilter !== undefined && this.createdDateToFilter !== null && this.createdDateToFilter.toString() !== '')
				items.push({ FilterName: "CreatedDate", FilterType: FilterType.le, FilterValue: moment(this.createdDateToFilter).format("YYYY/MM/DD")  });
						        if (this.phaseIdFilter !== undefined && this.phaseIdFilter !== null && this.phaseIdFilter.toString() !== '')
		items.push({ FilterName: "PhaseId", FilterType: FilterType.in, FilterValue: this.phaseIdFilter });
				        if (this.isActiveFilter !== undefined && this.isActiveFilter !== null && this.isActiveFilter.toString() !== '')
		items.push({ FilterName: "IsActive", FilterType: FilterType.eq, FilterValue: this.isActiveFilter });
				        if (this.questionsCountFilter !== undefined && this.questionsCountFilter !== null && this.questionsCountFilter.toString() !== '')
		items.push({ FilterName: "QuestionsCount", FilterType: FilterType.eq, FilterValue: this.questionsCountFilter });

        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.questionnaireFormModal.show();
    }

    edit(item: QuestionnaireDto): void {
        this.questionnaireFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}