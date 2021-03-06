import { Directive, OnDestroy } from "@angular/core";
import { SubSink } from "subsink";

@Directive()
export abstract class AutoUnsubscribeComponent implements OnDestroy {
  protected subs = new SubSink();

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
