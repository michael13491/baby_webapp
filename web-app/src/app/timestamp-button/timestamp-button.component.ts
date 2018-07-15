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
        .subscribe(feed_time => this.feed_time = feed_time);
  }

  updateFeedingTime() {
    this.timestampService.setDate(this.button_name).subscribe(
        feed_time => {
          this.feed_time.unshift(feed_time);
          this.feed_time.pop();
        }
    );
  }
}
