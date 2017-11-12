'use babel'

import childProcess from 'child_process'

export default {
  info () {
    return childProcess.execSync('sls help').toString()
  }
}
