import { Component, Injector, ViewChild, Input, ViewChildren,QueryList,ElementRef} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { UserServiceProxy, UserDto, PagedResultDtoOfUserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import { PagedAndSortedListingComponentBase, PagedAndSortedRequestDto } from "shared/paged-sorted-listing-component-base"
import { FilteredComponentBase, FilterCriteria, FilteredResultRequestDto, FilterType } from "shared/filtered-component-base";
import { CreateUserComponent } from "app/users/create-user/create-user.component";
import { EditUserComponent } from "app/users/edit-user/edit-user.component";

@Component({
    templateUrl: './users.component.html',
    animations: [appModuleAnimation()]
})
export class UsersComponent extends FilteredComponentBase<UserDto>  {

    @ViewChild('createUserModal') createUserModal: CreateUserComponent;
    @ViewChild('editUserModal') editUserModal: EditUserComponent;

    active: boolean = false;
    users: UserDto[] = [];
    userNameSearch: string;
    roleId: number = -1;
    fullNameSearch: string;
    roles: RoleDto[] = null;

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy

    ) {

        super(injector);

    }


    protected list(request: FilteredResultRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._userService.getAll(request.search, request.maxResultCount, request.sorting, request.skipCount)
            .finally(() => {
                finishedCallback();
            })
            .subscribe((result: PagedResultDtoOfUserDto) => {
                this.users = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    search() {
        let items = new Array<FilterCriteria>();
        if (this.userNameSearch !== undefined && this.userNameSearch !== null && this.userNameSearch.trim() !== '')
            items.push({ FilterName: "UserName", FilterType: FilterType.like, FilterValue: this.userNameSearch });

        if (this.fullNameSearch !== undefined && this.fullNameSearch !== null && this.fullNameSearch !== '')
            items.push({ FilterName: "FullName", FilterType: FilterType.like, FilterValue: this.fullNameSearch });
        this.Filter(items);
    }
    protected delete(user: UserDto): void {
        abp.message.confirm(
            "Delete user '" + user.fullName + "'?",
            (result: boolean) => {
                if (result) {
                    this._userService.delete(user.id)
                        .subscribe(() => {
                            abp.notify.info("Deleted User: " + user.fullName);
                            this.refresh();
                        });
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

    ngOnInit(): void {
        super.ngOnInit();
        this._userService.getRoles()
            .subscribe((result) => {
                this.roles = result.items;
            });
    }
}