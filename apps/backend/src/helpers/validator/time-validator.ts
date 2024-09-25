import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
@ValidatorConstraint({ name: 'time-validator', async: false })
export class TimeValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    return TIME_REGEX.test(text);
  }
  defaultMessage() {
    return 'Invalid time format. Expected format: HH:MM';
  }
}
