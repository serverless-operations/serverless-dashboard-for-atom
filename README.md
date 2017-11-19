# Serverless Dashboard For Atom Editor
This is a Atom editor package which allows you to deploy and manage your serverless service with [Serverless Framework](https://serverless.com/framework/) on [Atom](https://atom.io/).
Currently, this pakage has supported only AWS, but we will support multi providers in the future.

This project is inspired by [Serverless Dashboard](https://github.com/serverless/dashboard)

<img src="https://raw.githubusercontent.com/horike37/serverless-dashboard-for-atom/master/screenshot.gif" />

## Installation
### Preparation
Install [Serverless Framework](https://serverless.com/framework/)

 ```sh
 npm install -g serverless
 ```
    
### Command Line

1. Install [Atom](https://atom.io)
2. In the terminal, install the package via apm:

    ```sh
    apm install serverless-dashboard
    ```

### GUI

1. Install [Atom](https://atom.io)
1. Launch Atom
1. Open Settings View using <kbd>Cmd+,</kbd> on macOS or <kbd>Ctrl+,</kbd> on other platforms
1. Click the Install tab on the left side
1. Enter `serverless-dashboard` in the search box and press <kbd>Enter</kbd>
1. Click the "Install" button that appears

## How to use

### Launch Dashboard
1. Open Packages menu
1. Click `Serverless Dashboard > Open your serverless.yml`
1. Specify your serverless.yml

