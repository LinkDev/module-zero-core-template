import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import {PagedAndSortedListingComponentBase,PagedAndSortedRequestDto } from "shared/paged-sorted-listing-component-base"
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './users.component.html',
    animations: [appModuleAnimation()]
})
export class UsersComponent extends PagedAndSortedListingComponentBase<UserDto> {

    @ViewChild('createUserModal') createUserModal: CreateUserComponent;
    @ViewChild('editUserModal') editUserModal: EditUserComponent;

    active: boolean = false;
    users: UserDto[] = [];
    searchKey:string;
    roleId: number = -1;
    roles: RoleDto[] = null;
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy

    ) {
        
        super(injector);
    }
    

    protected list(request: PagedAndSortedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._userService.getAll(request.skipCount, request.maxResultCount, this.searchKey,request.sorting,this.roleId)
            .finally(() => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfUserDto) => {
                this.users = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    search() {
        console.log(this.searchKey);
        this.refresh();
    }
    protected delete(user: UserDto): void {
        abp.message.confirm(
            "Delete user '" + user.fullName + "'?",
            (result: boolean) => {
                if (result) {
                    this._userService.delete(user.id)
                        .finally(() => {
                            abp.notify.info("Deleted User: " + user.fullName);
                            this.refresh();
                        })
                        .subscribe(() => { });
                }
            }
        );
    }

    // Show Modals
    createUser(): void {
        this.createUserModal.show();
    }

    editUser(user: UserDto): void {
        this.editUserModal.show(user.id);
    }

    externalMethod():void {
        this._userService.getRoles()
            .subscribe((result) => {
                this.roles = result.items;
            });
    }
}