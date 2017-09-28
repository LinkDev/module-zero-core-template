import { Component, Input, Output, EventEmitter, OnInit, Injector, Optional, Inject, OpaqueToken, forwardRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploaderOptions, FileLikeObject, FileItem } from "ng2-file-upload";
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UploadInput),
  multi: true
};


@Component({
  selector: 'upload-input',
  template: `
      <div style="border:2px dashed grey" ng2FileDrop [ngClass]="{'nv-file-over': hasBaseDropZoneOver}" (fileOver)="fileOverBase($event)"
        [uploader]="uploader" class="well my-drop-zone">
        <div class="text-center ">
          <label class="btn btn-primary">
            select one or more file to upload <input type="file" ng2FileSelect [uploader]="uploader" [multiple]="multiple" style="display: none" />
          </label>
          <p *ngIf="!uploader.queue.length"><b>Or <br /></b> Drag and Drop Files Here <br/> </p>
        </div>
        <table class="table" *ngIf="uploader.queue.length">
            <tr *ngFor="let item of uploader.queue">
              <td><strong>{{ item?.file?.name }}</strong></td>
              <td>
                <div class="progress" style="margin-bottom: 0;">
                  <div class="progress-bar progress-bar-striped" role="progressbar" [ngStyle]="{ 'width': item.progress + '%' }">
                    {{item.progress| number}} %
                  </div>
                </div>
              </td>
              <td>
                <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                <span *ngIf="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
              </td>
              <td nowrap>

                <button type="button" class="btn btn-danger btn-xs" (click)="item.remove()">
                                <span class="glyphicon glyphicon-trash"></span>
                            </button>
              </td>
            </tr>
          </table>
      </div>
`,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class UploadInput implements OnInit, ControlValueAccessor {
  onChange = (fn: string) => { };
  onTouched = () => { };

  public hasBaseDropZoneOver: boolean = false;
  @Output() fileUploaded: EventEmitter<any> = new EventEmitter();
  @Input() autoUpload: boolean = true;
  @Input() multiple: boolean = false;
  private baseUrl: string = undefined;
  public uploader: FileUploader

  private innerValue: string[];

  constructor(private injector: Injector, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.baseUrl = baseUrl ? baseUrl : "";
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  ngOnInit() {
    if (!this.multiple) {
      this.uploader = new FileUploader(
        {
          url: this.baseUrl + "/api/Upload/UploadFile",
          autoUpload: this.autoUpload,
          queueLimit: 1
        });
    }
    else {
      this.uploader = new FileUploader(
        {
          url: this.baseUrl + "/api/Upload/UploadFile",
          autoUpload: this.autoUpload
        });
    }

    this.uploader.onSuccessItem = (item: FileItem, response: any, status: number, headers) => {
      let x = JSON.parse(response);
      this.writeValue(x.result);
      this.fileUploaded.emit(x.result);
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  get value(): string {
    return this.innerValue.toString();
  };

  //set accessor including call the onchange callback
  set value(v: string) {
    if (v === undefined || v === null) {
      this.innerValue = [];
    }
    else if (v !== this.value)
      this.innerValue.push(v);

    this.onChange(v);
  }


  writeValue(obj: any): void {
    this.value = obj
    this.onChange(this.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}



