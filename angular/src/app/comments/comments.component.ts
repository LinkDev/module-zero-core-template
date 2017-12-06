import { Component, Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import * as moment from 'moment';
import { CommentServiceProxy, CommentDto, PagedResultDtoOfCommentDto } from '@shared/service-proxies/service-proxies';
import { ResponseServiceProxy, ResponseDto, PagedResultDtoOfResponseDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionGroupServiceProxy, QuestionGroupDto, PagedResultDtoOfQuestionGroupDto } from '@shared/service-proxies/service-proxies';
import { CommentFormComponent } from "app/comments/comment-form/comment-form.component";
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";

@Component({
	selector: 'comment',
    templateUrl: './comments.component.html',
    animations: [appModuleAnimation()],
    providers: [
		CommentServiceProxy,
		ResponseServiceProxy,
		QuestionServiceProxy,
		QuestionGroupServiceProxy,
	]
})
export class CommentsComponent extends FilteredComponentBase<CommentDto> {
	items: CommentDto[] = [];

    @ViewChild('commentFormModal') commentFormModal: CommentFormComponent;
    trueFalseList:any=[{name:"True",value:"true"},{name:"False",value:"false"}];
			responseIdFilter: string;
	responseIdList: ResponseDto[] = null;
			questionIdFilter: string;
	questionIdList: QuestionDto[] = null;
			questionGroupIdFilter: string;
	questionGroupIdList: QuestionGroupDto[] = null;
			userIdFilter: string;
			userNameFilter: string;
			titleFilter: string;
			bodyFilter: string;
			dateFromFilter: moment.Moment=null;
	dateToFilter: moment.Moment=null;
		constructor(
        injector: Injector,
		private route: Router,
		private activatedRoute: ActivatedRoute,
        private _commentService: CommentServiceProxy
			, private _responseService: ResponseServiceProxy
			, private _questionService: QuestionServiceProxy
			, private _questionGroupService: QuestionGroupServiceProxy
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
			this._commentService.getAll(request.maxResultCount, request.skipCount ,request.search,request.sorting)
				.finally(() => {
					finishedCallback();
				})
				.subscribe((result: PagedResultDtoOfCommentDto) => {
					this.items = result.items;
					this.showPaging(result, pageNumber);
				});
    }
    protected delete(item: CommentDto): void {
        abp.message.confirm(
            'Delete Comment?',
            (result: boolean) => {
                if (result) {
                    this._commentService.delete(item.id)
                        .finally(() => {
                            abp.notify.info('Deleted Comment: ' + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }
	search(): void {
        let items = new Array<FilterCriteria>();
				        if (this.responseIdFilter !== undefined && this.responseIdFilter !== null && this.responseIdFilter.toString() !== '')
		items.push({ FilterName: "ResponseId", FilterType: FilterType.in, FilterValue: this.responseIdFilter });
				        if (this.questionIdFilter !== undefined && this.questionIdFilter !== null && this.questionIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionId", FilterType: FilterType.in, FilterValue: this.questionIdFilter });
				        if (this.questionGroupIdFilter !== undefined && this.questionGroupIdFilter !== null && this.questionGroupIdFilter.toString() !== '')
		items.push({ FilterName: "QuestionGroupId", FilterType: FilterType.in, FilterValue: this.questionGroupIdFilter });
				        if (this.userIdFilter !== undefined && this.userIdFilter !== null && this.userIdFilter.toString() !== '')
        items.push({ FilterName: "UserId", FilterType: FilterType.like, FilterValue: this.userIdFilter });
						        if (this.userNameFilter !== undefined && this.userNameFilter !== null && this.userNameFilter.toString() !== '')
        items.push({ FilterName: "UserName", FilterType: FilterType.like, FilterValue: this.userNameFilter });
						        if (this.titleFilter !== undefined && this.titleFilter !== null && this.titleFilter.toString() !== '')
        items.push({ FilterName: "Title", FilterType: FilterType.like, FilterValue: this.titleFilter });
						        if (this.bodyFilter !== undefined && this.bodyFilter !== null && this.bodyFilter.toString() !== '')
        items.push({ FilterName: "Body", FilterType: FilterType.like, FilterValue: this.bodyFilter });
						  
			if (this.dateFromFilter !== undefined && this.dateFromFilter !== null && this.dateFromFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.ge, FilterValue: moment(this.dateFromFilter).format("YYYY/MM/DD")  });
			if (this.dateToFilter !== undefined && this.dateToFilter !== null && this.dateToFilter.toString() !== '')
				items.push({ FilterName: "Date", FilterType: FilterType.le, FilterValue: moment(this.dateToFilter).format("YYYY/MM/DD")  });
		
        this.Filter(items);
    }
    // Show Modals
    create(): void {
        this.commentFormModal.show();
    }

    edit(item: CommentDto): void {
        this.commentFormModal.show(item.id);
    }

	navigate(to: string): void {
        this.route.navigateByUrl(to);
    }

}