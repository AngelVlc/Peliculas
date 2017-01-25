import { Injectable } from '@angular/core';

@Injectable()
export class FormsHelper {
    confirmDeleteTitle: string = '¿Está seguro?';
    confirmDeleteText: string = 'Si';
    confirmCancelText: string = 'No';


    yesNoValues = [
        { value: 0, display: 'No'}
        , { value: 1, display: 'Si'}
    ];

    getMasterName(masterType: string) {
        switch (masterType)
        {
            case "0":
                return 'tipos';
            case "1":
                return 'localizaziones';
            default:
                break;
        }
    }   

    constructor() { }
   
}