import {
  NSP_PARTIAL_STATE_EVENT,
  ROOM,
  ProtectedRoomEventBus,
  RoomEvent,
} from "@pc/util";
import { connect } from "socket.io-client";
import { SubSink } from "subsink";
import { fromEvent, BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { Directive, Injectable, OnDestroy } from "@angular/core";

@Directive()
export class RoomSocketService<T extends {}>
  extends ProtectedRoomEventBus<T>
  implements OnDestroy {
  protected subs = new SubSink();
  socket: SocketIOClient.Socket;
  protected connected = new BehaviorSubject(false);
  constructor(nsp: string) {
    super();
    this.socket = connect(`/${nsp}`);
    this.subs.sink = fromEvent<RoomEvent<T>>(
      this.socket,
      NSP_PARTIAL_STATE_EVENT
    ).subscribe(({ room, type, payload }) => this._emit(room, type, payload));
    this.socket.on("connect", () => this.connected.next(true));
    this.socket.on("connect_error", () => this.connected.next(false));
    this.onRoomRequest().subscribe((req) => {
      this.join(req.room);
      req.receiver.complete();
    });
  }

  join(room: string | number) {
    this.socket.emit(ROOM.JOIN, `${room}`);
  }
  leave(room: string | number) {
    this.socket.emit(ROOM.LEAVE, `${room}`);
  }

  get connected$() {
    return this.connected.pipe(distinctUntilChanged());
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
