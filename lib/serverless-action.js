'use babel'

import childProcess from 'child_process'

export default class ServerlessAction {
  constructor (path) {
    this.path = path
  }

  deploy () {
    return childProcess.spawn('sls', ['deploy'], {cwd: this.path})
  }

  remove () {
    return childProcess.spawn('sls', ['remove'], {cwd: this.path})
  }

  action (action, functionName) {
    switch (action) {
      case 'deploy-function':
        return childProcess.spawn('sls', ['deploy', 'function', '-f', functionName], {cwd: this.path})
      case 'invoke':
        return childProcess.spawn('sls', ['invoke', '-f', functionName], {cwd: this.path})
      case 'logs':
        return childProcess.spawn('sls', ['logs', '-f', functionName], {cwd: this.path})
    }
  }
}
