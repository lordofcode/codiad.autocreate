(function(global, $){

    var codiad = global.codiad;

    var autoCreateFileItems = ['README.md', 'TAGS.md'];
    var autoCreateFolderItems = [];

    $(function() {
        codiad.autocreate.init();
    });

    codiad.autocreate = {
       
        init: function() {
            amplify.subscribe('filemanager.onCreate', function(data){
                if (data.type == 'directory') {
                    codiad.autocreate.doCreate(data.createPath);
                }
            });
        },

        doCreate: function(path) {
            for (k=0; k < autoCreateFileItems.length; k++) {
                var fileType = 'file';
                var createFilePath = path + '/' + autoCreateFileItems[k];
                $.get(codiad.filemanager.controller + '?action=create&path=' + encodeURIComponent(createFilePath) + '&type=' + fileType, function(data) {
                    var createFileResponse = codiad.jsend.parse(data);
                    if (createFileResponse != 'error') {
                        codiad.message.success(fileType.charAt(0)
                            .toUpperCase() + fileType.slice(1) + ' Created');
                        // Add new element to filemanager screen
                        codiad.filemanager.createObject(path, createFilePath, fileType);
                    }
                });
            }
            for (k=0; k < autoCreateFolderItems.length; k++) {
                var folderType = 'directory';
                var createFolderPath = path + '/' + autoCreateFolderItems[k];
                $.get(codiad.filemanager.controller + '?action=create&path=' + encodeURIComponent(createFolderPath) + '&type=' + folderType, function(data) {
                    var createFolderResponse = codiad.jsend.parse(data);
                    if (createFolderResponse != 'error') {
                        codiad.message.success(folderType.charAt(0)
                            .toUpperCase() + folderType.slice(1) + ' Created');
                        // Add new element to filemanager screen
                        codiad.filemanager.createObject(path, createFolderPath, folderType);
                    }
                });
            }            
        }
    };
})(this, jQuery);