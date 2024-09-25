import { Classifications } from '@invoice/constants/dist/classification';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'classification', async: false })
export class ClassificationValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    const codes = Classifications.map((classification) => classification.code);
    return codes.includes(text); // for async validations you must return a Promise<boolean> here
  }
  defaultMessage() {
    return 'Invalid Classification Code';
  }
}
