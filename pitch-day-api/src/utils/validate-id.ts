import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidId', async: false })
export class IsValidId implements ValidatorConstraintInterface {
  validate(id: any): boolean {
    if (Number.isInteger(id)) {
      return true;
    }

    if (typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id)) {
      return true;
    }

    if (id instanceof Uint8Array && id.length === 12) {
      return true;
    }

    return false;
  }

  defaultMessage(): string {
    return 'ID must be a 24 character hex string, 12 byte Uint8Array, or an integer.';
  }
}
