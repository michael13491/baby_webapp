import { Component, OnInit, Input } from '@angular/core';
import { timestamp } from '../timestamp';
import * as moment from 'moment';
import { TimestampService } from '../timestamp.service';

@Component({
  selector: 'app-timestamp-button',
  templateUrl: './timestamp-button.component.html',
  styleUrls: ['./timestamp-button.component.css']
})

// export class TimestampButtonComponent implements OnInit {
export class TimestampButtonComponent implements OnInit {
  @Input() button_name: string;

  feed_time: timestamp[] = [];

  constructor(private timestampService: TimestampService) {
  }

  ngOnInit () {
    this.getFeedingTime();
  }

  getFeedingTime(): void {
    this.timestampService.getDates(this.button_name)
        .subscribe(eventTime => {
          eventTime.map( time => this.feed_time.push(<any>moment(time).format("h:mm:ss a, ddd, MMM Do")));
        });
  }

  updateFeedingTime() {
    this.timestampService.setDate(this.button_name).subscribe(
        eventTime => {
          this.feed_time.unshift(<any>moment(eventTime).format("h:mm:ss a, ddd, MMM Do"));
          this.feed_time.pop();
        }
    );
  }

  getButtonIcon(eventType: string) {
    switch (eventType) {
      case 'feeding':
        return '../../assets/baby_feeding.png';
      case 'poop':
        return '../../assets/baby_poop.png';
      case 'bath':
        return '../../assets/baby_bath.png';
      case 'sleep':
        return '../../assets/baby_sleep.png';
      default:
        return;
    }
  }

}
