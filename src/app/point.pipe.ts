import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'point'
})
export class PointPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    value = value.split("").reverse().join("");
    let str = '';
    for (let i = 0; i < value.toString().length; i++) {
      if (i % 3 === 0) {
        str += '.';
      }
      str += value.toString()[i];
    }
    str = str.split("").reverse().join("");
    if (str.charAt(str.length - 1) === '.') {
      str = str.slice(0, str.length - 1);
    }
    if (args[0]) {
      str += args[0];
    }
    console.log(str);
    
    return str;
  }

}
