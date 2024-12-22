import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberWithCommas'
})
export class NumberWithCommasPipe implements PipeTransform {
    transform(value: any): string {
        if (value == null) {
            return '';
        }
        // Ensure the value is a number and format it
        let num = value.toString();
        const [integer, decimal] = num.split('.');
        const formattedInteger = integer.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
    }
}
