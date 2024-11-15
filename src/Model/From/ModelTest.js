import React, { useState } from 'react';
import { Modal, Button  } from "react-bootstrap";
import axios from 'axios';

import UploadFile from './UploadFile';

const ModelTest = () => {
    const [modelname,setmodelname]=useState('')
    const [filestatus1,setfilestatus1]=useState(false)
    const [filestatus2,setfilestatus2]=useState(false)
    const [teststatus,setteststatus]=useState(false)
    const [testing,settesting]=useState(false)
    const [downloading,setdownloading]=useState(false)
    const [confidence_threshold, setConfidenceThreshold] = useState('');
    const [iou_threshold, setIouThreshold] = useState('');
    const [resize_image_size, setResizeImageSize] = useState('');
    const [isParametersValid, setIsParametersValid] = useState(false);
    // Modal 狀態
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    // const [modalCallback, setModalCallback] = useState('');

    const showModalWithMessage = (message) => {
      setModalMessage(message);
      setShowModal(true);
    };

    const parameterCheck = () => {
        // 檢查 confidence_threshold 是否在 0 到 1 之間
        const isConfidenceValid = !isNaN(confidence_threshold) && 
                                  confidence_threshold >= 0 && 
                                  confidence_threshold <= 1;
        
        // 檢查 iou_threshold 是否在 0 到 1 之間
        const isIouValid = !isNaN(iou_threshold) && 
                           iou_threshold >= 0 && 
                           iou_threshold <= 1;
        
        // 檢查 resize_image_size 是否為正整數
        const isResizeValid = !isNaN(resize_image_size) && 
                              parseInt(resize_image_size) > 0;
    
        // 更新 isParametersValid 狀態
        if (isConfidenceValid && isIouValid && isResizeValid) {
            setIsParametersValid(true);
        } else {
            setIsParametersValid(false);
        }
    };

    const test = () => {
        // 檢查 modelname 是否為空
        if (!modelname.trim()) {
          showModalWithMessage("Model name cannot be empty!");
          return;
        }
        setteststatus(false)
        setfilestatus1(false)
        setfilestatus2(false)
        settesting(true)
        // 動態構建請求資料
        let data ={
            "cluster_arn" : "arn:aws:ecs:us-east-1:429951672491:cluster/yolov8_api",
            "task_definition_arn" : "arn:aws:ecs:us-east-1:429951672491:task-definition/yolov8_test:1",
            "task_type":"yolo8_test",
            "model_name":modelname,
            "model_folder_name": `yolo8_test/${modelname}/`
        }

        // 僅在參數不為空時加入資料
        if (confidence_threshold) data.confidence_threshold = parseFloat(confidence_threshold);
        if (iou_threshold) data.iou_threshold = parseFloat(iou_threshold);
        if (resize_image_size) data.resize_image_size = parseInt(resize_image_size);
        console.log('request data:', data)
        axios.post(process.env.REACT_APP_DEPLOY_ECS_TASK, data, {
            headers: {
              'Content-Type': 'application/json', 
              'Access-Control-Allow-Origin': '*', 
            },
            responseType: 'text',
          })
          .then(response => {
            settesting(false)
            console.log("Upload successful:", response);
            console.log(JSON.parse(response.data).err);
            if(!JSON.parse(response.data).err){
              setteststatus(true)
              showModalWithMessage("Testing successful!");
            }
            else{
                setfilestatus1(true)
                setfilestatus2(true)
                console.log(response.data);
                if(JSON.parse(response.data).err_msg === "Model folder name already exists! please select another model_name."){
                  showModalWithMessage("Model folder name already exists! please select another model_name.");
                } else if(JSON.parse(response.data).err_msg === "Model folder name doesn't exist! Please select the correct model_name."){
                  showModalWithMessage("Model folder name from yolo8 train doesn't exist! Please select the correct model_name.");
                } else{
                  showModalWithMessage("deploy model test task failed.");
                }
                
            }
          })
          .catch(error => {
            setteststatus(false)
            settesting(false)
            if (error.response) {
              console.log("Server responded with an error:", error.response);
            } else if (error.request) {
              console.log("No response received from server. Network error:", error.request);
            } else {
              console.log("Error in request setup:", error.message);
            }
            showModalWithMessage("Testing failed. Please check your inputs.");
          });
    }

    const download = () => {
        setdownloading(true)
        var data={
            "download_path":`yolo8_test/${modelname}/`,
            "task_type":"yolo8_test"
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
                link.download = 'yolo8_test';
                link.click();
                showModalWithMessage("Download successful!");
            } else {
              showModalWithMessage("Download failed.");
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
            showModalWithMessage("Download error. Please try again.");
          });
    }

    return(

        <div className='m-4'>
            <div className="container-fluid card border-light shadow-sm p-0 mb-5">
                <div className="row">
                    <div className="col-12 m-3">
                        <h4 className="form-label">Model Test</h4>
                    </div>
                    <div className="col-12 px-4 pb-4">
                        <h5 className="form-label">#image</h5>
                    <UploadFile
                        uploadfile="image"
                        tasktype="yolo8_test"
                        url={process.env.REACT_APP_UPLOAD_FILE}
                        setfilestatus={setfilestatus1}
                    />
                      <h5 className="form-label mt-3">#label</h5>
                    <UploadFile
                        uploadfile="label"
                        tasktype="yolo8_test"
                        url={process.env.REACT_APP_UPLOAD_FILE}
                        setfilestatus={setfilestatus2}
                        modelstatus={setteststatus}
                    />
                        <h5 className="form-label mt-3">#input(必填 注意:model_name必須為yolo8_train已存在之model_name，否則會返回錯誤!)</h5>
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

                    <h5 className="form-label mt-3">#parameter(可不填)</h5>
                            <form className="was-validated" onChange={parameterCheck} noValidate>
                                {/* confidence_threshold */}
                                <div className="input-group mb-3">
                                    <span className="input-group-text">confidence_threshold</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="0.5"
                                        step="0.01"
                                        min="0"
                                        max="1"
                                        value={confidence_threshold}
                                        onChange={(e) => setConfidenceThreshold(e.target.value)}
                                    />
                                </div>
                                
                                {/* iou_threshold */}
                                <div className="input-group mb-3">
                                    <span className="input-group-text">iou_threshold</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="0.5"
                                        step="0.01"
                                        min="0"
                                        max="1"
                                        value={iou_threshold}
                                        onChange={(e) => setIouThreshold(e.target.value)}
                                    />
                                </div>
                                
                                {/* resize_image_size */}
                                <div className="input-group mb-3">
                                    <span className="input-group-text">resize_image_size</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="640"
                                        step="1"
                                        min="1"
                                        value={resize_image_size}
                                        onChange={(e) => setResizeImageSize(e.target.value)}
                                    />
                                </div>
                            </form>

                    <button 
                    class='btn btn-primary mt-3' 
                    style={{width:"100%"}}
                    onClick={test}
                    disabled={!filestatus1 && !filestatus2 && !isParametersValid}
                    >{teststatus?"Success":<>{testing ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Test"}</>}
                    </button>

                    <button 
                        class='btn btn-primary mt-3' 
                        style={{width:"100%"}}
                        onClick={download}
                        disabled={!teststatus}
                        >{downloading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "download"}
                    </button>
                        
                    </div>
                </div>
            </div>
            {/* Modal 顯示訊息 */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>            
        </div>
        
        
    )
}

export default ModelTest