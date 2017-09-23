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
    return 'Serverless Dashboard'
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
          <h1>Serverless Dashboard</h1>
          <p>This package allows you to deploy and manage your service with <a href="https://serverless.com/framework/">Serverless Framework</a> on this panel</p>
        </header>
        <main class="serverless-dashboard-sections">
          <div class="header-operations">
            <h1 class="section-heading">your-sls-service</h1>
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
                    <option value="atom-dark-ui">dev</option>
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
                    <option value="atom-dark-ui">us-east-1</option>
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
                    <option value="atom-dark-ui">default</option>
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
              <div class="console-content">
              Serverless: Invoke deploy<br />
Serverless: Invoke package<br />
Serverless: Invoke aws:common:validate<br />
Serverless: Invoke aws:common:cleanupTempDir<br />
Serverless: Packaging service...<br />
Serverless: Excluding development dependencies...<br />
Serverless: Invoke aws:package:finalize<br />
Serverless: Invoke aws:common:moveArtifactsToPackage<br />
Serverless: Invoke aws:common:validate<br />
Serverless: Invoke aws:deploy:deploy<br />
Serverless: Uploading CloudFormation file to S3...<br />
Serverless: Uploading artifacts...<br />
Serverless: Uploading service .zip file to S3 (47.07 MB)...<br />
Serverless: Validating template...<br />
Serverless: Updating Stack...<br />
Serverless: Checking Stack update progress...<br />
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - step-func-dev<br />
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1505222453100<br />
CloudFormation - CREATE_IN_PROGRESS - AWS::Events::Rule - Hellostepfunc1StepFunctionsEventsRuleSchedule2<br />
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1505222453100<br />
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction<br />
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1505222453100<br />
CloudFormation - CREATE_IN_PROGRESS - AWS::Events::Rule - Hellostepfunc1StepFunctionsEventsRuleSchedule2<br />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
