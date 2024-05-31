import React, { useState ,useEffect} from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import "./test.css";

const ImageClassify = () => {
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
  
    const uploadFile = async (file) => {
        if (file.size <= fileSizeLimit * 1024 * 1024) {
          const formData = new FormData();
          formData.append('file', file);
    
          try {
            const response = await fetch('http://localhost:8080/getClassify', {
              method: 'POST',
              body: formData,
              headers: {
                'X-File-Name': file.name,
                'X-File-Size': file.size,
              },
            });
    
            if (response.ok) {

              console.log(response,'File uploaded successfully!');
              // Handle response
            } else {
              console.error('File upload failed!');
            }
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        } else {
          output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
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
    <Box>
      <h2>File Upload & Image Preview</h2>
      <p class="lead">
        No Plugins <b>Just Javascript</b>
      </p>

      <form id="file-upload-form" class="uploader">
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          accept="image/*"
        />

        <label for="file-upload" id="file-drag">
          <img id="file-image" src="#" alt="Preview" class="hidden" />
          <div id="start">
            <i class="fa fa-download" aria-hidden="true"></i>
            <div>Select a file or drag here</div>
            <div id="notimage" class="hidden">
              Please select an image
            </div>
            <span id="file-upload-btn" class="btn btn-primary">
              Select a file
            </span>
          </div>
          <div id="response" class="hidden">
            <div id="messages"></div>
            <progress class="progress" id="file-progress" value="0">
              <span>0</span>%
            </progress>
          </div>
        </label>
      </form>
    </Box>
  );
};

export default ImageClassify;
