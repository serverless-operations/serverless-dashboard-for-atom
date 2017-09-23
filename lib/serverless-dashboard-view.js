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
          <h1>Serverless Dashbord</h1>
          <p>This package allows you to deploy and manage your service with <a href="https://serverless.com/framework/">Serverless Framework</a> on this panel</p>
        </header>
        <main class="serverless-dashboard-sections">
          <div class="header-operations">
            <h1 class="section-heading">Service: panpan</h1>
            <div class="operation-controls btn-group">
              <button class="btn btn-primary icon icon-cloud-upload">Deploy Service</button>
              <button class="btn btn-error icon icon-trashcan">Remove Service</button>
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
          <div class="operation-block">
            <div class="functions-block control-group">
              <h2>Functions</h2>
              <div class="function-block control-content">
                <div class="function-header">
                  <ul class='list-tree'>
                    <li class='list-nested-item'>
                      <div class='list-item'>
                        <h3>Function A</h3>
                      </div>
                      <ul class='list-tree'>
                        <li class='list-nested-item'>
                          <div class='list-item'>
                            <h4>Events</h4>
                          </div>
                          <ul class='list-tree'>
                            <li class='list-nested-item'>
                              <div class='list-item'>
                                <span>- http: GET /hello</span>
                              </div>
                            </li>
                            <li class='list-nested-item'>
                              <div class='list-item'>
                                <span>- cloudWatchLogs</span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div class="apply-block">
                    <div class="select-container">
                      <select class="form-control">
                        <option value="atom-dark-ui">Deploy Function</option>
                        <option value="atom-light-ui">Invoke</option>
                        <option value="one-dark-ui">Logs</option>
                      </select>
                      <button class="btn">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="function-block control-content">
                <div class="function-header">
                  <ul class='list-tree'>
                    <li class='list-nested-item'>
                      <div class='list-item'>
                        <h3>Function B</h3>
                      </div>
                      <ul class='list-tree'>
                        <li class='list-nested-item'>
                          <div class='list-item'>
                            <h4>Events</h4>
                          </div>
                          <ul class='list-tree'>
                            <li class='list-nested-item'>
                              <div class='list-item'>
                                <span>- http: POST /hello</span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div class="apply-block">
                    <div class="select-container">
                      <select class="form-control">
                        <option value="atom-dark-ui">Deploy Function</option>
                        <option value="atom-light-ui">Invoke</option>
                        <option value="one-dark-ui">Logs</option>
                      </select>
                      <button class="btn">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="function-block control-content">
                <div class="function-header">
                  <ul class='list-tree'>
                    <li class='list-nested-item'>
                      <div class='list-item'>
                        <h3>Function C</h3>
                      </div>
                      <ul class='list-tree'>
                        <li class='list-nested-item'>
                          <div class='list-item'>
                            <h4>Events</h4>
                          </div>
                          <ul class='list-tree'>
                            <li class='list-nested-item'>
                              <div class='list-item'>
                                <span>- scheduled: rate(2 hours)</span>
                              </div>
                            </li>
                            <li class='list-nested-item'>
                              <div class='list-item'>
                                <span>- cloudWatchLogs</span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div class="apply-block">
                    <div class="select-container">
                      <select class="form-control">
                        <option value="atom-dark-ui">Deploy Function</option>
                        <option value="atom-light-ui">Invoke</option>
                        <option value="one-dark-ui">Logs</option>
                      </select>
                      <button class="btn">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="console-block control-group">
              <h2>Console Output</h2>
              <div class="control-content">
              console output..
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
