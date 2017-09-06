import { Injectable } from '@angular/core';

@Injectable()
export class BreadCrumbService {

    public breadcrumb: any [] =[];

    setValue(val) {
        this.breadcrumb.push(val);
    }

    getValue() {
        return this.breadcrumb;
    }
}