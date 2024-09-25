import { MSICSWithoutReference } from '@invoice/constants/dist/msic';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'msic', async: false })
export class MSICValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    const codes = MSICSWithoutReference.map((msic) => msic.code);
    return codes.includes(text); // for async validations you must return a Promise<boolean> here
  }
  defaultMessage() {
    return 'Invalid Malaysia Standard Industrial Classification Code';
  }
}
