// import { PrismaService } from '@/database/prisma/prisma.service';
// import {
//   createMongoAbility,
//   ForbiddenError,
//   MongoAbility,
//   RawRuleOf,
//   subject,
// } from '@casl/ability';
// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   NotFoundException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { User } from '@prisma/client';
// import { Request } from 'express';
// import { map } from 'rxjs';
// import { CHECK_ABILITY, RequiredRule } from './permission.decorator';

// export const Modules = {
//   BUYER: 'buyer',
//   SUPPLIER: 'supplier',
//   INVOICE: 'invoice',
// } as const;

// export const Actions = {
//   MANAGE: 'manage',
//   CREATE: 'create',
//   READ: 'read',
//   UPDATE: 'update',
//   DELETE: 'delete',
// } as const;

// export type Abilities = [
//   (typeof Modules)[keyof typeof Modules],
//   (typeof Actions)[keyof typeof Actions] | 'all',
// ];

// export type AppAbility = MongoAbility<Abilities>;

// export class AbilitiesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private prisma: PrismaService,
//   ) {}

//   createAbility = (rules: RawRuleOf<AppAbility>[]) =>
//     createMongoAbility<AppAbility>(rules);

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const rules: any =
//       this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
//       [];
//     const currentUser: User = context.switchToHttp().getRequest().user;
//     const request: Request = context.switchToHttp().getRequest();

//     const userPermissions = await this.prisma.permission.findMany({
//       where: {
//         role_id: currentUser.role_id,
//       },
//     });

//     const parsedUserPermissions = this.parseCondition(
//       userPermissions,
//       currentUser,
//     );

//     try {
//       const ability = this.createAbility(Object(parsedUserPermissions));

//       for await (const rule of rules) {
//         let sub = {};
//         if ((rule?.conditions).length > 0) {
//           const subId = +request.params['id'];
//           sub = await this.getSubjectById(subId, rule.subject);
//         }

//         ForbiddenError.from(ability)
//           .setMessage('You are not allowed to perform this action')
//           .throwUnlessCan(rule.action, subject(rule.subject, sub));
//       }
//       return true;
//     } catch (error) {
//       if (error instanceof ForbiddenError) {
//         throw new ForbiddenException(error.message);
//       }
//       throw error;
//     }
//   }

//   parseCondition(permissions: any, currentUser: User) {
//     const data = map(permissions, (permission) => {
//       if (permission.conditions.length > 0) {
//         const parsedVal = Mustache.render(
//           permission.conditions['created_by'],
//           currentUser,
//         );
//         return {
//           ...permission,
//           conditions: { created_by: +parsedVal },
//         };
//       }
//       return permission;
//     });
//     return data;
//   }

//   async getSubjectById(id: number, subName: string) {
//     const subject = await this.prisma[subName].findUnique({
//       where: {
//         id,
//       },
//     });
//     if (!subject) throw new NotFoundException(`${subName} not found`);
//     return subject;
//   }
// }

// // @Injectable()
// // export class CaslAbilityFactory {
// //   constructor() {}
// //   defineAbilityFor(user: any) {
// //     const { can, cannot, build } = new AbilityBuilder<
// //       PureAbility<[Actions, Modules]>
// //     >(PureAbility as AbilityClass<AppAbility>);

// //     if (user.role === 'super-admin' || user.role === 'admin') {
// //       can(Actions.MANAGE, Object.values(Modules));
// //     } else if (user.role === 'staff') {
// //       can([Actions.CREATE, Actions.UPDATE], Modules.BUYER);
// //       can([Actions.CREATE, Actions.UPDATE], Modules.INVOICE);
// //       cannot(Actions.MANAGE, Modules.SUPPLIER); // staff cannot manage suppliers
// //     } else {
// //       cannot(Actions.MANAGE, Object.values(Modules)); // default deny all permissions
// //     }

// //     return build({
// //       detectSubjectType: (item: Modules) =>
// //         item.constructor as ExtractSubjectType<Modules>,
// //     });
// //   }
// // }
