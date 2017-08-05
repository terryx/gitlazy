const yargs = require('yargs')
const config = require('../config.json')
const { run } = require('../utils/command')

const validateBranch = (argv) => {
  if (argv._.length <= 1) {
    return console.error('No branch found')
  }

  return new Promise((resolve, reject) => {
    if (argv._.length <= 1) {
      return reject('No branch found')
    }

    return resolve({ target: argv._[1] })
  })
}

const feature = (yarg) => {
  return Promise
    .resolve(yarg.argv)
    .then(argv => validateBranch(argv))
    .then(branch => run(`git checkout -b feature/${branch.target} ${config.develop}`))
    .catch(err => console.error(err.message))
}

yargs
.command('feature', 'Start a feature branch', feature)
.help()
.argv
