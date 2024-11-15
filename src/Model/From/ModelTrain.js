import React, { useState } from 'react';
import { Modal, Button  } from "react-bootstrap";
import axios from 'axios';

import UploadFile from './UploadFile';

const ModelTrain = () => {
    const [modelname, setmodelname] = useState('');
    const [namesOfClasses, setNamesOfClasses] = useState('');
    const [yoloModel, setYoloModel] = useState('');
    const [batch, setBatch] = useState('');
    const [epochs, setEpochs] = useState('');
    const [patience, setPatience] = useState('');
    const [learningRateLr0, setLearningRateLr0] = useState('');
    const [learningRateLrf, setLearningRateLrf] = useState('');
    const [resizeImageSize, setResizeImageSize] = useState('');

    const [filestatus1, setfilestatus1] = useState(false);
    const [filestatus2, setfilestatus2] = useState(false);
    const [trainstatus, settrainstatus] = useState(false);
    const [training, settraining] = useState(false);
    const [downloading, setdownloading] = useState(false);
    const [isParametersValid, setIsParametersValid] = useState(false);
    // Modal 狀態
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    // const [modalCallback, setModalCallback] = useState('');


    const showModalWithMessage = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    // 檢查是否有輸入任何參數
    const parameterCheck = () => {
        if (
            namesOfClasses ||
            yoloModel ||
            batch ||
            epochs ||
            patience ||
            learningRateLr0 ||
            learningRateLrf ||
            resizeImageSize
        ) {
            setIsParametersValid(true);
        } else {
            setIsParametersValid(false);
        }
    };
    const train = () => {
        // 檢查 modelname 是否為空
        if (!modelname.trim()) {
          showModalWithMessage("Model name cannot be empty!");
          return;
        }
        settrainstatus(false)
        setfilestatus1(false)
        setfilestatus2(false)
        settraining(true)

        // var data ={
        //     "cluster_arn" : "arn:aws:ecs:us-east-1:429951672491:cluster/yolov8_api",
        //     "task_definition_arn" : "arn:aws:ecs:us-east-1:429951672491:task-definition/yolov8_train:7",
        //     "task_type":"yolo8_train",
        //     "model_type":"yolov8",
        //     "model_name":modelname,
        //     "model_folder_name":`yolo8_train/${modelname}/`
        // }
        let data = {
            "cluster_arn": "arn:aws:ecs:us-east-1:429951672491:cluster/yolov8_api",
            "task_definition_arn": "arn:aws:ecs:us-east-1:429951672491:task-definition/yolov8_train:7",
            "task_type": "yolo8_train",
            "model_type": "yolov8",
            "model_name": modelname,
            "model_folder_name": `yolo8_train/${modelname}/`
        };

        if (namesOfClasses) data.names_of_classes = namesOfClasses;
        if (yoloModel) data.YOLO_model = yoloModel;
        if (batch) data.batch = parseInt(batch);
        if (epochs) data.epochs = parseInt(epochs);
        if (patience) data.patience = parseInt(patience);
        if (learningRateLr0) data.learning_rate_lr0 = parseFloat(learningRateLr0);
        if (learningRateLrf) data.learning_rate_lrf = parseFloat(learningRateLrf);
        if (resizeImageSize) data.resize_image_size = parseInt(resizeImageSize);

        console.log('request data:', data);
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
              settrainstatus(true);
              showModalWithMessage("Training successful!");
            }
            else{
                setfilestatus1(true)
                setfilestatus2(true)
                if(JSON.parse(response.data).err_msg === "Model name already exists! please select another model_name."){
                  showModalWithMessage("Model name already exists! Please select another model_name.");
                }else{
                  showModalWithMessage("deploy model train task failed.");
                }
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
            showModalWithMessage("Training failed. Please check your inputs.");
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
                        <h5 className="form-label mt-3">#input(必填)</h5>
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
                        <div className="input-group mb-3">
                            <span className="input-group-text">namesOfClasses</span>
                            <input type="text" className="form-control" placeholder="rock, paper, scissors" value={namesOfClasses} onChange={(e) => setNamesOfClasses(e.target.value)} />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">yoloModel</span>
                            <input type="text" className="form-control" placeholder="yolov8s.pt" value={yoloModel} onChange={(e) => setYoloModel(e.target.value)} />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">batch</span>
                            <input type="number" className="form-control" placeholder="16" value={batch} onChange={(e) => setBatch(e.target.value)} />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">epochs</span>
                            <input type="number" className="form-control" placeholder="100" value={epochs} onChange={(e) => setEpochs(e.target.value)} />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">patience</span>
                            <input type="number" className="form-control" placeholder="50" value={patience} onChange={(e) => setPatience(e.target.value)} />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">learningRateLr0</span>
                            <input type="number" className="form-control" placeholder="0.000003" step="0.0001" value={learningRateLr0} onChange={(e) => setLearningRateLr0(e.target.value)} />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">learningRateLrf</span>
                            <input type="number" className="form-control" placeholder="0.1" step="0.0001" value={learningRateLrf} onChange={(e) => setLearningRateLrf(e.target.value)} />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text">resizeImageSize</span>
                            <input type="number" className="form-control" placeholder="320" value={resizeImageSize} onChange={(e) => setResizeImageSize(e.target.value)} />
                        </div>
                    </form>


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

export default ModelTrain