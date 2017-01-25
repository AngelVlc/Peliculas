import { Component, OnInit, Input } from '@angular/core';
import { Master } from '../_models/master';
import { MasterService } from '../_services/master.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'master-list',
    template: `
    <h3>Maestro {{masterType}}</h3>
  `
})

export class MasterListComponent implements OnInit {
    @Input() masterType: string;

    items: Master[];

    constructor(private route: ActivatedRoute
                , private masterService: MasterService) {  
        if (route.snapshot.data[0]) {                          
            this.masterType = route.snapshot.data[0].masterType;
        }
    }

    getAll(): void {
        this.masterService.getAll(this.masterType)
            .subscribe((data: Master[]) => { this.items = data; });
    }

    ngOnInit(): void {
        this.getAll();
    }
}