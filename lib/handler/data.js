const EventEmitter = require('events')
const fileDbHandler = require('./onFileNodeFound')
const dirDbHandler = require('./onDirNodeFound')

function dataHandler(data) {
    (async () => {
        data = await Promise.all(data);
        const newData = JSON.parse(JSON.stringify(data));
        const myDataEmitter = new EventEmitter()
        myDataEmitter.on('fileAsset', fileDbHandler)
        myDataEmitter.on('dirAsset', dirDbHandler)
        sortFiles();
        sortFolders();
        function sortFiles() {
            let fileContent = newData.filter(e => e.type === 'file');
            // clone the object
            // fileContent = clone(fileContent)
            fileContent = fileContent.map((e) => {
                delete e.name
                delete e.dirname
                delete e.lastModified
                delete e.birthTime
                delete e.size
                delete e.type
                return e;
            })
            myDataEmitter.emit('fileAsset', fileContent)
        }
        function sortFolders() {
            let dirContent = newData.filter(e => e.type === 'directory');
            //clone the array
            // dirContent = clone(dirContent);
            dirContent = dirContent.map(e => {
                delete e.name
                delete e.dirname
                delete e.lastModified
                delete e.birthTime
                delete e.size
                delete e.items
                delete e.type
                return e;
            })
            myDataEmitter.emit('dirAsset', dirContent)
        }
        function clone(e) {
            return JSON.parse(JSON.stringify(e))
        }
    })()

}
module.exports = dataHandler;