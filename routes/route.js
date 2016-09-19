var file = require('file.js');

app.post('/fileupload',file.upload);
app.get('/download/:id',file.download);