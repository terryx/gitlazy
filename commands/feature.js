const yargs = require('yargs')
const { execSync } = require('child_process')

const feature = (yarg) => {
  return Promise
    .resolve(yarg.argv)
    .then(argv => {
      if (argv._.length <= 1) {
        return console.error('No branch found')
      }

      let destBranch = argv._[1]
      let fromBranch = 'develop'
      if (argv._[2]) {
        fromBranch = argv._[2]
      }

      execSync(`git checkout -b ${destBranch} ${fromBranch}`)
    })
}

yargs
.command('feature', 'Start a feature branch', feature)
.help()
.argv
