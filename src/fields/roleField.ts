import { Field } from 'payload/types'
import { ROLE_OPTIONS } from '../constants/roles'
import RequestProps from '@/interfaces/UserProps'

export const roleField: Field = {
  name: 'role',
  type: 'select',
  required: true,
  defaultValue: 'contributor',
  options: ROLE_OPTIONS,
  access: {
    create: ({ req }: { req: RequestProps }) => req.user?.role === 'admin',
    read: ({ req }: { req: RequestProps }) => req.user?.role === 'admin',
    update: ({ req }: { req: RequestProps }) => req.user?.role === 'admin',
  },
  admin: {
    position: 'sidebar',
  },
}
