import { ErrorHandler } from '@angular/core';

export class MyErrorHandler extends ErrorHandler {
 
 constructor() { 
   // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
   // when an error happens. If we do not rethrow, bootstrap will always succeed.
   super(true);
 }
 
  handleError(error) {
   // send the error to the server
   
   // delegate to the default handler
   super.handleError(error); 
  }
}