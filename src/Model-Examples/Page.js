import './Page.css';

import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

const Page = () => {
    const [role,setrole] = useState(false)
    const [lists,setlists] = useState([])
    const examples =[
        {
          title: 'Yolo V8 Testing',
          description:
            'This is yolo8 testing example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'yolov8-testing',
          form_type: 'default',
        },
        {
          title: 'Yolo V8 Training',
          description:
            'This is yolo8 training example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'yolov8-training',
          form_type: 'default',
        },
        {
          title: 'Yolo V8 Detecting',
          description:
            'This is yolo8 dectecting example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'yolov8-detecting',
          form_type: 'default',
        },
        {
          title: 'Yolo3 Tiny Training',
          description:
            'This is yolo3 tiny training example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'yolov3tiny-training',
          form_type: 'default',
        },
        {
          title: 'Yolo3 Tiny Testing',
          description:
            'This is yolo3 tiny testing example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'yolov3tiny-testing',
          form_type: 'default',
        },
        {
          title: 'Qai-Hub Testing',
          description:
            'This is  Qai-Hub Testing example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'qai-Hub-testing',
          form_type: 'default',
        },
        {
          title: 'Qai-Hub Detecting',
          description:
            'This is Qai-Hub Detecting example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'qai-Hub-detecting',
          form_type: 'default',
        },
        {
          title: 'lora-training',
          description:
            'This is lora-training example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'lora-training',
          form_type: 'default',
        },
        {
          title: 'generate-image-with-no-lora',
          description:
            'This is generate-image-with-no-lora example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'generate-image-with-no-lora',
          form_type: 'default',
        },
        {
          title: 'generate-image-with-existing-lora',
          description:
            'This is generate-image-with-existing-lora example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'generate-image-with-existing-lora',
          form_type: 'default',
        },
        {
          title: 'generate-image-with-new-lora',
          description:
            'This is generate-image-with-new-lora example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'generate-image-with-new-lora',
          form_type: 'default',
        },
        {
          title: 'auto-label',
          description:
            'This is auto-label example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'auto-label',
          form_type: 'default',
        },
        {
          title: 'auto-pipeline-a',
          description:
            'This is auto-pipeline-a example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'auto-pipeline-a',
          form_type: 'default',
        },
        {
          title: 'bbox feature visualiztion for different datasets',
          description:
            'This is bbox feature visualiztion for different datasets example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'bbox-feature-visualiztion-for-different-datasets',
          form_type: 'default',
        },
        {
          title: 'bbox feature visualiztion for od train data and od test data',
          description:
            'This is bbox feature visualiztion for od train data and od test data example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'bbox-feature-visualiztion-for-od-train-data-and-od-test-data',
          form_type: 'default',
        },
        {
          title: 'image feature visualiztion for different datasets',
          description:
            'This is image feature visualiztion for different datasets example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'image-feature-visualiztion-for-different-datasets',
          form_type: 'default',
        },
        {
          title: 'image feature visualiztion for od train data and od test data',
          description:
            'This is image feature visualiztion for od train data and od test data example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'image-feature-visualiztion-for-od-train-data-and-od-test-data',
          form_type: 'default',
        },
        {
          title:
            'bbox feature visualiztion for lora train data and ai generated data',
          description:
            'This is bbox feature visualiztion for lora train data and ai generated data example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model:
            'bbox-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
          form_type: 'default',
        },
        {
          title:
            'image feature visualiztion for lora train data and ai generated data',
          description:
            'This is image feature visualiztion for lora train data and ai generated data example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model:
            'image-feature-visualiztion-for-lora-train-data-and-ai-generated-data',
          form_type: 'default',
        },
        {
          title: 'feature visualiztion for lora train data and ai generated data',
          description:
            'This is feature visualiztion for lora train data and ai generated_data example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'feature-visualiztion-for-lora-train-data-and-ai-generated-data',
          form_type: 'default',
        },
    ];
    const filterExamplesBasedOnRole = () => {
        // 如果 role 為 "internal_user"，直接允許所有功能
        if (role.includes('internal_user')) {
          setlists(examples)
          return;
        }
        else{
          // 根據其他 role 的邏輯來篩選功能
          let a =examples.filter((example) => {
            if (role.includes('generateimage') && 
                ['lora-training', 'generate-image-with-no-lora', 'generate-image-with-existing-lora', 'generate-image-with-new-lora'].includes(example.model)) {
              return true;
            }
            if (role.includes('autolabel') && example.model === 'auto-label') {
              return true;
            }
            if (role.includes('modeltrain') && 
                ['yolov8-testing', 'yolov8-training', 'yolov8-detecting', 'yolov3tiny-training', 'yolov3tiny-testing', 'qai-Hub-testing', 'qai-Hub-detecting'].includes(example.model)) {
              return true;
            }
            return false;
          });
          console.log(a)
          setlists(a)
        }
        
    }

    let html = lists.map((list) => 
        <div class="col" >
            <div class="card border-light shadow-sm">
                <img
                src={require('../Image/luke-chesser-eICUFSeirc0-unsplash.jpg')}
                class="card-img-top"
                alt="..."
                />
                <div class="card-body">
                <h5 class="card-title">{list.title}</h5>
                <p class="card-text">
                    {list.description}
                </p>
                    <div class="d-grid gap-2 col-4 ms-auto">
                        <Link class="btn custom-btn" to={`/model-examples/${list.model}`}>Start</Link>
                    </div>
                </div>
            </div>
        </div>
    )

    useEffect(()=>{
        setrole(localStorage.getItem('role'))
        if (role) {
            console.log('Role:', role);
            filterExamplesBasedOnRole();
        } else {
        console.error('No role information found in localStorage.');
        }
    },[role])

    return(
        <Fragment>
          <div class="m-4">
            <div class="container-fluid">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4">
                    {html}
                </div>
            </div>
          </div>
        </Fragment>    
    );
}

export default Page;

