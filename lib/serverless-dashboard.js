'use babel';

import ServerlessDashboardView from './serverless-dashboard-view';
import { CompositeDisposable } from 'atom';
const dashBoardUri = 'atom://serverless-dashboard';

export default {

  serverlessDashboardView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
  console.log(state)
    this.serverlessDashboardView = new ServerlessDashboardView(state.serverlessDashboardViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.serverlessDashboardView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.addOpener(((_this) => {
      return (filePath) => {
        if (filePath === dashBoardUri) {
          return _this.openManagemantPanel({
            uri: dashBoardUri
          });
        }
      };
    })(this)));
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'serverless-dashboard:open-management-panel': () => {
        return atom.workspace.open(dashBoardUri);
      }
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.serverlessDashboardView.destroy();
  },

  serialize() {
    return {
      serverlessDashboardViewState: this.serverlessDashboardView.serialize()
    };
  },

  openManagemantPanel: function(state) {
    const DashbordView = require('./serverless-dashboard-view');
    return new DashbordView(state);
  }
};
