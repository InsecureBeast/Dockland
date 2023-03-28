import { Pipe, PipeTransform } from '@angular/core';

 const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
 const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

 @Pipe({
   name: 'formatFileSize'
 })
 export class FormatFileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm: boolean): string {
    const units = longForm
      ? FILE_SIZE_UNITS_LONG
      : FILE_SIZE_UNITS;

    if (!+sizeInBytes) 
      return '0 Bytes'

    const k = 1024
    const dm = 2;
    const power = Math.floor(Math.log(sizeInBytes) / Math.log(k))
    const formattedSize = parseFloat((sizeInBytes / Math.pow(k, power)).toFixed(dm));    
    const unit = units[power];
    return `${formattedSize} ${unit}`;
  }
}
