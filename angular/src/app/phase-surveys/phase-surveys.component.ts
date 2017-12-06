import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { PhaseSurveyServiceProxy, PhaseSurveyDto, PagedResultDtoOfPhaseSurveyDto } from '@shared/service-proxies/service-proxies';
import { PhaseServiceProxy, PhaseDto, PagedResultDtoOfPhaseDto } from '@shared/service-proxies/service-proxies';
import { SurveyServiceProxy, SurveyDto, PagedResultDtoOfSurveyDto } from '@shared/service-proxies/service-proxies';
import { PhaseSurveyFormComponent } from "app/phase-surveys/phase-survey-form/phase-survey-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'phase-survey',
    templateUrl: './phase-surveys.component.html',
    animations: [appModuleAnimation()],
    providers: [
		PhaseSurveyServiceProxy,
		PhaseServiceProxy,
		SurveyServiceProxy,
	]
})
export class PhaseSurveysComponent extends FilteredComponentBase<PhaseSurveyDto> {
	items: PhaseSurveyDto[] = [];

    @ViewChild('phaseSurveyFormModal') phaseSurveyFormModal: PhaseSurveyFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			phaseIdFilter: string;
	phaseIdList: PhaseDto[] = null;
			surveyIdFilter: string;
	surveyIdList: SurveyDto[] = null;
	constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _phaseSurveyService: PhaseSurveyServiceProxy
			, private _phaseService: PhaseServiceProxy
			, private _surveyService: SurveyServiceProxy
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
			this._phaseSurveyService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfPhaseSurveyDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: PhaseSurveyDto): void {
        abp.message.confirm(
            'Delete Phase survey?',
            (result: boolean) => {
                if (result) {
                    this._phaseSurveyService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Phase survey: ' + item.id);
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
        this.phaseSurveyFormModal.show();
    }

    edit(item: PhaseSurveyDto): void {
        this.phaseSurveyFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}