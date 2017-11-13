'use babel'

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
      return (filePath) => {
        if (filePath === dashBoardUri) {
          return _this.openManagemantPanel()
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

  openManagemantPanel () {
    const remote = require('electron').remote
    const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {properties: ['openFile']})
    if (files && files.length) {
      const data = yaml.safeLoad(fs.readFileSync(files[0], 'utf8'))
      const DashbordView = require('./serverless-dashboard-view')
      return new DashbordView(data, files[0])
    }
  }
}
