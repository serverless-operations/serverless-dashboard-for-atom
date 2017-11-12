'use babel'

import ServerlessDashboardView from './serverless-dashboard-view'
import { CompositeDisposable } from 'atom'
import yaml from 'js-yaml'
import fs from 'fs'
const dashBoardUri = 'atom://serverless-dashboard'

export default {

  serverlessDashboardView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.workspace.addOpener(((_this) => {
      const data = yaml.safeLoad(fs.readFileSync(this.pickFile(), 'utf8'))
      return (filePath) => {
        if (filePath === dashBoardUri) {
          return _this.openManagemantPanel({
            uri: dashBoardUri,
            data
          })
        }
      }
    })(this)))
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'serverless-dashboard:open-management-panel': () => {
        return atom.workspace.open(dashBoardUri)
      }
    }))
  },

  deactivate () {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
  },

  openManagemantPanel: (state) => {
    const DashbordView = require('./serverless-dashboard-view')
    return new DashbordView(state)
  },

  pickFile () {
    const remote = require('electron').remote
    const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {properties: ['openFile']})
    if (files && files.length) {
      return files[0]
    }
    return null
  }
}
