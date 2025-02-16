import { ValidatorConstraint,ValidatorConstraintInterface,ValidationArguments } from "class-validator";

@ValidatorConstraint({name: 'isUpdatable', async: false})
export class IsUpdatableConstraint implements ValidatorConstraintInterface
{
    validate(value: any, args ?: ValidationArguments): boolean {
        const object = args.object as any;
        const isStatusOnline = object.status === 'online';
        if(args.property=== 'username' || args.property === 'password'){
            return isStatusOnline;
        }
        return true;
    }
    defaultMessage(args?: ValidationArguments): string {
        return `${args.property} can only be updated if status is online!`;
    }
}