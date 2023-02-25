const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const { exec, spawn } = require('child_process');

let count = 0
let win;

// const createWindow = () => {
//     const win = new BrowserWindow({
async function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // win.loadFile('index.html')
    // MUST await for api messages to be recevied properly
    await win.loadURL(url.format ({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));


    // initialize responsive contents of window
    win.webContents.send("increment-response", count);

}

// app.on("ready", createWindow);

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Main process
// let count = 0;
// ipcMain.handle('increment-count', async (event) => {
//   count = count + 1
//   return count
// })

ipcMain.handle("increment-count-callback", async (event) => {
    count = count + 1
    return count
});

ipcMain.handle("compute", async (event, n1, n2, op) => {

    // streaming approach, for very large data transfers
    let python = spawn('python3', [path.join(app.getAppPath(), 'python/calculator.py'), n1, n2, op])

    output = ''
    python.stdout.on('data', (data) => {
        output += data;
        console.log(`Received chunk ${data.toString()}`);
    });
    await new Promise( (resolve) => { python.on('close', resolve) });

    return output

    // python.on('data', (data) => {
    //     console.log(data);
    // });

    // console.log(python)
    // python.on('close', function(exitCode) {
    //     //Here you can get the exit code of the script

    //     console.log('closing code: ' + exitCode);

    //     // console.log('Full output of script: ',scriptOutput);
    // });

    // const op_dict = {
    //     'addition'       : (a, b) => {return a + b},
    //     'subtration'     : (a, b) => {return a - b},
    //     'multiplication' : (a, b) => {return a * b},
    //     'division'       : (a, b) => {return a / b},
    //     '' : (a, b) => {return undefined}
    // }

    // const result = op_dict[op](Number(n1), Number(n2))
    // return result




});


ipcMain.on("increment-count", (event) => {

    count = count + 1
    win.webContents.send("increment-response", count)
    // return count
  // fs.readFile("path/to/file", (error, data) => {
  //   // Do something with file contents

  //   // Send result back to renderer process
  //   win.webContents.send("fromMain", responseObj);
  // });
});