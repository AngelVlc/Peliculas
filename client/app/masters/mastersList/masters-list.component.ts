import { Component, OnInit, Input } from '@angular/core';
import { Master } from '../../_models/master';
import { MasterService } from '../../_services/master.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { FormsHelper } from '../../_helpers/forms.helper'

@Component({
    selector: 'master-list',
    templateUrl: './app/masters/mastersList/masters-list.component.html'
})

/*
Para usar las listas en otro sitio (ej dashboard html)
<master-list masterType="0" #types></master-list>
<master-list masterType="1" #locations></master-list>
*/

export class MasterListComponent implements OnInit {
    @Input() masterType: string;
    fromDashboard: boolean = true;
    items: Master[];

    constructor(private route: ActivatedRoute
                , private masterService: MasterService
                , private authenticationService: AuthenticationService
                , private formsHelper: FormsHelper) {  
        if (route.snapshot.data[0]) {        
            //puedo llegar aquí desde un enlace del menu y en ese caso no hay data                  
            this.masterType = route.snapshot.data[0].masterType;
            this.fromDashboard = false;
        }
    }  
    
    getRoute() {
        switch (this.masterType)
        {
            case '0':
                return '/type';
            case '1':
                return '/loc';
            default:
                break;
        }
    }

    getAll(): void {
        this.masterService.getAll(this.masterType)
            .subscribe((data: Master[]) => { this.items = data; });
    }

    ngOnInit(): void {
        this.getAll();
    }

    getFilmsCount(): number {
        var sum = 0;

        for (let item of this.items) {
            sum += item.count;
        }

        return sum;
    }
}