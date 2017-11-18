'use babel'

import childProcess from 'child_process'

export default class ServerlessAction {
  constructor (path) {
    this.path = path
  }

  deploy (region, stage) {
    return childProcess.spawn('sls', ['deploy', '--region', region, '--stage', stage], {cwd: this.path})
  }

  remove (region, stage) {
    return childProcess.spawn('sls', ['remove', '--region', region, '--stage', stage], {cwd: this.path})
  }

  action (action, functionName, region, stage) {
    switch (action) {
      case 'deploy-function':
        return childProcess.spawn('sls', [
          'deploy',
          'function',
          '--function',
          functionName,
          '--region',
          region,
          '--stage',
          stage
        ], {cwd: this.path})
      case 'invoke':
        return childProcess.spawn('sls', [
          'invoke',
          '--function',
          functionName,
          '--data',
          '{}',
          '--region',
          region,
          '--stage',
          stage
        ], {cwd: this.path})
      case 'logs':
        return childProcess.spawn('sls', [
          'logs',
          '--function',
          functionName,
          '--region',
          region,
          '--stage',
          stage
        ], {cwd: this.path})
    }
  }
}
