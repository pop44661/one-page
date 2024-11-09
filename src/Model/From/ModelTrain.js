import React, { useState } from 'react';

import axios from 'axios';

import UploadFile from './UploadFile';

const ModelTrain = () => {
    const [modelname,setmodelname]=useState('')
    const [filestatus1,setfilestatus1]=useState(false)
    const [filestatus2,setfilestatus2]=useState(false)
    const [trainstatus,settrainstatus]=useState(false)
    const [training,settraining]=useState(false)
    const [downloading,setdownloading]=useState(false)

    const train = () => {
        settrainstatus(false)
        setfilestatus1(false)
        setfilestatus2(false)
        settraining(true)
        var data ={
            "cluster_arn" : "arn:aws:ecs:us-east-1:429951672491:cluster/yolov8_api",
            "task_definition_arn" : "arn:aws:ecs:us-east-1:429951672491:task-definition/yolov8_train:7",
            "task_type":"yolo8_train",
            "model_type":"yolov8",
            "model_name":modelname,
            "model_folder_name":`yolo8_train/${modelname}/`
        }

        axios.post(process.env.REACT_APP_DEPLOY_ECS_TASK, data, {
            headers: {
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*', 
            },
            responseType: 'text',
          })
          .then(response => {
            settraining(false)
            console.log("Upload successful:", response);
            console.log(JSON.parse(response.data).err);
            if(!JSON.parse(response.data).err){
              settrainstatus(true)
            }
            else{
                setfilestatus1(true)
                setfilestatus2(true)
            }
          })
          .catch(error => {
            settraining(false)
            settrainstatus(false)
            if (error.response) {
              console.log("Server responded with an error:", error.response);
            } else if (error.request) {
              console.log("No response received from server. Network error:", error.request);
            } else {
              console.log("Error in request setup:", error.message);
            }
          });
    }

    const download = () => {
      setdownloading(true)
        var data={
            "download_path":`yolo8_train/${modelname}/`,
            "task_type":"yolo8_train"
        }
        
        axios.post(process.env.REACT_APP_DOWNLOAD_FILE, data, {
            headers: {
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*', 
            },
            responseType: 'text',
          })
          .then(response => {
            setdownloading(false)
            console.log("Upload successful:", response);
            console.log(JSON.parse(response.data).err);
            if(!JSON.parse(response.data).err){
                const link = document.createElement('a');
                link.href = JSON.parse(response.data).download_url;
                link.download = 'yolo8_train';
                link.click();
            }
          })
          .catch(error => {
            setdownloading(false)
            if (error.response) {
              console.log("Server responded with an error:", error.response);
            } else if (error.request) {
              console.log("No response received from server. Network error:", error.request);
            } else {
              console.log("Error in request setup:", error.message);
            }
          });
    }

    return(

        <div className='m-4'>
            <div className="container-fluid card border-light shadow-sm p-0 mb-5">
                <div className="row">
                    <div className="col-12 m-3">
                        <h4 className="form-label">Model Train</h4>
                    </div>
                    <div className="col-12 px-4 pb-4">
                        <h5 className="form-label">#image</h5>
                    <UploadFile
                        uploadfile="image"
                        tasktype="yolo8_train"
                        url={process.env.REACT_APP_UPLOAD_FILE}
                        setfilestatus={setfilestatus1}
                        modelstatus={settrainstatus}
                    />
                        <h5 className="form-label mt-3">#label</h5>
                    <UploadFile
                        uploadfile="label"
                        tasktype="yolo8_train"
                        url={process.env.REACT_APP_UPLOAD_FILE}
                        setfilestatus={setfilestatus2}
                        modelstatus={settrainstatus}
                    />
                        <h5 className="form-label mt-3">#input</h5>
                    <div class="input-group  mt-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">model_name</span>
                        <input
                            type='text'
                            class="form-control"
                            aria-describedby="inputGroup-sizing-default"
                            value={modelname}
                            onChange={(e) => setmodelname(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                    class='btn btn-primary mt-3' 
                    style={{width:"100%"}}
                    onClick={train}
                    disabled={!filestatus1 && !filestatus2}
                    >{trainstatus?"Success":<>{training ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Train"}</>}
                    </button>

                    <button 
                        class='btn btn-primary mt-3' 
                        style={{width:"100%"}}
                        onClick={download}
                        disabled={!trainstatus}
                        >{downloading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "download"}
                    </button>
                        
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default ModelTrain