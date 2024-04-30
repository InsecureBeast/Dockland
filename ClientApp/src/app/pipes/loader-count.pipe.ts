import { Pipe, PipeTransform } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Pipe({
  name: 'loaderCount',
  standalone: true
})
export class LoaderCountPipe implements PipeTransform {

  constructor(private readonly _route: ActivatedRoute) {
  }

 transform(array: number[] | null): number[] | null {
    if (!array)
      return [];
    
    const filter = this._route.snapshot.queryParamMap.get("name");
    return filter ? [1] : array;
 }
}