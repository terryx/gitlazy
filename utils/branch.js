const { execSync } = require('child_process')

const getCurrentBranch = (argv) => {
  const gitCommand = 'git rev-parse --abbrev-ref HEAD'
  const rawText = Buffer.from(execSync(gitCommand)).toString().trim()

  return Promise.resolve(rawText)
}

module.exports = {
  getCurrentBranch
}
