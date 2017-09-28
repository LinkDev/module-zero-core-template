import { Component, Input, Output, EventEmitter, OnInit, Optional, Injector, Inject, OpaqueToken, InjectionToken, forwardRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploaderOptions, FileLikeObject, FileItem } from "ng2-file-upload";
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UploadImageInput),
  multi: true
};
@Component({
  selector: 'upload-image',
  template: `
    <div style="border:2px dashed grey" ng2FileDrop [ngClass]="{'nv-file-over': hasBaseDropZoneOver}" (fileOver)="fileOverBase($event)"
        [uploader]="uploader" class="well my-drop-zone">
        <div class="text-center ">
          <label class="btn btn-primary">
            select one or more file to upload 
            <input type="file" ng2FileSelect [uploader]="uploader" [multiple]="multiple" [accept]="allowedMimeType.toString()" style="display: none" />
          </label>
          <p *ngIf="!uploader.queue.length"><b>Or <br /></b> Drag and Drop Files Here <br/> </p>
        </div>
      <img class="img-responsive" *ngIf="imgSrc!=null" [src]="imgSrc" />
    </div>
`,
providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class UploadImageInput implements OnInit,ControlValueAccessor {
  onChange = (fn: string) => { };
  onTouched = () => { };

  public hasBaseDropZoneOver: boolean = false;
  @Output() fileUploaded: EventEmitter<any> = new EventEmitter();
  @Input() autoUpload: boolean = true;
  @Input() multiple: boolean = false;
  allowedMimeType = ['image/png', 'image/gif', 'image/jpeg'];
  private baseUrl: string = undefined;
  public uploader: FileUploader
  imgSrc: string = null;

  private innerValue: string[];

  constructor(inject:Injector, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.baseUrl = baseUrl ? baseUrl : "";
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit() {
    this.uploader = new FileUploader(
      {
        url: this.baseUrl+"/api/Upload/UploadFile",
        autoUpload: this.autoUpload,
        allowedMimeType: this.allowedMimeType
      });
    this.uploader.onSuccessItem = (item: FileItem, response: any, status: number, headers) => {
      let x = JSON.parse(response);
      this.fileUploaded.emit(x.result);
      this.writeValue(x.result);
      this.imgSrc = this.baseUrl+"/api/Upload/GetImage?FileName=" + x.result;
      this.uploader.clearQueue();
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


