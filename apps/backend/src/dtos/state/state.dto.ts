import { States } from '@invoice/constants/dist/state';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'state', async: false })
export class StateValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    const codes = States.map((state) => state.code);
    return codes.includes(text); // for async validations you must return a Promise<boolean> here
  }
  defaultMessage() {
    return 'Invalid State';
  }
}
