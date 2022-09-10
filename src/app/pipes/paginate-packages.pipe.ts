import { PackageResponse } from './../interfaces/package';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginatePackages',
})
export class PaginatePackagesPipe implements PipeTransform {
  transform(packages: PackageResponse[], page: number): PackageResponse[] {
    return packages.slice(page, page + 5);
  }
}
