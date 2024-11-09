import React, { useState } from 'react';

import axios from 'axios';

import UploadFile from './UploadFile';

const ModelDetect = () => {
    const [filestatus,setfilestatus]=useState(false)
    const [detectstatus,setdetectstatus]=useState(false)
    const [detecting,setdetecting]=useState(false)
    const [downloading,setdownloading]=useState(false)
    const detect = () => {
        setdetectstatus(false)
        setfilestatus(false)
        setdetecting(true)
        var data ={
            "cluster_arn" : "arn:aws:ecs:us-east-1:429951672491:cluster/yolov8_api",
            "task_definition_arn" : "arn:aws:ecs:us-east-1:429951672491:task-definition/yolov8_detect:15",
            "task_type":"yolo8_detect"
        }

        axios.post(process.env.REACT_APP_DEPLOY_ECS_TASK, data, {
            headers: {
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*', 
            },
            responseType: 'text',
          })
          .then(response => {
            setdetecting(false)
            console.log("Upload successful:", response);
            console.log(JSON.parse(response.data).err);
            if(!JSON.parse(response.data).err){
              setdetectstatus(true)
            }
            else{
                setfilestatus(true)
            }
          })
          .catch(error => {
            setdetecting(false)
            setdetectstatus(false)
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
            "download_path":"yolo8_detect/",
            "task_type":"yolo8_detect"
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
                link.download = 'yolo8_detect';
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
                            <h4 className="form-label">Model Detect</h4>
                        </div>
                        <div className="col-12 px-4 pb-4">
                            <h5 className="form-label">#image</h5>
                        <UploadFile
                            uploadfile="image"
                            tasktype="yolo8_detect"
                            url={process.env.REACT_APP_UPLOAD_FILE}
                            setfilestatus={setfilestatus}
                            modelstatus={setdetectstatus}
                        />
                        <button 
                        class='btn btn-primary mt-3' 
                        style={{width:"100%"}}
                        onClick={detect}
                        disabled={!filestatus}
                        >{detectstatus?"Success":<>{detecting ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Detect"}</>}
                        </button>
                        <button 
                            class='btn btn-primary mt-3' 
                            style={{width:"100%"}}
                            onClick={download}
                            disabled={!detectstatus}
                            >{downloading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "download"}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            
        
        
        
    )


}

export default ModelDetect