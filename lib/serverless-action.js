'use babel'

import childProcess from 'child_process'

export default class ServerlessAction {
  constructor (path) {
    this.path = path
  }

  deploy () {
    return childProcess.exec('sls deploy', {cwd: this.path})
  }

  remove () {
    return childProcess.exec('sls remove', {cwd: this.path})
  }

  action (action, functionName) {
    switch (action) {
      case 'deploy-function':
        return childProcess.exec(`sls deploy function -f ${functionName}`, {cwd: this.path})
      case 'invoke':
        return childProcess.exec(`sls invoke -f ${functionName}`, {cwd: this.path})
      case 'logs':
        return childProcess.exec(`sls logs -f ${functionName}`, {cwd: this.path})
    }
  }
}
