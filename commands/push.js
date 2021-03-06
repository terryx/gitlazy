const yargs = require('yargs')
const config = require('../config.json')
const { execSync } = require('child_process')
const { getCurrentBranch } = require('../utils/branch')

const push = (yarg) => {
  return Promise
    .resolve(yarg.argv)
    .then(argv => getCurrentBranch(argv))
    .then(currentBranch => {
      if (currentBranch === config.release || currentBranch === config.develop) {
        throw new Error(`Cannot push directly to ${currentBranch} branch`)
      }

      execSync(`git push origin ${currentBranch}`)
    })
    .catch(err => console.error(err.message))
}

yargs
.command('push', 'Push current feature branch', push)
.help()
.argv
