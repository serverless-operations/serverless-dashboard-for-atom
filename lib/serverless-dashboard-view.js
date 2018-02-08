/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import ServerlessAction from './serverless-action'
import _ from 'lodash'
import yaml from 'js-yaml'
import os from 'os'
import path from 'path'
import fs from 'fs'

export default class ServerlessDashboardView {
  constructor (content, yamlPath) {
    this.slsObject = content
    this.yamlPath = yamlPath
    this.properties = {
      consoleOutput: ''
    }
    this.inputJson = {}
    etch.initialize(this)
    this.action = new ServerlessAction(path.dirname(this.yamlPath))
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

  update (newProperties) {
    if (newProperties && typeof newProperties.consoleOutput !== 'undefined') {
      this.properties.consoleOutput = newProperties.consoleOutput
      return etch.update(this)
    } else {
      return etch.update(this)
    }
  }

  getElement () {
    return this.element
  }

  resetCosnoleOutput () {
    this.update({
      consoleOutput: ''
    })
  }

  slsDeploy () {
    this.resetCosnoleOutput()
    this.properties.consoleOutput = `$ serverless deploy --stage ${this.refs.stage.value} --region ${this.refs.region.value}<br/><br/>`
    this.action.deploy(this.refs.region.value, this.refs.stage.value).stdout.on('data', (data) => {
      this.update({
        consoleOutput: `${this.properties.consoleOutput}${data.toString()}`
      })
    })
  }

  slsRemove () {
    this.resetCosnoleOutput()
    this.properties.consoleOutput = `$ serverless remove --stage ${this.refs.stage.value} --region ${this.refs.region.value}<br/><br/>`
    this.action.remove(this.refs.region.value, this.refs.stage.value).stdout.on('data', (data) => {
      this.update({
        consoleOutput: `${this.properties.consoleOutput}${data.toString()}`
      })
    })
  }

  slsAction (action, functionName) {
    this.resetCosnoleOutput()
    const inputJson = this.inputJson && this.inputJson[functionName] && this.inputJson[functionName].absolute
      ? this.inputJson[functionName].absolute : false
    switch (action) {
      case 'deploy-function':
        this.properties.consoleOutput = `$ serverless deploy function --function ${functionName} --stage ${this.refs.stage.value} --region ${this.refs.region.value}<br/><br/>`
        break
      case 'invoke':
        this.properties.consoleOutput = `$ serverless invoke --function ${functionName} --stage ${this.refs.stage.value} --region ${this.refs.region.value}`
        this.properties.consoleOutput += inputJson ? ` --path ${inputJson}` : ''
        this.properties.consoleOutput += '<br/><br/>'
        break
      case 'logs':
        this.properties.consoleOutput = `$ serverless logs --function ${functionName} --stage ${this.refs.stage.value} --region ${this.refs.region.value}<br/><br/>`
        break
    }
    const sls = this.action.action(action, functionName, this.refs.region.value, this.refs.stage.value, inputJson)
    sls.stdout.on('data', (data) => {
      this.update({
        consoleOutput: `${this.properties.consoleOutput}${data.toString()}`
      })
    })
    sls.stderr.on('data', (data) => {
      this.update({
        consoleOutput: `${this.properties.consoleOutput}${data.toString()}`
      })
    })
  }

  toggleInputJson (action, functionName) {
    if (action === 'invoke') {
      this.refs[`btn-${functionName}`].style = 'display:block;'
    } else {
      this.refs[`btn-${functionName}`].style = 'display:none;'
    }
  }

  addStage () {
    const option = document.createElement('option')
    option.setAttribute('value', this.refs.stageName.value)
    option.setAttribute('selected', 'selected')
    option.textContent = this.refs.stageName.value
    this.refs.stage.appendChild(option)
    this.refs.stageName.value = ''
  }

  reloadServerlessYml () {
    const data = yaml.safeLoad(fs.readFileSync(this.yamlPath, 'utf8'))
    this.slsObject = data
    this.update()
  }

  parseJson (functionName) {
    const remote = require('electron').remote
    const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {properties: ['openFile']})
    if (files && files.length) {
      this.inputJson[functionName] = {
        absolute: files[0],
        file: files[0].split(path.sep).pop()
      }
      this.update()
    }
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
            <div class="section-heading">
              <h1>{this.slsObject.service}</h1>
              <button class="btn icon icon-sync" onClick={this.reloadServerlessYml}>Reload serverless.yml</button>
            </div>
            <div class="operation-controls btn-group">
              <button class="btn btn-primary icon icon-cloud-upload" onClick={this.slsDeploy}>Deploy Service</button>
              <button class="btn btn-error icon icon-trashcan" onClick={this.slsRemove}>Remove Service</button>
            </div>
          </div>
          <div class="env-picker">
            <div class="env-picker-item control-group">
              <div class="controls">
                <div class="setting-title">
                  Stage
                  <input class='input-text' type='text' ref="stageName" placeholder='New Stage' />
                  <button class="btn" onClick={this.addStage}>Add</button>
                </div>
                <div class="select-container">
                  <select class="form-control" ref="stage">
                    <option value="dev">dev</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="env-picker-item control-group control-group-region">
              <div class="controls controls-region">
                <div class="setting-title">Region</div>
                <div class="select-container">
                  <select class="form-control" ref="region">
                    <option value="us-east-1">us-east-1</option>
                    <option value="us-east-2">us-east-2</option>
                    <option value="us-west-1">us-west-1</option>
                    <option value="us-west-2">us-west-2</option>
                    <option value="ca-central-1">ca-central-1</option>
                    <option value="eu-west-1">eu-west-1</option>
                    <option value="eu-central-1">eu-central-1</option>
                    <option value="eu-west-2">eu-west-2</option>
                    <option value="eu-west-3">eu-west-3</option>
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
          </div>
          <div class="operation-block">
            <div class="functions-block control-group">
              <h2>Functions</h2>
              {functions}
            </div>
            <div class="console-block control-group">
              <h2>Console Output</h2>
              <div ref='console-output' class="console-content" innerHTML={_.replace(this.properties.consoleOutput, new RegExp(os.EOL, 'g'), '<br />')} />
            </div>
          </div>
        </main>
      </div>
    )
  }

  functionsRender (functionElem, functionName) {
    const events = []
    const jsxFunctionName = `sls-action-${functionName}`
    const jsxBtnFunctionName = `btn-${functionName}`
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
              <select class="form-control" ref={jsxFunctionName} onChange={() => { this.toggleInputJson(this.refs[`sls-action-${functionName}`].value, functionName) }}>
                <option value="deploy-function">Deploy Function</option>
                <option value="invoke">Invoke</option>
                <option value="logs">Logs</option>
              </select>
              <button class="btn" onClick={() => {
                this.slsAction(this.refs[`sls-action-${functionName}`].value, functionName)
              }}>Apply</button>
            </div>
            <div class="pull-right" ref={jsxBtnFunctionName} style="display:none;">
              <button class="btn" onClick={() => {
                this.parseJson(functionName)
              }}>Input JSON</button><br />
              {this.inputJson && this.inputJson[functionName] && this.inputJson[functionName].file ? this.inputJson[functionName].file : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
