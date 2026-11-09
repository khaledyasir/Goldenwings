import * as migration_20261109_120758_initial from './20261109_120758_initial';
import * as migration_20261109_122128_booking_spam_flag from './20261109_122128_booking_spam_flag';

export const migrations = [
  {
    up: migration_20261109_120758_initial.up,
    down: migration_20261109_120758_initial.down,
    name: '20261109_120758_initial',
  },
  {
    up: migration_20261109_122128_booking_spam_flag.up,
    down: migration_20261109_122128_booking_spam_flag.down,
    name: '20261109_122128_booking_spam_flag'
  },
];
