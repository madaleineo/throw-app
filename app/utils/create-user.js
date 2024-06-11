import bcrypt from 'bcrypt-node';
import { PrismaClient } from '@prisma/client';

const [, , role, username, password, roleId] = process.argv
const VALID_ROLES = ['global', 'owner', 'employee', 'member', 'guest', 'regular_customer']

const prisma = new PrismaClient()

if (
  !role ||
  !username ||
  !password ||
  !VALID_ROLES.includes(role) ||
  !roleId
) {
  console.error(
    `
Usage: npm run create-user <role> <username> <password> <roleId>

       role must be one of: ${VALID_ROLES.join(' ')}
  `.trim()
  )
  process.exit(1)
}

const data = { username, role, password: bcrypt.hashSync(password) }

prisma.user.create({ data }).then(() => {
  console.log(`User successfully created!!`)
  console.log(data)
})
