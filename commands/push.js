const yargs = require('yargs')
const { execSync } = require('child_process')
const { getCurrentBranch } = require('../utils/branch')

const push = (yarg) => {
  return Promise
    .resolve(yarg.argv)
    .then(argv => getCurrentBranch(argv))
    .then(currentBranch => {
      if (currentBranch === 'master' || currentBranch === 'develop') {
        throw (new Error(`Cannot push directly to ${currentBranch} branch`))
      }

      execSync(`git push origin ${currentBranch}`)
    })
}

yargs
.command('push', 'Push current feature branch', push)
.help()
.argv
