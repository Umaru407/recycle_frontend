import React, { useState, useEffect } from 'react';

const FileUpload = () => {
  const [fileInfo, setFileInfo] = useState({ fileName: '', isImage: false });
  const [progress, setProgress] = useState(0);
  const fileSizeLimit = 1024; // In MB

  useEffect(() => {
    const fileSelect = document.getElementById('file-upload');
    const fileDrag = document.getElementById('file-drag');

    fileSelect.addEventListener('change', handleFileSelect, false);

    // Is XHR2 available?
    const xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // File Drop
      fileDrag.addEventListener('dragover', handleFileDragHover, false);
      fileDrag.addEventListener('dragleave', handleFileDragHover, false);
      fileDrag.addEventListener('drop', handleFileSelect, false);
    }

    return () => {
      fileSelect.removeEventListener('change', handleFileSelect);
      if (xhr.upload) {
        fileDrag.removeEventListener('dragover', handleFileDragHover);
        fileDrag.removeEventListener('dragleave', handleFileDragHover);
        fileDrag.removeEventListener('drop', handleFileSelect);
      }
    };
  }, []);

  const handleFileDragHover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const fileDrag = document.getElementById('file-drag');
    fileDrag.className = e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
  };

  const handleFileSelect = (e) => {
    // Fetch FileList object
    const files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    handleFileDragHover(e);

    // Process all File objects
    for (let i = 0, f; f = files[i]; i++) {
      parseFile(f);
      uploadFile(f);
    }
  };

  const parseFile = (file) => {
    const imageName = file.name;
    const isImage = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
    setFileInfo({ fileName: file.name, isImage });

    if (isImage) {
      document.getElementById('start').classList.add('hidden');
      document.getElementById('response').classList.remove('hidden');
      document.getElementById('notimage').classList.add('hidden');
      // Thumbnail Preview
      const fileImage = document.getElementById('file-image');
      fileImage.classList.remove('hidden');
      fileImage.src = URL.createObjectURL(file);
    } else {
      document.getElementById('file-image').classList.add('hidden');
      document.getElementById('notimage').classList.remove('hidden');
      document.getElementById('start').classList.remove('hidden');
      document.getElementById('response').classList.add('hidden');
      document.getElementById('file-upload-form').reset();
    }
  };

  const uploadFile = (file) => {
    const xhr = new XMLHttpRequest();
    const pBar = document.getElementById('file-progress');

    if (xhr.upload) {
      // Check if file is less than x MB
      if (file.size <= fileSizeLimit * 1024 * 1024) {
        // Progress bar
        pBar.style.display = 'inline';
        xhr.upload.addEventListener('loadstart', (e) => setProgressMaxValue(e, pBar), false);
        xhr.upload.addEventListener('progress', (e) => updateFileProgress(e, pBar), false);

        // File received / failed
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4) {
            // Everything is good!
            // progress.className = (xhr.status === 200 ? 'success' : 'failure');
            // document.location.reload(true);
          }
        };

        // Start upload
        xhr.open('POST', document.getElementById('file-upload-form').action, true);
        xhr.setRequestHeader('X-File-Name', file.name);
        xhr.setRequestHeader('X-File-Size', file.size);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(file);
      } else {
        output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
      }
    }
  };

  const setProgressMaxValue = (e, pBar) => {
    if (e.lengthComputable) {
      pBar.max = e.total;
    }
  };

  const updateFileProgress = (e, pBar) => {
    if (e.lengthComputable) {
      setProgress(e.loaded);
    }
  };

  const output = (msg) => {
    const m = document.getElementById('messages');
    m.innerHTML = msg;
  };

  return (
    <div className="file-upload">
      <form id="file-upload-form" className="uploader">
        <input id="file-upload" type="file" name="fileUpload" />
        <label id="file-drag" htmlFor="file-upload">
          Drag and drop your file here
        </label>
        <div id="start">
          <span id="start">Select a file or drag it here</span>
          <span id="notimage" className="hidden">Please select an image file</span>
        </div>
        <div id="response" className="hidden">
          <div id="messages">{fileInfo.fileName}</div>
          <img id="file-image" className="hidden" alt="Preview" />
        </div>
        <progress id="file-progress" value={progress} max="100" style={{ display: 'none' }}>
          {progress}%
        </progress>
        <input type="submit" id="submit-button" className="hidden" />
      </form>
    </div>
  );
};

export default FileUpload;
