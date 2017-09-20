const {app, BrowserWindow} = require('electron')        /*这里的require('electron')指的是引用electron套件
                                                      在之前的大括号中则是引用了套件中的app和BrowserWindow
                                                      因此这段可以指代为 const electron = require('electron')
                                                                       const app = electron.app
                                                                       const BrowserWindow = electron.BrowsreWindow
                                                    大括号中放置的是物件，通过左边的指令会在electron中全部搜寻后
                                                    将两个指定的物件取出，详情可看阮一峰的es6的解构赋值*/

function createWindow () {
  var win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('file://' + __dirname + '/index.html')   //这里的__dirname是指当前文件夹下的目录，这里的文件夹是a
}

app.on('ready', createWindow)
