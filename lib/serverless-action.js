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
}
