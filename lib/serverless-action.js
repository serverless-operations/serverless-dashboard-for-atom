'use babel'

import childProcess from 'child_process'

export default class ServerlessAction {
  constructor (path) {
    this.path = path
  }

  info () {
    return childProcess.execSync('sls help').toString()
  }

  deploy () {
    return childProcess.execSync(`cd ${this.path} && sls deploy`).toString()
  }

  remove () {
    return childProcess.execSync(`cd ${this.path} && sls remove`).toString()
  }
}
