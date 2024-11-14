import React, { useState } from 'react';
import { Modal, Button  } from "react-bootstrap";
import axios from 'axios';

import InstAI_icon from '../Image/instai_icon.png';
import styles from './ImgGeneration.module.css';

const ImgGeneration = () => {
  const [isGenerate, setGenerate] = useState(false);
  const [status, setStatus] = useState('Default');
  const [images, setImages] = useState([]);
  // Modal 狀態
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // const [modalCallback, setModalCallback] = useState('');

  const showModalWithMessage = (message) => {
      setModalMessage(message);
      setShowModal(true);
  };

  const [formData, setformData] = useState(
    {
      "enable_hr": false,
      "denoising_strength": 0,
      "hr_scale": 2,
      "hr_upscaler": "Latent",
      "hr_second_pass_steps": 0,
      "hr_resize_x": 0,
      "hr_resize_y": 0,
      "prompt": "",
      "styles": [],
      "seed": -1,
      "batch_size": 1,
      "n_iter": 1,
      "steps": 20,
      "cfg_scale": 7,
      "width": 512,
      "height": 512,
      "restore_faces": false,
      "tiling": false,
      "negative_prompt": "",
      "eta": 0,
      "override_settings": {
          "sd_model_checkpoint": "v1-5-pruned-emaonly.safetensors [6ce0161689]"
      },
      "script_args": [],
      "sampler_index": "Euler a",
      "alwayson_scripts": {}
  }
);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const handleGenerate = async (e) => {
    setImages([]);
    e.preventDefault();
    const data = formData;
    if(data.prompt === ""){
      showModalWithMessage("prompt cannot be empty!");
      return;
    }
    console.log(data)
    try {
        setGenerate(true)
        setStatus('Generating')
        const response = await axios.post(process.env.REACT_APP_TXT2IMG_PROCESS_DEMO, data ,{ timeout: 180000 });
        console.log(response)
        if(response.data.err===false){
            setImages(response.data.images);
            setStatus('Done')
            showModalWithMessage("image generating successful!");
        }
        else{
            setStatus('Error')
            showModalWithMessage("image generating failed!");
        }
    } catch (error) {
        console.error("Error generating images:", error)
        setStatus('Error')
        showModalWithMessage("image generating Error!");
    }
    
    setGenerate(false)
  }

  const downloadAllImg = () => {
    console.log(typeof(images))
    images.forEach((image,index) => {downloadImg(image,index)});
  };

  const downloadImg = (image,index) => {
    const byteString = atob(image);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'image/png' }); // 根據需要更改 MIME 類型
    const url = URL.createObjectURL(blob);

    // 創建隱藏的 <a> 元素並觸發下載
    const link = document.createElement('a');
    link.href = url;
    
    link.download = `Generation ${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 釋放 URL
    URL.revokeObjectURL(url);
  }

  return(
    <div className={`${styles["page"]} px-3`}>
      <div className={styles["page-container"]}>
        <div className={"col-12"}>
          <img src={InstAI_icon} className={styles["img-fluid"]} alt="InstAi_Icon" />
        </div>
        <div className={styles["main-container"]}> 
          <div className={styles["form-container"]}>
            <form onSubmit={handleGenerate}>
              
              <div className={styles["form-group"]}>
                <label className={styles["label"]}>Prompt</label>
                <input name="prompt" value={formData.prompt} onChange={handleChange} type='text'  placeholder ="Please enter prompt for image generation" readOnly={isGenerate}/>
              </div>
              
              <div className={styles["form-group"]}>
                <label className={styles["label"]}>Negative Prompt</label>
                <input name="negative_prompt" value={formData.negative_prompt} onChange={handleChange} type='text' placeholder ="Please enter negative prompt for image generation" readOnly={isGenerate}/>
              </div>


              <div className={styles["form-group-row"]}>

                <div className={styles["widths"]}>
                  <label className={styles["label"]}>Width</label>
                  <input className={styles["width"]} name="width" value={formData.width} onChange={handleChange} type='number' readOnly={isGenerate}/>
                  <input className={styles["width"]} name="width" value={formData.width} onChange={handleChange} type='range' min="64" max="2048" disabled={isGenerate}/>
                </div>
                
                <div className={styles["batch_sizes"]}>
                  <label className={styles["label"]}>Batch Size</label>
                  <input className={styles["batch_size"]} name="batch_size" value={formData.batch_size} onChange={handleChange} type='number' readOnly={isGenerate}/>
                  <input className={styles["batch_size"]} name="batch_size" value={formData.batch_size} onChange={handleChange} type='range' min="1" max="8" disabled={isGenerate}/>
                </div>
              </div>


              <div className={styles["form-group"]}>
                <label className={styles["label"]}>Height</label>
                <input className={styles["height"]} name="height" value={formData.height} onChange={handleChange} type='number' readOnly={isGenerate}/>
                <input className={styles["height"]} name="height" value={formData.height} onChange={handleChange} type='range' min="64" max="2048" disabled={isGenerate}/>
              </div>

              <div style={{ display: "flex", flexDirection: "row",marginTop: "5%"}}>
                <button className={styles["btn_submit"]} type='submit' disabled={isGenerate}>{isGenerate ? 'Generating' : 'Generate'}</button>
                <button className={styles["btn"]} type='button' disabled={isGenerate} onClick={downloadAllImg}>Download All</button>
              </div>
              
            </form>
          </div>

          <div className={styles["image-container"]}>
            {(status === "Default") && <div className={`${styles["placeholder"]} placeholder`}>No images</div>}
            {!(status === "Default") && (images.length > 0 ?(
              <div className={styles["image-gallery"]} style={{ overflowY: 'auto', width: "100%", Height: '100%' , padding: '10px'}}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {images.map((img, index) => (
                    <div key={index} style={{ width: 'calc(50% - 10px)', marginBottom: '10px'}}>
                      <img
                        src={`data:image/png;base64,${img}`}
                        loading="lazy"
                        alt={`Generated ${index}`}
                        className={styles["img"]}
                        style={{ width: '100%', height: '100%', borderRadius: '8px', cursor: "pointer" }}
                        onClick={() => downloadImg(img,index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ):(
              <p className={styles["status"]}  style={{margin: "0%",cursor:'default'}}>
                {(status === "Error") ? <p style={{color:"red"}}>Generating error!!!</p>:"Loading images..."}</p>
            ))}
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

export default ImgGeneration