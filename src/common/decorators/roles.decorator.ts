// # Role-based access control decorator

import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();
