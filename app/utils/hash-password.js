const bcrypt = require('bcrypt-node')

const password = process.argv[2]

if (!password) {
  console.error('Usage: npm run hash-password <YOUR_PASSWORD_GOES_HERE>')
  process.exit(1)
}

const hash = bcrypt.hashSync(password)
console.log(`Hashing password: "${password}"`)
console.log()
console.log()
console.log(hash)
console.log()
console.log()
