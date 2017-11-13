/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import serverlessAction from './serverless-action'
import _ from 'lodash'
import yaml from 'js-yaml'
import os from 'os'

export default class ServerlessDashboardView {
  constructor (content, yamlPath) {
    this.slsObject = content
    this.yamlPath = yamlPath
    // Create root element
    etch.initialize(this)
  }

  getTitle () {
    return 'Serverless Dashboard'
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {}

  // Tear down any state and detach
  destroy () {
    this.element.remove()
  }

  update () {
    // intentionally empty.
  }

  getElement () {
    return this.element
  }

  slsInfo () {
    this.consoleOutput = serverlessAction.info()
    this.consoleOutput = _.replace(this.consoleOutput, new RegExp(os.EOL, 'g'), '<br />')
    const p = document.createElement('p')
    this.refs['console-output'].appendChild(p)
  }

  render () {
    let functions = []
    if (this.slsObject.functions) {
      _.forEach(this.slsObject.functions, (v, k) => {
        functions.push(this.functionsRender(v, k))
      })
    }
    return (
      <div className='serverless-dashboard'>
        <header className='serverless-dashboard-header'>
          <h1>Serverless Dashboard</h1>
          <p>This package allows you to deploy and manage your service with <a href="https://serverless.com/framework/">Serverless Framework</a> on this panel</p>
        </header>
        <main class="serverless-dashboard-sections">
          <div class="header-operations">
            <h1 class="section-heading">{this.slsObject.service}</h1>
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
                    <option value="us-east-1">us-east-1</option>
                    <option value="us-east-2">us-east-2</option>
                    <option value="us-west-1">us-west-1</option>
                    <option value="us-west-2">us-west-2</option>
                    <option value="ca-central-1">ca-central-1</option>
                    <option value="eu-west-1">eu-west-1</option>
                    <option value="eu-central-1">eu-central-1</option>
                    <option value="eu-west-2">eu-west-2</option>
                    <option value="ap-northeast-1">ap-northeast-1</option>
                    <option value="ap-northeast-2">ap-northeast-2</option>
                    <option value="ap-southeast-1">ap-southeast-1</option>
                    <option value="ap-southeast-2">ap-southeast-2</option>
                    <option value="ap-south-1">ap-south-1</option>
                    <option value="sa-east-1">sa-east-1</option>
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
              {functions}
            </div>
            <div class="console-block control-group">
              <h2>Console Output</h2>
              <div ref='console-output' class="console-content">
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  functionsRender (functionElem, functionName) {
    const events = []
    if (functionElem.events) {
      _.forEach(functionElem.events, (event) => {
        if (typeof event === 'object') {
          _.forEach(event, (eventElem, eventName) => {
            const detail = []
            switch (eventName) {
              case 'http':
                if (typeof eventElem === 'object') {
                  detail.push(
                    <li class='list-nested-item'>
                      {eventElem.method}: {eventElem.path}
                    </li>
                  )
                } else {
                  detail.push(
                    <li class='list-nested-item'>
                      {eventElem}
                    </li>
                  )
                }
                break
              case 'stream':
                if (typeof eventElem === 'object') {
                  detail.push(
                    <li class='list-nested-item'>
                      type: {eventElem.type}
                    </li>
                  )
                  detail.push(
                    <li class='list-nested-item'>
                      arn: {typeof eventElem.arn === 'object' ? yaml.dump(eventElem.arn) : eventElem.arn}
                    </li>
                  )
                } else {
                  detail.push(
                    <li class='list-nested-item'>
                      {eventElem}
                    </li>
                  )
                }
                break
              case 's3':
                if (typeof eventElem === 'object') {
                  detail.push(
                    <li class='list-nested-item'>
                      bucket: {eventElem.bucket}
                    </li>
                  )
                  detail.push(
                    <li class='list-nested-item'>
                      event: {eventElem.event}
                    </li>
                  )
                } else {
                  detail.push(
                    <li class='list-nested-item'>
                      bucket: {eventElem}
                    </li>
                  )
                }
                break
              case 'schedule':
                if (typeof eventElem === 'object') {
                  detail.push(
                    <li class='list-nested-item'>
                      rate: {eventElem.rate}
                    </li>
                  )
                } else {
                  detail.push(
                    <li class='list-nested-item'>
                      rate: {eventElem}
                    </li>
                  )
                }
                break
              case 'sns':
                if (typeof eventElem === 'object') {
                  detail.push(
                    <li class='list-nested-item'>
                      topic: {typeof eventElem.arn === 'object' ? yaml.dump(eventElem.arn) : eventElem.arn}
                    </li>
                  )
                } else {
                  detail.push(
                    <li class='list-nested-item'>
                      topic: {eventElem}
                    </li>
                  )
                }
                break
              case 'iot':
                detail.push(
                  <li class='list-nested-item'>
                    sql: {eventElem.sql}
                  </li>
                )
                break
              case 'cloudwatchEvent':
                detail.push(
                  <li class='list-nested-item'>
                    event: {yaml.dump(eventElem.event)}
                  </li>
                )
                break
              case 'cloudwatchLog':
                if (typeof eventElem === 'object') {
                  detail.push(
                    <li class='list-nested-item'>
                      logGroup: {eventElem.logGroup}
                    </li>
                  )
                } else {
                  detail.push(
                    <li class='list-nested-item'>
                      logGroup: {eventElem}
                    </li>
                  )
                }
                break
              case 'cognitoUserPool':
                detail.push(
                  <li class='list-nested-item'>
                    pool: {eventElem.pool}
                  </li>
                )
                detail.push(
                  <li class='list-nested-item'>
                    trigger: {eventElem.trigger}
                  </li>
                )
                break
              case 'alexaSmartHome':
                if (typeof eventElem === 'object') {
                  detail.push(
                    <li class='list-nested-item'>
                      appId: {eventElem.appId}
                    </li>
                  )
                } else {
                  detail.push(
                    <li class='list-nested-item'>
                      appId: {eventElem}
                    </li>
                  )
                }
                break
            }

            events.push(
              <li class='list-nested-item'>
                <div class='list-item'>
                  <span>- {eventName}:</span>
                </div>
                <ul class='list-tree'>
                  {detail}
                </ul>
              </li>
            )
          })
        } else {
          events.push(
            <li class='list-nested-item'>
              <div class='list-item'>
                <span>- {event}</span>
              </div>
            </li>
          )
        }
      })
    }

    return (
      <div class="function-block control-content">
        <div class="function-header">
          <ul class='list-tree'>
            <li class='list-nested-item'>
              <div class='list-item'>
                <h3>{functionName}</h3>
              </div>
              <ul class='list-tree'>
                <li class='list-nested-item'>
                  <div class='list-item'>
                    Events
                  </div>
                  <ul class='list-tree'>
                    {events}
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
              <button class="btn" onClick={this.slsInfo} >Apply</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
