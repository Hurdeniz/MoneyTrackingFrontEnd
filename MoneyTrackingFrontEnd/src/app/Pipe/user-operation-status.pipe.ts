import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userOperationStatus'
})
export class UserOperationStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var status ;
    if(value==true){
      return status='Aktif'
    }
    else
    {
      return status='Pasif'
    }
  }

}
