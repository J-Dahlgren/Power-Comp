import { Component, OnInit } from "@angular/core";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import { AutoUnsubscribeComponent } from "@pc/angular/util";
import {
  IClientPlatformEvents,
  IGroup,
  LifterData,
} from "@pc/power-comp/shared";
import { Clock, IEntity, SECOND } from "@pc/util";
import { merge, Observable, of, Subject, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import {
  GroupService,
  IPlatformEvents,
  PlatformDataService,
  PlatformSelectionService,
  PlatformTimerService,
} from "../../../core";
import { ClientEventService } from "../client-event.service";

@Component({
  selector: "pc-secretariat-control",
  templateUrl: "./secretariat-control.component.html",
  styleUrls: ["./secretariat-control.component.scss"],
})
export class SecretariatControlComponent
  extends AutoUnsubscribeComponent
  implements OnInit {
  groups$: Observable<IEntity<IGroup>[]>;
  activeGroupId$: Observable<number | null>;
  currentLifter$: Observable<IEntity<LifterData> | null>;
  private timerClicks = new Subject<Clock>();
  showDecisions$: Observable<boolean>;
  constructor(
    platformDataService: PlatformDataService,
    private platformSelection: PlatformSelectionService,
    serverEvents: IPlatformEvents,
    public timerService: PlatformTimerService,
    groupService: GroupService,
    private clientEventService: ClientEventService
  ) {
    super();
    this.activeGroupId$ = platformDataService.select("activeGroupId");

    this.showDecisions$ = serverEvents
      .on("displayDecisions")
      .pipe(switchMap((t) => merge(of(true), timer(t).pipe(map(() => false)))));

    this.groups$ = this.platformSelection.select("selectedPlatform").pipe(
      switchMap((platform) =>
        groupService.getMany(
          RequestQueryBuilder.create({
            search: {
              platformId: platform?.id || -1,
            },
            sort: {
              field: "name",
              order: "ASC",
            },
          }).query()
        )
      )
    );
    this.currentLifter$ = platformDataService.select("currentLifter");
    this.timerClicks.subscribe((c) =>
      this.clientEventService.emitEvent("liftTimer", c).subscribe()
    );
  }
  selectGroup(id: IClientPlatformEvents["activeGroupId"]) {
    this.clientEventService.emitEvent("activeGroupId", id).subscribe();
  }
  timerClick(c: Clock) {
    this.timerClicks.next(c);
  }
  pause() {
    this.timerClick({ state: "OFF" });
  }
  play() {
    this.timerClick({ state: "ON" });
  }
  reset() {
    this.timerClick({ state: "OFF", remainingMillis: 60 * SECOND });
  }
  decisionReset() {
    for (let i = 0; i < 3; i++) {
      this.clientEventService
        .emitEvent("decision", { d: "NOT_DECIDED", judgeNumber: i + 1 })
        .subscribe();
    }
  }
  decision(d: boolean) {
    this.clientEventService.emitEvent("secretariatDecision", d).subscribe();
  }
  ngOnInit(): void {}
}
