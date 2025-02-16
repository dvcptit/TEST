import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUpdatableConstraint } from './IsUpdatableConstraint';

export class IsUpdatable {
    static apply(validationOptions?: ValidationOptions) {
      return function (object: Object, propertyName: string) {
        registerDecorator({
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [],
          validator: IsUpdatableConstraint,
        });
      };
    }
  }
  
