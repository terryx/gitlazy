const yargs = require('yargs')
const config = require('../config.json')
const { getCurrentBranch } = require('../utils/branch')
const { run } = require('../utils/command')

const validateBranch = (currentBranch) => {
  if (currentBranch === config.develop || currentBranch === config.release) {
    throw (new Error(`Cannot close a ${currentBranch} branch`))
  }

  return Promise.resolve(currentBranch)
}

const close = (yarg) => {
  let currentBranch = null

  Promise.resolve(yarg.argv)
    .then(argv => getCurrentBranch(argv))
    .then(branchName => validateBranch(branchName))
    .then(branchName => {
      currentBranch = branchName
      return Promise.resolve(branchName)
    })
    .then(branchName => run(`git checkout ${config.develop}`))
    .then(branchName => run(`git branch -D ${currentBranch}`))
    .then(() => run(`git pull origin ${config.develop}`))
    .then(() => run(`git remote prune origin`))
    .then(response => console.info(response))
    .catch(err => console.error(err.message))
}

yargs
.command('close', 'Closing a branch', close)
.help()
.argv
