import { Component, OnInit, Input } from '@angular/core';
import { timestamp } from '../timestamp';
import * as moment from 'moment';
import { TimestampService } from '../services/timestamp.service';

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

  async ngOnInit () {
    await this.getFeedingTime();
  }

  async getFeedingTime() {
    const dates = await this.timestampService.getDates(this.button_name);
    Object.values(dates).reverse().map(
      (time) => {
        this.feed_time.push(<any>moment(time).format('h:mm:ss a, ddd, MMM Do'));
      }
    );
  }

  async updateFeedingTime() {
    const dateNow = Date.now();
    await this.timestampService.setDate(this.button_name, dateNow);

    this.feed_time.unshift(<any>moment(dateNow).format('h:mm:ss a, ddd, MMM Do'));
    this.feed_time.pop();
  }

  getButtonIcon(eventType: string) {
    switch (eventType) {
      case 'feeding':
        return '../../assets/feed.png';
      case 'poop':
        return '../../assets/poop.png';
      case 'bath':
        return '../../assets/bath.png';
      case 'sleep':
        return '../../assets/sleep.png';
      default:
        return;
    }
  }

}
