import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { StudentServiceProxy, StudentDto, PagedResultDtoOfStudentDto } from '@shared/service-proxies/service-proxies';
import { PagedAndSortedListingComponentBase, PagedAndSortedRequestDto } from "shared/paged-sorted-listing-component-base"
import { StudentFormComponent } from "app/students/student-form/student.form.component";
import { EditStudentComponent } from "app/students/edit-student/edit-student.component";

@Component({
    templateUrl: './students.component.html',
    animations: [appModuleAnimation()],
    providers: [StudentServiceProxy]
})
export class StudentsComponent extends PagedAndSortedListingComponentBase<StudentDto> {

    @ViewChild('studentFormModal') studentFormModal: StudentFormComponent;
    @ViewChild('editStudentModal') editStudentModal: EditStudentComponent;

    active: boolean = false;
    items: StudentDto[] = [];
    
	constructor(
        injector: Injector,
        private _studentService: StudentServiceProxy

    ) {

        super(injector);
    }
    

    protected list(request: PagedAndSortedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._studentService.getAll(request.sorting, request.skipCount, request.maxResultCount)
            .finally(() => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfStudentDto) => {
                this.items = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(item: StudentDto): void {
        abp.message.confirm(
            "Delete Student '" + item.id + "'?",
            (result: boolean) => {
                if (result) {
                    this._studentService.delete(item.id)
                        .finally(() => {
                            abp.notify.info("Deleted Student: " + item.id);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show Modals
    create(): void {
        this.studentFormModal.show();
    }

    edit(item: StudentDto): void {
        this.studentFormModal.show(item.id);
    }

}