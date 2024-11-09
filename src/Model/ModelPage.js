import './ModelPage.css';

import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const ModelPage = () => {
    const examples =[
        {
          title: 'Yolo V8 Testing',
          description:
            'This is yolo8 testing example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'modeltest',
          form_type: 'default',
        },
        {
          title: 'Yolo V8 Training',
          description:
            'This is yolo8 training example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'modeltrain',
          form_type: 'default',
        },
        {
          title: 'Yolo V8 Detecting',
          description:
            'This is yolo8 dectecting example for private usage. ' +
            'Click and follow the instruction to run the example.' +
            'abc',
          model: 'modeldetect',
          form_type: 'default',
        }
    ];

    let html = examples.map((list) => 
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
                        <Link class="btn custom-btn" to={`/model/${list.model}`}>Start</Link>
                    </div>
                </div>
            </div>
        </div>
    )


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

export default ModelPage;

