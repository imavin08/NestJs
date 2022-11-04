import { User } from 'src/auth/schemas/user.schema';
import { Request } from 'express';

export type HttpRequestWithUser = Request & { user: User };
