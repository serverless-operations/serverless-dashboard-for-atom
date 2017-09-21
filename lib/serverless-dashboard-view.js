/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class ServerlessDashboardView {

  constructor(props) {
//    this.uri = props.uri
    // Create root element
    etch.initialize(this)
  }

  getTitle () {
    return 'Serverless Dashbord'
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  update () {
    // intentionally empty.
  }

  getElement() {
    return this.element;
  }

  render () {
    return (
      <div className='serverless-dashboard'>
        <header className='serverless-dashboard-header'>
          <h1>サービス名</h1>
          <p>ダッシュボードの簡単な説明</p>
        </header>
        <main class="serverless-dashboard-sections">
          <div class="header-operations">
            <h1 class="section-heading">Service: panpan</h1>
            <div class="operation-controls btn-group">
              <button class="btn">Deploy Service</button>
              <button class="btn danger">Remove Service</button>
            </div>
          </div>
          <div class="env-picker">
            <div class="env-picker-item control-group">
              <div class="controls">
                <div class="setting-title">Stage</div>
                <div class="select-container">
                  <select class="form-control">
                    <option value="atom-dark-ui">Atom Dark</option>
                    <option value="atom-light-ui">Atom Light</option>
                    <option value="one-dark-ui">One Dark</option>
                    <option value="one-light-ui">One Light</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="env-picker-item control-group">
              <div class="controls">
                <div class="setting-title">Region</div>
                <div class="select-container">
                  <select class="form-control">
                    <option value="atom-dark-ui">Atom Dark</option>
                    <option value="atom-light-ui">Atom Light</option>
                    <option value="one-dark-ui">One Dark</option>
                    <option value="one-light-ui">One Light</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="env-picker-item control-group">
              <div class="controls">
                <div class="setting-title">Credential</div>
                <div class="select-container">
                  <select class="form-control">
                    <option value="atom-dark-ui">Atom Dark</option>
                    <option value="atom-light-ui">Atom Light</option>
                    <option value="one-dark-ui">One Dark</option>
                    <option value="one-light-ui">One Light</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
