import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import UploadFile from '../Upload-File/Upload-File';
import UploadFileService from '../Upload-File/Upload-File-Service';
import ModelExamplesService from './Model-Examples-Service';

class Parameter {
    name = '';
    defaultValue = 0;
    type = 'text';
  
    constructor(name, defaultValue, type) {
      this.name = name;
      this.defaultValue = defaultValue;
      this.type = type;
    }
  }
  
  class SupportedModel {
    model = '';
    uploadImgUrl = '';
    uploadLabelUrl = '';
    downloadUrl = '';
    parameters = [];
    extraUploadUrls;
    extraUploadParams = [];
    runExampleSection = true;
  
    constructor(
      model,
      uploadImgUrl,
      uploadLabelUrl,
      downloadUrl,
      parameters,
      extraUploadUrls = new Map(),
      extraUploadParams = [],
      runExampleSection = true
    ) {
      this.model = model;
      this.uploadImgUrl = uploadImgUrl;
      this.uploadLabelUrl = uploadLabelUrl;
      this.downloadUrl = downloadUrl;
      this.parameters = parameters;
      this.extraUploadUrls = extraUploadUrls;
      this.extraUploadParams = extraUploadParams;
      this.runExampleSection = runExampleSection;
    }
  }


const From = () => {
    
    const SUPPORTED_MODELS = {
        'yolov8-testing': new SupportedModel(
          'yolov8-testing',
          UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
          UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
          'http://100.27.155.124:8888/download_yolo8_test_files',
          [
            new Parameter('confidenceThreshold', '', 'number'),
            new Parameter('iouThreshold', '', 'number'),
            new Parameter('resizeImageSize', '', 'number'),
          ]
        ),
        'yolov8-training': new SupportedModel(
          'yolov8-training',
          UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
          UploadFileService.UPLOAD_LABEL_FOR_OD_TRAINING,
          'http://100.27.155.124:8888/download_yolo8_model_files',
          [
            new Parameter('namesOfClasses', '', 'text'),
            new Parameter('yoloModel', '', 'text'),
            new Parameter('batch', '', 'number'),
            new Parameter('epochs', '', 'number'),
            new Parameter('patience', '', 'number'),
            new Parameter('learningRateLr0', '', 'text'),
            new Parameter('learningRateLrf', '', 'text'),
            new Parameter('resizeImageSize', '', 'number'),
          ]
        ),
        'yolov8-detecting': new SupportedModel(
          'yolov8-detecting',
          UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
          'xxx',
          'http://100.27.155.124:8888/download_yolo8_detect_files',
          [
            new Parameter('confidence_threshold', '', 'number'),
            new Parameter('iou_threshold', '', 'number'),
            new Parameter('resize_image_size', '', 'number'),
          ]
        ),
        'yolov3tiny-training': new SupportedModel(
          'yolov3tiny-training',
          UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
          UploadFileService.UPLOAD_LABEL_FOR_OD_TRAINING,
          'http://100.27.155.124:8888/download_yolo3_tiny_model_files',
          [
            new Parameter('names_of_classes', '', 'text'),
            new Parameter('learning_rate', '', 'text'),
            new Parameter('batch_size', '', 'number'),
            new Parameter('max_batches', '', 'number'),
            new Parameter('resize_image_size', '', 'number'),
          ]
        ),
        'yolov3tiny-testing': new SupportedModel(
          'yolov3tiny-testing',
          UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
          UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
          'http://100.27.155.124:8888/download_yolo3_tiny_test_files',
          []
        ),
        'qai-Hub-testing': new SupportedModel(
          'qai-Hub-testing',
          UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
          UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
          'http://100.27.155.124:8888/download_qai_hub_test_files',
          [
            new Parameter('confidence_threshold', '', 'number'),
            new Parameter('iou_threshold', '', 'number'),
            new Parameter('resize_image_size', '', 'number'),
            new Parameter('num_classes', '', 'number'),
            new Parameter('device_name', '', 'text'),
          ]
        ),
        'qai-Hub-detecting': new SupportedModel(
          'qai-Hub-detecting',
          UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
          'xxx',
          'http://100.27.155.124:8888/download_qai_hub_detect_files',
          [
            new Parameter('confidence_threshold', '', 'number'),
            new Parameter('iou_threshold', '', 'number'),
            new Parameter('resize_image_size', '', 'number'),
            new Parameter('device_name', '', 'text'),
          ]
        ),
        'lora-training': new SupportedModel(
          'lora-training',
          UploadFileService.UPLOAD_IMAGE_FOR_LORA_TRAINING,
          'xxx',
          'http://100.27.155.124:8888/download_lora_files',
          [
            new Parameter('id_prompt', '', 'text'),
            new Parameter('resolution', '', 'number'),
            new Parameter('max_train_steps', '', 'number'),
            new Parameter('checkpointing_steps', '', 'number'),
          ]
        ),
        'generate-image-with-no-lora': new SupportedModel(
          'generate-image-with-no-lora',
          'xxx',
          'xxx',
          'http://100.27.155.124:8888/download_generate_images_with_no_lora',
          [
            new Parameter('prompt', '', 'text'),
            new Parameter('resolution', '', 'number'),
            new Parameter('image_number_for_each_prompt', '', 'number'),
          ]
        ),
        'generate-image-with-existing-lora': new SupportedModel(
          'generate-image-with-existing-lora',
          'xxx',
          'xxx',
          'http://100.27.155.124:8888/download_generate_images_with_existing_lora',
          [
            new Parameter('prompt', '', 'text'),
            new Parameter('resolution', '', 'number'),
            new Parameter('image_number_for_each_prompt', '', 'number'),
            new Parameter('lora', '', 'text'),
          ]
        ),
        'generate-image-with-new-lora': new SupportedModel(
          'generate-image-with-new-lora',
          'xxx',
          'xxx',
          'http://100.27.155.124:8888/download_generate_images_with_new_lora',
          [
            new Parameter('id_prompt', '', 'text'),
            new Parameter('prompt', '', 'text'),
            new Parameter('resolution', '', 'number'),
            new Parameter('image_number_for_each_prompt', '', 'number'),
            new Parameter('train_steps', '', 'number'),
          ]
        ),
        'auto-label': new SupportedModel(
          'auto-label',
          UploadFileService.UPLOAD_IMAGE_FOR_AUTO_LABEL,
          'xxx',
          'http://100.27.155.124:8888/download_auto_label_data',
          [new Parameter('names_of_classes', '', 'text')]
        ),
        'auto-pipeline-a': new SupportedModel(
          'auto-pipeline-a',
          UploadFileService.UPLOAD_IMAGE_FOR_AUTO_PIPELINE,
          'xxx',
          'http://100.27.155.124:8888/download_auto_pipeline_files',
          [
            new Parameter('names_of_target_classes', '', 'text'),
            new Parameter('id_prompt', '', 'text'),
            new Parameter('resolution', '', 'number'),
            new Parameter('max_train_steps', '', 'number'),
            new Parameter('image_number_for_each_prompt', '', 'number'),
            new Parameter('YOLO_model', '', 'text'),
          ]
        ),
        'bbox-feature-visualiztion-for-different-datasets': new SupportedModel(
          'bbox-feature-visualiztion-for-different-datasets',
          '',
          '',
          'http://100.27.155.124:8888/download_bbox_feature_visualiztion_for_od_train_data_and_od_test_data',
          [],
          new Map([
            ['Run', 'http://100.27.155.124:8888/upload_dataset_for_bbox_feature_visualization'],
          ]),
          ['dataset_name'],
        ),
        'bbox-feature-visualiztion-for-od-train-data-and-od-test-data':
          new SupportedModel(
            'bbox-feature-visualiztion-for-od-train-data-and-od-test-data',
            '',
            '',
            'http://100.27.155.124:8888/download_bbox_feature_visualiztion_for_od_train_data_and_od_test_data',
            [],
            new Map([
              [
                'Upload Image: od model training',
                UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
              ],
              [
                'Upload Label: od model training',
                UploadFileService.UPLOAD_LABEL_FOR_OD_TRAINING,
              ],
              [
                'Upload Image: od model testing',
                UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
              ],
              [
                'Upload Label: od model testing',
                UploadFileService.UPLOAD_LABEL_FOR_OD_TESTING,
              ],
            ])
          ),
        'image-feature-visualiztion-for-different-datasets': new SupportedModel(
          'image-feature-visualiztion-for-different-datasets',
          '',
          '',
          'http://100.27.155.124:8888/download_images_feature_visualization_for_different_datasets',
          [],
          new Map([
            ['Run', 'http://100.27.155.124:8888/upload_dataset_for_image_feature_visualization'],
          ]),
          ['dataset_name'],
        ),
        'image-feature-visualiztion-for-od-train-data-and-od-test-data':
          new SupportedModel(
            'image-feature-visualiztion-for-od-train-data-and-od-test-data',
            '',
            '',
            'http://100.27.155.124:8888/download_image_feature_visualiztion_for_od_train_data_and_od_test_data',
            [],
            new Map([
              [
                'Upload Image: od model training',
                UploadFileService.UPLOAD_IMAGE_FOR_OD_TRAINING,
              ],
              [
                'Upload Image: od model testing',
                UploadFileService.UPLOAD_IMAGE_FOR_OD_TESTING,
              ],
            ])
          ),
        'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data':
          new SupportedModel(
            'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
            UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
            'xxx',
            'http://100.27.155.124:8888/download_bbox_feature_visualiztion_for_lora_train_data_and_ai_generated_data',
            [
              new Parameter('id_prompt', '', 'string'),
              new Parameter('prompt', '', 'string'),
              new Parameter('resolution', '', 'number'),
              new Parameter('image_number_for_each_prompt', '', 'number'),
              new Parameter('max_train_steps', '', 'number'),
              new Parameter('checkpointing_steps', '', 'number'),
              new Parameter('names_of_classes', '', 'string'),
            ]
          ),
        'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data':
          new SupportedModel(
            'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
            UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
            'xxx',
            'http://100.27.155.124:8888/download_image_feature_visualiztion_for_lora_train_data_and_ai_generated_data',
            [
              new Parameter('id_prompt', '', 'string'),
              new Parameter('prompt', '', 'string'),
              new Parameter('resolution', '', 'number'),
              new Parameter('image_number_for_each_prompt', '', 'number'),
              new Parameter('max_train_steps', '', 'number'),
              new Parameter('checkpointing_steps', '', 'number'),
            ]
          ),
        'feature-visualiztion-for-lora-train-data-and-ai-generated-data':
          new SupportedModel(
            'feature-visualiztion-for-lora-train-data-and-ai-generated-data',
            UploadFileService.UPLOAD_IMAGE_FOR_OD_DETECTING,
            'xxx',
            'http://100.27.155.124:8888/download_auto_labels_for_visualization',
            [
              new Parameter('id_prompt', '', 'string'),
              new Parameter('prompt', '', 'string'),
              new Parameter('resolution', '', 'number'),
              new Parameter('image_number_for_each_prompt', '', 'number'),
              new Parameter('max_train_steps', '', 'number'),
              new Parameter('checkpointing_steps', '', 'number'),
              new Parameter('names_of_classes', '', 'string'),
            ]
          ),
      };

    const supportedModels = [
        SUPPORTED_MODELS['yolov8-testing'],
        SUPPORTED_MODELS['yolov8-training'],
        SUPPORTED_MODELS['yolov8-detecting'],
        SUPPORTED_MODELS['yolov3tiny-training'],
        SUPPORTED_MODELS['yolov3tiny-testing'],
        SUPPORTED_MODELS['qai-Hub-testing'],
        SUPPORTED_MODELS['qai-Hub-detecting'],
        SUPPORTED_MODELS['lora-training'],
        SUPPORTED_MODELS['generate-image-with-no-lora'],
        SUPPORTED_MODELS[
          'generate-image-with-existing-lora'
        ],
        SUPPORTED_MODELS['generate-image-with-new-lora'],
        SUPPORTED_MODELS['auto-label'],
        SUPPORTED_MODELS['auto-pipeline-a'],
        SUPPORTED_MODELS[
          'bbox-feature-visualiztion-for-different-datasets'
        ],
        SUPPORTED_MODELS[
          'bbox-feature-visualiztion-for-od-train-data-and-od-test-data'
        ],
        SUPPORTED_MODELS[
          'image-feature-visualiztion-for-different-datasets'
        ],
        SUPPORTED_MODELS[
          'image-feature-visualiztion-for-od-train-data-and-od-test-data'
        ],
        SUPPORTED_MODELS[
          'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
        ],
        SUPPORTED_MODELS[
          'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
        ],
        SUPPORTED_MODELS[
          'feature-visualiztion-for-lora-train-data-and-ai-generated-data'
        ],
    ];
    
    const [selectedModel,setselectedModel] = useState(supportedModels[0]);
    const Params = useParams().model;
    const [parametersForm, setparametersForm] = useState([]);
    const [uploadfrom,setuploadfrom] = useState('');
    const [model,setmodel] = useState();
    const [isParametersValid,setisParametersValid] = useState(false);
    const [extraUploadUrls,setextraUploadUrls] = useState(new Map());
    const [extraUploadUrlKeys,setextraUploadUrlKeys] = useState([]);

    useEffect(()=>{
        setmodel(Params);
        const m =Params;
        for (let index = 0; index < supportedModels.length; index++) {
            const element = supportedModels[index];
            if (element.model === m) {
                setuploadfrom(model);
                setselectedModel(element);
                break;
            }
        }

        var isValid = true;
        for (let index = 0; index < selectedModel.parameters.length; index++) {
          isValid = isValid && selectedModel.parameters[index].defaultValue !== '';
        }
        console.log(selectedModel.model)
        
        setisParametersValid(isValid); 
        setextraUploadUrls(selectedModel.extraUploadUrls);
        setextraUploadUrlKeys(Array.from(
            selectedModel.extraUploadUrls.keys()
        ));
        
        

    },[model])

    const changeselecteModel = (e) => {
      const{name,value} = e.target;
      console.log(parametersForm);
      setparametersForm((prevUser) => ({
          ...prevUser,
          [name]: value,
      }));
      handleselecteModel(name,value)
      parameterCheck()
    };

    const handleselecteModel = (name,value) => {
      for(let i=0;i<selectedModel.parameters.length;i++){
        if(selectedModel.parameters[i].name === name){
          selectedModel.parameters[i].defaultValue = value
        }
      }
    }

    const parameterCheck = () => {
      for(let i=0;i<selectedModel.parameters.length;i++){
        if(selectedModel.parameters[i].defaultValue === ''){
          setisParametersValid(false);
          break;
        }
        setisParametersValid(true)
      }
    }

    const changesupportedModels = (e) => {
      const{value} = e.target;
      console.log(extraUploadUrlKeys)
      setmodel(value)
    }

    const runCb = () => {
      console.log(model)
      try{
        if (model === 'yolov8-testing') {
          yolo8Test(
            parametersForm.confidenceThreshold,
            parametersForm.iouThreshold,
            parametersForm.resizeImageSize
          );
        } else if (model === 'yolov8-training') {
          yolo8Train(
            parametersForm.namesOfClasses,
            parametersForm.yoloModel,
            parametersForm.batch,
            parametersForm.epochs,
            parametersForm.patience,
            parametersForm.learningRateLr0,
            parametersForm.learningRateLrf,
            parametersForm.resizeImageSize
          );
        } else if (model === 'yolov8-detecting') {
          yolo8Detecting(
            parametersForm.confidence_threshold,
            parametersForm.iou_threshold,
            parametersForm.resize_image_size
          );
        } else if (model === 'yolov3tiny-training') {
          yolov3Training(
            parametersForm.names_of_classes,
            parametersForm.learning_rate,
            parametersForm.batch_size,
            parametersForm.max_batches,
            parametersForm.resize_image_size
          );
        } else if (model === 'yolov3tiny-testing') {
          yolov3Testing();
        } else if (model === 'qai-Hub-testing') {
          qaiHubTesting(
            parametersForm.confidence_threshold,
            parametersForm.iou_threshold,
            parametersForm.resize_image_size,
            parametersForm.num_classes,
            parametersForm.device_name
          );
        } else if (model === 'qai-Hub-detecting') {
          qaiHubDetecting(
            parametersForm.confidence_threshold,
            parametersForm.iou_threshold,
            parametersForm.resize_image_size,
            parametersForm.device_name
          );
        } else if (model === 'lora-training') {
          loraTraining(
            parametersForm.id_prompt,
            parametersForm.resolution,
            parametersForm.max_train_steps,
            parametersForm.checkpointing_steps
          );
        } else if (model === 'generate-image-with-no-lora') {
          generateImageWithNoLora(
            parametersForm.prompt,
            parametersForm.resolution,
            parametersForm.image_number_for_each_prompt
          );
        } else if (model === 'generate-image-with-existing-lora') {
          generateImageWithExistingLora(
            parametersForm.prompt,
            parametersForm.resolution,
            parametersForm.image_number_for_each_prompt,
            parametersForm.lora
          );
        } else if (model === 'generate-image-with-new-lora') {
          generateImageWithNewLora(
            parametersForm.id_prompt,
            parametersForm.prompt,
            parametersForm.resolution,
            parametersForm.image_number_for_each_prompt,
            parametersForm.train_steps
          );
        } else if (model === 'auto-label') {
          autoLabel(parametersForm.names_of_classes);
        } else if (model === 'auto-pipeline-a') {
          autoPipelinea(
            parametersForm.names_of_target_classes,
            parametersForm.id_prompt,
            parametersForm.resolution,
            parametersForm.max_train_steps,
            parametersForm.image_number_for_each_prompt,
            parametersForm.YOLO_model
          );
        } else if (
          model ===
          'bbox-feature-visualiztion-for-different-datasets'
        ) {
          bboxFeatureVistualizationOfdifferentData();
        } else if (
          model ===
          'bbox-feature-visualiztion-for-od-train-data-and-od-test-data'
        ) {
          bboxFeatureVistualizationOfOdData();
        } else if (
          model ===
          'image-feature-visualiztion-for-different-datasets'
        ) {
          imageFeatureVistualizationOfdifferentData();
        } else if (
          model ===
          'image-feature-visualiztion-for-od-train-data-and-od-test-data'
        ) {
          imageFeatureVistualizationOfOdData();
        } else if (
          model ===
          'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
        ) {
          bboxFeatureVisualiztionForLoraTrain(
            parametersForm.id_prompt,
            parametersForm.prompt,
            parametersForm.resolution,
            parametersForm.image_number_for_each_prompt,
            parametersForm.max_train_steps,
            parametersForm.checkpointing_steps,
            parametersForm.names_of_classes
          );
        } else if (
          model ===
          'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data'
        ) {
          imageFeatureVisualiztionForLoraTrain(
            parametersForm.id_prompt,
            parametersForm.prompt,
            parametersForm.resolution,
            parametersForm.image_number_for_each_prompt,
            parametersForm.max_train_steps,
            parametersForm.checkpointing_steps
          );
        } else if (
          model ===
          'feature-visualiztion-for-lora-train-data-and-ai-generated-data'
        ) {
          FeatureVisualiztionForLoraTrain(
            parametersForm.id_prompt,
            parametersForm.prompt,
            parametersForm.resolution,
            parametersForm.image_number_for_each_prompt,
            parametersForm.max_train_steps,
            parametersForm.checkpointing_steps,
            parametersForm.names_of_classes
          );
        } else {
          console.error('fk the world');
        }
      }
      catch (error) {
        console.error("An error occurred in runCb: ", error);
      };
      
    }
    
  
    const clearImage = () => {
      clear_Image();
    }
    const downloadModel = (download_url) => {
      download_result(download_url);
    }

    

    let html1 = supportedModels.map((list) => 
        <option
            value={list.model}
        >
            {list.model}
        </option>
    )
    let html2 = extraUploadUrlKeys.map((list) => 
      <div class="col-12" >
        <div class="container-fluid card border-light shadow-sm p-0 mb-5">
            <div class="row">
              <div class="col-12 m-3">
                  <h4 class="form-label">{list}</h4>
              </div>
              <div class="col-12 px-4 pb-4">
                  <UploadFile
                  title="##"
                  url={extraUploadUrls.get(list)}
                  extraParameters={selectedModel.extraUploadParams}
                  ></UploadFile>
              </div>
            </div>
        </div>
      </div>
    )

    let html3 = selectedModel.parameters.map((list) =>
      <div class="col-12" >
          <div class="input-group">
          <span class="input-group-text" id="inputGroup-sizing-default">{list.name}</span>
          <input
              name={list.name}
              type={list.type}
              class="form-control"
              aria-describedby="inputGroup-sizing-default"
              value={list.defaultValue}
              onChange={(e) => changeselecteModel(e)}
              required
          />
          </div>
      </div>
    )
    
    function yolo8Test(
        confidenceThreshold,
        iouThreshold,
        resizeImageSize
    ){
      const data = JSON.stringify({
        confidence_threshold: confidenceThreshold,
        iou_threshold: iouThreshold,
        resize_image_size: resizeImageSize,
      });
      axios.post(ModelExamplesService.YOLO8_TEST,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    console.log(response)
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function yolo8Train(
      namesOfClasses,
      yoloModel,
      batch,
      epochs,
      patience,
      learningRateLr0,
      learningRateLrf,
      resizeImageSize
    ) {
      const data = JSON.stringify({
        names_of_classes: namesOfClasses,
        YOLO_model: yoloModel,
        batch: batch,
        epochs: epochs,
        patience: patience,
        learning_rate_lr0: learningRateLr0,
        learning_rate_lrf: learningRateLrf,
        resize_image_size: resizeImageSize,
      });
      axios.post(ModelExamplesService.YOLO8_TRAIN,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function yolo8Detecting(
      confidence_threshold,
      iou_threshold,
      resize_image_size,
    ) {
      const data = JSON.stringify({
        confidence_threshold: confidence_threshold,
        iou_threshold: iou_threshold,
        resize_image_size: resize_image_size,
      });
      axios.post(ModelExamplesService.YOLO8_DETECT,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function yolov3Training(
      namesOfClasses,
      learningRate,
      batchSize,
      maxBatches,
      resizeImageSize,
    ) {
      const data = JSON.stringify({
        names_of_classes: namesOfClasses,
        learning_rate: learningRate,
        batch_size: batchSize,
        max_batches: maxBatches,
        resize_image_size: resizeImageSize,
      });
      console.log(data);
      axios.post(ModelExamplesService.YOLO3_TRAIN,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function yolov3Testing() {
      const data = JSON.stringify({
      });
      axios.post(ModelExamplesService.YOLO3_TEST,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function qaiHubTesting(
      confidenceThreshold,
      iouThreshold,
      resizeImageSize,
      numClasses,
      deviceName,
    ) {
      const data = JSON.stringify({
        confidence_threshold: confidenceThreshold,
        iou_threshold: iouThreshold,
        resize_image_size: resizeImageSize,
        num_classes: numClasses,
        device_name: deviceName,
      });
      console.log(data);
      axios.post(ModelExamplesService.QAI_HUB_TEST,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function qaiHubDetecting(
      confidenceThreshold,
      iouThreshold,
      resizeImageSize,
      deviceName,
    ) {
      const data = JSON.stringify({
        confidence_threshold: confidenceThreshold,
        iou_threshold: iouThreshold,
        resize_image_size: resizeImageSize,
        device_name: deviceName,
      });
      console.log(data);
      axios.post(ModelExamplesService.QAI_HUB_DETECT,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function loraTraining(
      idPrompt,
      resolution, // 改為小寫以保持一致
      maxTrainSteps,
      checkpointingSteps
    ) {
      const data = JSON.stringify({
        id_prompt: idPrompt,
        resolution: resolution, // 使用小寫
        max_train_steps: maxTrainSteps,
        checkpointing_steps: checkpointingSteps,
      });
      console.log(idPrompt);
      console.log(data);
      axios
        .post(ModelExamplesService.LORA_TRAIN, data, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
        })
        .then((response) => {
          try {
            alert('task complete');
          } catch (error) {
            console.error('An error occurred in alert: ', error);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log('server responded');
          } else if (error.request) {
            console.log('network error');
          } else {
            console.log(error);
          }
        });
    }

    function generateImageWithNoLora(
      prompt,
      resolution,
      image_number_for_each_prompt,
    ) {
      const data = JSON.stringify({
        prompt: prompt,
        resolution: resolution,
        image_number_for_each_prompt: image_number_for_each_prompt
      });
      console.log(data);
      axios.post(ModelExamplesService.GENERATE_IMAGES_WITH_NO_LORA,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function generateImageWithExistingLora(
      prompt,
      resolution,
      image_number_for_each_prompt,
      lora,
    ) {
      const data = JSON.stringify({
        prompt: prompt,
        resolution: resolution,
        image_number_for_each_prompt: image_number_for_each_prompt,
        lora: lora,
      });
      console.log(data);
      axios.post(ModelExamplesService.GENERATE_IMAGES_WITH_EXIST_LORA,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function generateImageWithNewLora(
      id_prompt,
      prompt,
      resolution,
      image_number_for_each_prompt,
      train_steps,
    ) {
      const data = JSON.stringify({
        id_prompt: id_prompt,
        prompt: prompt,
        resolution: resolution,
        image_number_for_each_prompt: image_number_for_each_prompt,
        train_steps: train_steps,
      });
      console.log(data);
      axios.post(ModelExamplesService.GENERATE_IMAGES_WITH_NEW_LORA,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function autoLabel(
      names_of_classes
    ) {
      const data = JSON.stringify({
        names_of_classes: names_of_classes,
      });
      console.log(data);
      axios.post(ModelExamplesService.AUTO_LABEL,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function autoPipelinea(
      names_of_target_classes,
      id_prompt,
      resolution,
      max_train_steps,
      image_number_for_each_prompt,
      YOLO_model,
    ) {
      const data = JSON.stringify({
        names_of_target_classes: names_of_target_classes,
        id_prompt: id_prompt,
        resolution: resolution,
        max_train_steps: max_train_steps,
        image_number_for_each_prompt: image_number_for_each_prompt,
        YOLO_model: YOLO_model,
      });
      console.log(data);
      axios.post(ModelExamplesService.AUTO_PIPELINE_A,data,{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }
    function bboxFeatureVistualizationOfdifferentData(
    ) {
      axios.post(ModelExamplesService.BBOX_FEATURE_VISUALIZATION_FOR_DIFFERENT_DATASET,{},{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function bboxFeatureVistualizationOfOdData(
    ) {
      axios.post(ModelExamplesService.BBOX_FEATURE_VISUALIZATION_FOR_OD_DATA,{},{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function imageFeatureVistualizationOfdifferentData(
    ) {
      axios.post(ModelExamplesService.IMAGE_FEATURE_VISUALIZATION_FOR_DIFFERENT_DATASET,{},{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    function imageFeatureVistualizationOfOdData(
    ) {
      axios.post(ModelExamplesService.IMAGE_FEATURE_VISUALIZATION_FOR_OD_DATA,{},{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        })
        .then(
            (response) => {
                try{
                    alert('task complete');
                }
                catch{
                    
                }
            }
        )
        .catch((error) => {
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
            } else if (error.request) {
              console.log("network error");
            } else {
              console.log(error);
            }
        });
    }

    async function  bboxFeatureVisualiztionForLoraTrain(
      id_prompt,
      prompt,
      resolution,
      image_number_for_each_prompt,
      max_train_steps,
      checkpointing_steps,
      names_of_classes,
    ) {
      try {
        const response = await axios.post(ModelExamplesService.CLEAR_NEW_LORA_GENERATE_IMAGE,{},{
            headers: {
              'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json',
            },
            responseType: 'text',
            reportProgress: true,
            observe: 'events',
        }).toPromise();
    
        if (response && response.ok) {
          console.warn(response);
          this.statusObserver.next(true);
        } else {
          console.error(response);
          this.statusObserver.next(false);
        }
      } catch (error) {
        console.error('HTTP request failed:', error);
        this.statusObserver.next(false);
      }


      var train_steps = Number(checkpointing_steps);
      while (train_steps <= max_train_steps){
        const data = JSON.stringify({
          id_prompt: id_prompt,
          prompt: prompt,
          resolution: resolution,
          image_number_for_each_prompt: image_number_for_each_prompt,
          train_steps: train_steps,
        });
        try {
          const response = await axios.post(ModelExamplesService.GENERATE_IMAGES_WITH_NEW_LORA,data,{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
          }).toPromise();
      
          if (response && response.ok) {
            console.warn(response);
            this.statusObserver.next(true);
          } else {
            console.error(response);
            this.statusObserver.next(false);
          }
        } catch (error) {
          console.error('HTTP request failed:', error);
          this.statusObserver.next(false);
        }
        train_steps = train_steps + Number(checkpointing_steps);
      }
      const data = JSON.stringify({
        names_of_classes: names_of_classes,
      });
      try {
        const response = await axios.post(ModelExamplesService.BBOX_FEATURE_VISUALIZATION_FOR_LORA_TRAIN,data,{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
          }).toPromise();
    
        if (response && response.ok) {
          console.warn(response);
          this.statusObserver.next(true);
          alert('task complete');
        } else {
          console.error(response);
          this.statusObserver.next(false);
        }
      } catch (error) {
        console.error('HTTP request failed:', error);
        this.statusObserver.next(false);
      }
    }

    async function  imageFeatureVisualiztionForLoraTrain(
      id_prompt,
      prompt,
      resolution,
      image_number_for_each_prompt,
      max_train_steps,
      checkpointing_steps,
    ) {
      try {
        const response = await axios.post(ModelExamplesService.CLEAR_NEW_LORA_GENERATE_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      }).toPromise();
    
        if (response && response.ok) {
          console.warn(response);
          this.statusObserver.next(true);
        } else {
          console.error(response);
          this.statusObserver.next(false);
        }
      } catch (error) {
        console.error('HTTP request failed:', error);
        this.statusObserver.next(false);
      }

      var train_steps = Number(checkpointing_steps);
      while (train_steps <= max_train_steps){
        const data = JSON.stringify({
          id_prompt: id_prompt,
          prompt: prompt,
          resolution: resolution,
          image_number_for_each_prompt: image_number_for_each_prompt,
          train_steps: train_steps,
        });
        try {
          const response = await axios.post(ModelExamplesService.GENERATE_IMAGES_WITH_NEW_LORA,data,{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
          }).toPromise();
      
          if (response && response.ok) {
            console.warn(response);
            this.statusObserver.next(true);
          } else {
            console.error(response);
            this.statusObserver.next(false);
          }
        } catch (error) {
          console.error('HTTP request failed:', error);
          this.statusObserver.next(false);
        }
        train_steps = train_steps + Number(checkpointing_steps);
      }
      try {
        const response = await axios.post(ModelExamplesService.IMAGE_FEATURE_VISUALIZATION_FOR_LORA_TRAIN,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      }).toPromise();
    
        if (response && response.ok) {
          console.warn(response);
          this.statusObserver.next(true);
          alert('task complete');
        } else {
          console.error(response);
          this.statusObserver.next(false);
        }
      } catch (error) {
        console.error('HTTP request failed:', error);
        this.statusObserver.next(false);
      }
    }

    async function  FeatureVisualiztionForLoraTrain(
      id_prompt,
      prompt,
      resolution,
      image_number_for_each_prompt,
      max_train_steps,
      checkpointing_steps,
      names_of_classes,
    ) {
      try {
        const response = await axios.post(ModelExamplesService.CLEAR_NEW_LORA_GENERATE_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      }).toPromise();
    
        if (response && response.ok) {
          console.warn(response);
          this.statusObserver.next(true);
        } else {
          console.error(response);
          this.statusObserver.next(false);
        }
      } catch (error) {
        console.error('HTTP request failed:', error);
        this.statusObserver.next(false);
      }
      var train_steps = Number(checkpointing_steps);

      while (train_steps <= max_train_steps){
        const data = JSON.stringify({
          id_prompt: id_prompt,
          prompt: prompt,
          resolution: resolution,
          image_number_for_each_prompt: image_number_for_each_prompt,
          train_steps: train_steps,
        });
        try {
          const response = await axios.post(ModelExamplesService.GENERATE_IMAGES_WITH_NEW_LORA,data,{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
          }).toPromise();
      
          if (response && response.ok) {
            console.warn(response);
            this.statusObserver.next(true);
          } else {
            console.error(response);
            this.statusObserver.next(false);
          }
        } catch (error) {
          console.error('HTTP request failed:', error);
          this.statusObserver.next(false);
        }
        train_steps = train_steps + Number(checkpointing_steps);
      }

      const data = JSON.stringify({
        names_of_classes: names_of_classes,
      });
      try {
        const response = await axios.post(ModelExamplesService.IMAGE_FEATURE_VISUALIZATION_FOR_LORA_TRAIN,{},{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
          }).toPromise();
    
        if (response && response.ok) {
          console.warn(response);
          this.statusObserver.next(true);
        } else {
          console.error(response);
          this.statusObserver.next(false);
        }

        const response_bbox = await axios.post(ModelExamplesService.BBOX_FEATURE_VISUALIZATION_FOR_LORA_TRAIN,data,{
              headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
          }).toPromise();
    
        if (response_bbox && response_bbox.ok) {
          console.warn(response_bbox);
          this.statusObserver.next(true);
          alert('task complete');
        } else {
          console.error(response_bbox);
          this.statusObserver.next(false);
        }
      } catch (error) {
        console.error('HTTP request failed:', error);
        this.statusObserver.next(false);
      }
    }

    function clear_Image() {
      axios.post(ModelExamplesService.CLEAR_TRAIN_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });

        
      axios.post(ModelExamplesService.CLEAR_TEST_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });

      axios.post(ModelExamplesService.CLEAR_DETECT_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });

      axios.post(ModelExamplesService.CLEAR_AUTO_PIPELINE_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });

      axios.post(ModelExamplesService.CLEAR_BBOX_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });
      
      axios.post(ModelExamplesService.CLEAR_IMAGE_FEATURE_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });

      axios.post(ModelExamplesService.CLEAR_NEW_LORA_GENERATE_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });

      axios.post(ModelExamplesService.CLEAR_LORA_TRAIN_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });
      axios.post(ModelExamplesService.CLEAR_AUTO_LABEL_IMAGE,{},{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
          },
          responseType: 'text',
          reportProgress: true,
          observe: 'events',
      })
      .then(
          (response) => {
          }
      )
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });
    }

    function download_result(url) {
      axios.get(url, { responseType: 'blob' })
      .then
      .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("server responded");
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
      });
      
      }

    return(
        <Fragment>
          <div class="m-4">
          <div class="container-fluid card border-light shadow-sm mb-5">
                <form class="was-validated" >
                    <div class="mb-3">
                    <div class="col-12 my-3">
                        <h4 class="form-label">Select model</h4>
                    </div>
                    <select
                        class="form-select"
                        id="validationSelect"
                        aria-label="Default select example"
                        defaultValue={`${Params}`}
                        onChange={(e) => changesupportedModels(e)}
                        required
                    >
                        {html1}
                    </select>
                    <div class="invalid-feedback">
                        Please enter a message in the textarea.
                    </div>
                    </div>
                </form>
                </div>

                {(selectedModel.uploadImgUrl !== '') ? 
                  <div class="container-fluid card border-light shadow-sm p-0 mb-5">
                      <div class="row">
                      <div class="col-12 m-3">
                          <h4 class="form-label">Upload images</h4>
                      </div>
                      <div class="col-12 px-4 pb-4">
                          <UploadFile
                          title="##"
                          accept="image/*"
                          url={selectedModel.uploadImgUrl}
                          ></UploadFile>
                      </div>
                      </div>
                  </div>
                :<></>}
                
                {(selectedModel.uploadImgUrl !== '') ?
                  <div class="container-fluid card border-light shadow-sm p-0 mb-5">
                      <div class="row">
                      <div class="col-12 m-3">
                          <h4 class="form-label">Upload labels</h4>
                      </div>
                      <div class="col-12 px-4 pb-4">
                          <UploadFile
                          title="##"
                          url={selectedModel.uploadImgUrl}
                          ></UploadFile>
                      </div>
                      </div>
                  </div>
                :<></>}

                {html2}

                {selectedModel.runExampleSection ?
                <div class="container-fluid card border-light shadow-sm mb-5">
                  <div class="col-12 my-3">
                  <h4 class="form-label">Run Example</h4>
                  </div>
                  <form
                  class="row g-3 was-validated justify-content-end"
                  onChange={parameterCheck}
                  >
                  {html3}
                  <div class="col-12 col-md-2 col-xl-1">
                      <div class="d-grid">
                      <button
                          class="btn btn-primary"
                          type='button'
                          disabled={!isParametersValid}
                          onClick={runCb}
                      >
                          Run
                      </button>
                      </div>
                  </div>
                  </form>
              </div>
                :<></>}
              
                <div class="container-fluid card border-light shadow-sm mb-5">
                <div class="row">
                    <div class="col-12 my-3">
                    <h4 class="form-label">Download Link</h4>
                    </div>
                    <div class="col-12">
                    <a
                        class="btn btn-primary"
                        href={selectedModel.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download
                    </a>
                    </div>
                </div>
                </div>

                <div class="container-fluid card border-light shadow-sm mb-5">
                <div class="row">
                    <div class="col-12 my-3">
                    <h4 class="form-label">clear all image</h4>
                    </div>
                    <div class="col-12">
                    <div class="d-grid">
                        <button type='button' class="btn btn-danger"  onClick={clearImage}>
                        Clear Image
                        </button>
                    </div>
                    </div>
                </div>
                </div>

                <div class="container-fluid card border-light shadow-sm mb-5">
                <div class="row">
                    <div class="col-12 my-3">
                    <h4 class="form-label">Clean All</h4>
                    </div>
                    <div class="col-12">
                    <div class="d-grid">
                        <button type='button' class="btn btn-danger"  onClick={runCb}  disabled>Clean</button>
                    </div>
                    </div>
                </div>
              </div>
          </div>
        </Fragment>    
    );
}

export default From;

