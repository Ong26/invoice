// import { Measurements } from '@invoice/constants/meaurement';
// import {
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';

// @ValidatorConstraint({ name: 'measurement', async: false })
// export class MeasurementValidator implements ValidatorConstraintInterface {
//   validate(text: string) {
//     const codes = Measurements.map((measurement) => measurement.Code);
//     return codes.includes(text); // for async validations you must return a Promise<boolean> here
//   }
//   defaultMessage() {
//     return 'Invalid Measurement Code';
//   }
// }
