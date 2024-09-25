import { InvoiceTypes } from '@invoice/constants/dist/invoice-type';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'invoiceType', async: false })
export class InvoiceTypeValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    const codes = InvoiceTypes.map((invoiceType) => invoiceType.code);
    return codes.includes(text);
  }
  defaultMessage() {
    return 'Invalid Invoice Type Code';
  }
}
