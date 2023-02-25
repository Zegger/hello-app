const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld(ipcRenderer)

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})

contextBridge.exposeInMainWorld(
    "api", {

    	// count: () => {
    	// 	return ipcRenderer.invoke('increment-count-callback')
    	// },
    	// NEW APPROACH, implcit event response with callback
    	// count: () => ipcRenderer.invoke('increment-count-callback'),

    	compute: (...args) => ipcRenderer.invoke('compute', ...args),

    	// OLD APPROACH, explicit send and receive
    	// messages from renderer to main
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["increment-count"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },

        // messages from main to renderer
        receive: (channel, func) => {
            let validChannels = ["increment-response"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);