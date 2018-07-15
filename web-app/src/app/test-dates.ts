import * as moment from 'moment';
import { timestamp } from './timestamp';

/* USED FOR INITIAL TESTING ONLY */
export const TEST_TIME: timestamp[] = [
  { time: moment().format("dddd, MMMM Do 2015")},
  { time: moment().format("dddd, MMMM Do 2016")},
  { time: moment().format("dddd, MMMM Do 2017")}
]