import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "sgticketsbekeeeee";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
