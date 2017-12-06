import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit, AfterViewInit,ViewChildren,QueryList } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { CommentServiceProxy, CommentDto, PagedResultDtoOfCommentDto } from '@shared/service-proxies/service-proxies';
import { ResponseServiceProxy, ResponseDto, PagedResultDtoOfResponseDto } from '@shared/service-proxies/service-proxies';
import { QuestionServiceProxy, QuestionDto, PagedResultDtoOfQuestionDto } from '@shared/service-proxies/service-proxies';
import { QuestionGroupServiceProxy, QuestionGroupDto, PagedResultDtoOfQuestionGroupDto } from '@shared/service-proxies/service-proxies';
import { FormComponentBase } from '@shared/form-component-base';
import * as _ from "lodash";

@Component({
  selector: 'comment-form-modal',
  templateUrl: './comment-form.component.html'
})
export class CommentFormComponent extends FormComponentBase<CommentDto> implements OnInit, AfterViewInit {
	responseIdList: ResponseDto[] = null;
	questionIdList: QuestionDto[] = null;
	questionGroupIdList: QuestionGroupDto[] = null;
	
    constructor(
        injector: Injector,
			private _commentService: CommentServiceProxy, 
		private _responseService: ResponseServiceProxy
, 
		private _questionService: QuestionServiceProxy
, 
		private _questionGroupService: QuestionGroupServiceProxy
    ) {
        super(injector);
    }

	ngOnInit() {

    }

	show(id?:string): void {
        if (!id) {
            this.active = true;
            this.modal.show();
            this.item = new CommentDto();
			this.item.id= '00000000-0000-0000-0000-000000000000';
			this.item.responseId= '00000000-0000-0000-0000-000000000000';
            this.isNew = true;
        }
        else {
            this._commentService.get(id)
                .subscribe(
                (result) => {
                    this.item = result;
                    this.active = true;
                    this.modal.show();
                });
            this.isNew = false;
        }
    }

	save(): void {
        console.log(this.item);
        this.saving = true;

        if (this.isNew) {
            this._commentService.create(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
        else {
            this._commentService.update(this.item)
                .finally(() => { this.saving = false; })
                .subscribe(() => {
                    this.notify.info(this.l('Saved Successfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }
}