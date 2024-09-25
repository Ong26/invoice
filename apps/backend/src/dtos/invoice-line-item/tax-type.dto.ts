import { TaxTypes } from '@invoice/constants/dist/tax-type';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'tax-types', async: false })
export class TaxTypeValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    const codes = TaxTypes.map((taxType) => taxType.code);
    return codes.includes(text);
  }
  defaultMessage() {
    return 'Invalid Tax Type Code';
  }
}
