const yargs = require('yargs')
const { execSync } = require('child_process')
const { getCurrentBranch } = require('../utils/branch')

const close = (yarg) => {
  return Promise
    .resolve(yarg.argv)
    .then(argv => getCurrentBranch)
    .then(currentBranch => {
      if (currentBranch === 'master' || currentBranch === 'develop') {
        throw (new Error(`Cannot finish a ${currentBranch} branch`))
      }

      execSync(`git checkout develop`)
      execSync(`git branch -d ${currentBranch}`)
      execSync(`git push origin --delete ${currentBranch}`)
      execSync(`git pull origin develop`)
      execSync(`git remote prune origin`)

      return console.info(`${currentBranch} is closed`)
    })
    .catch(err => console.error(err.message))
}

yargs
.command('close', 'Closing a branch', close)
.help()
.argv
