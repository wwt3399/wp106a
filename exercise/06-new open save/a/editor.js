const {Menu, dialog} = require('electron').remote //一般网页内要加remote
const fs = require('fs')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: '开启新档',
        accelerator: 'CmdOrCtrl+n',
        click: function () {
          var filePath = document.getElementById('filePath')
          filePath.innerText = ''
          var text = document.getElementById('text')
          text.value = ''
        }
      },
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog(
            function (fileName) {
              if (fileName === undefined) {
                console.log('No file selected')
                return
              }
              console.log('fileName=' + fileName)

              var filePath = document.getElementById('filePath')
              filePath.innerText = fileName
              fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                if (err) window.alert('read fail!')
                var text = document.getElementById('text')
                text.value = data
              })
            }
          )
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
          var fileName = document.getElementById('filePath').innerText
          if (fileName.trim().length === 0) window.alert('No file loaded!')
          var text = document.getElementById('text')
          fs.writeFile(fileName, text.value)
        }
      },
      {
        label: '另存为',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: function () {
          dialog.showSaveDialog({filters: [ { name: 'text', extensions: ['txt'] } ]},
          function (fileName) {
            var text = document.getElementById('text')
            fs.writeFile(fileName, text.value)
            }
          )
        }
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },//此为分割线，role则是原本就有预设的功能
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [ { label: 'Learn More' } ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
