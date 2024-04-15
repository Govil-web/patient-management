import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value: any): { key: string, value: string }[] {
    // Asegúrate de que value es un objeto y tiene propiedades
    if (value && typeof value === 'object') {
      return Object.keys(value)
        .filter(key => isNaN(Number(key)))  // Filtra las claves que no son numéricas
        .map(key => ({
          key: key,
          value: value[key]
        }));
    }
    return [];
  }
}
