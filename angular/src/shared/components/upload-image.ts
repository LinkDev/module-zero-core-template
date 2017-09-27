import { Component, Input, Output, EventEmitter, OnInit, Optional,Injector ,Inject, OpaqueToken,InjectionToken } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploaderOptions, FileLikeObject, FileItem } from "ng2-file-upload";
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

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
`
})
export class UploadImageInput implements OnInit {
  public hasBaseDropZoneOver: boolean = false;
  @Output() fileUploaded: EventEmitter<any> = new EventEmitter();
  @Input() autoUpload: boolean = true;
  @Input() multiple: boolean = false;
  allowedMimeType = ['image/png', 'image/gif', 'image/jpeg'];
  private baseUrl: string = undefined;
  public uploader: FileUploader
  imgSrc: string = null;
  constructor(inject:Injector, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    //let x=inject.get(API_BASE_URL);
    //console.log(baseUrl);
    this.baseUrl = baseUrl ? baseUrl : "";
    //console.log(this.ApiUrl);
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
      this.imgSrc = this.baseUrl+"/api/Upload/GetImage?FileName=" + x.result;
      this.uploader.clearQueue();
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }
}


