import './Reference.css';

import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Link,
  useParams,
} from 'react-router-dom';

class Pagelist {
    name = '';
    value = [];
    statue = false;
  
    constructor(name,value, statue) {
      this.name = name;
      this.value = value;
      this.statue = statue;
    }
}

class Newtype1 {
    example = '';
    key = '';
    type = '';
    description=''
  
    constructor(example,key, type,description) {
      this.example = example;
      this.key = key;
      this.type = type;
      this.description = description;
    }
}
  
class Content {
    description = '';
    api = '';
    method = '';
    request = {};
    response={}
  
    constructor(
        description,
        api,
        method,
        request,
        response
    ) {
      this.description =description;
      this.api = api;
      this.method = method;
      this.request = request;
      this.response = response;
    }
  }


const Reference = () => {
    
    const [isDropDownMenu, setisDropDownMenu] = useState(true);
    const [isMouseEnter, setisMouseEnter] = useState(false);
    const handleMouseEnterLeave = () => {
        console.log(isMouseClick)
        if(!isMouseClick){
            setisMouseEnter(!isMouseEnter)
        }
    }

    var accept = '*';
    const [isMouseClick, setisMouseClick] = useState(true);
    const handleMouseClick = () => {setisMouseClick(!isMouseClick)}
    const [isCloseBtn, setisCloseBtn] = useState(false);
    const handleCloseBtn = () => {setisCloseBtn(!isCloseBtn)}

    const [pagelist, setpagelist] = useState([
        new Pagelist(
            'auth',
            ['signup','signin','listuser','modifyuser','deleteuser'],
            true
        ),
        new Pagelist(
            'project',
            ['createproject','deleteproject','getsingleproject','listproject','listallproject'],
            false
        ),
        new Pagelist(
            'image',
            ['deleteimage','uploadimage','feedbackinformation'],
            false
        ),
        new Pagelist(
            'requierment',
            ['uploadrequirement','getrequirement'],
            false
        ),
        new Pagelist(
            'model',
            ['deletemodel','downloadmodel','uploadmodel'],
            false
        ),
        new Pagelist(
            'sdprocess',
            ['txt2img','getsdimange','listsdmodel','modifysdmodel'],
            false
        ),
        new Pagelist(
            'ec2context',
            ['deployec2','startec2','stopec2','deleteec2'],
            false
        )
    ]);

    const domain='http://bev2loadbalancer-61644974.us-east-1.elb.amazonaws.com'
    const apicontent ={
        auth:{
            signup:new Content(
                'This api is responsible for signing up a user account',
                '/api/v2/auth/signup',
                'POST',
                {
                    firstname:new Newtype1('derek','firstname','string','firstname'),
                    lastname:new Newtype1('waaa','lastname','string','lastname'),
                    email:new Newtype1('1234@gmail.com','email','string','email'),
                    password:new Newtype1('0000','password','string','password'),
                    password_check:new Newtype1('0000','password_check','string','Password check, should be equal to password'),
                    role:new Newtype1('normal_user','role','string','user role')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('signup completed','err_msg','string','Error message, only used when err = 1')
                }
            ),
            signin:new Content(
                'This api is responsible for signing in a user account',
                '/api/v2/auth/signin',
                'POST',
                {
                    email:new Newtype1('1234@gmail.com','email','string','email'),
                    password:new Newtype1('0000','password','string','password')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('signin success','err_msg','string','Error message, only used when err = 1'),
                    role:new Newtype1('normal_user','role','string','user role'),
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsInJvbGUiOiJub3JtYWxfdXNlciIsImV4cCI6MTcyMTk4ODY1Mn0.4FXCoVhWcniXNKu7evJziXhP0nBGQuJSttbYAgO9n1s',
                        'token','string','Token, only used when err = 0, the user needs to use this token for BE service access'
                    ),
                    user_id:new Newtype1('115','user_id','int','return the registered user’s id')
                }
            ),
            listuser:new Content(
                'This api is responsible for listing all user’s information',
                '/api/v2/auth/listuser',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg2NjA3M30.2kBzXKQshCT51E0XeNOIXhdumN6-O94NjK9-_ZO-O2c',
                        'token','string','Token, only used when err = 0, the user needs to use this token for BE service access'
                    ),
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('success','err_msg','string','Error message, only used when err = 1'),
                    user_list:new Newtype1(
                        [
                            {
                                "createtime": "2024-02-02 01:49:32.452",
                                "email": "111@gmail.com",
                                "firstname": "derek",
                                "id": 2,
                                "lastname": "wan",
                                "password": "0000",
                                "role": "normal_user"
                            },
                            {
                                "createtime": "2024-02-05 12:15:37.602",
                                "email": "ug61837361636@gmail.com",
                                "firstname": "derek",
                                "id": 3,
                                "lastname": "wan",
                                "password": "0000",
                                "role": "normal_user"
                            }
                        ],
                        'user_list','array json','return the user’s information'
                    )
                }
            ),
            modifyuser:new Content(
                'This api is responsible for modifying user’s information',
                '/api/v2/auth/modifyuser',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg2NjA3M30.2kBzXKQshCT51E0XeNOIXhdumN6-O94NjK9-_ZO-O2c',
                        'token','string','Access token'
                    ),
                    role:new Newtype1('normal_user','role','string','user role'),
                    firstname:new Newtype1('Derek','firstname','string','firstname'),
                    lastname:new Newtype1('Wan','lastname','string','lastname'),
                    email:new Newtype1('1234@gmail.com','email','string','email'),
                    password:new Newtype1('0000','password','string','password'),
                    userid:new Newtype1('115','userid','int','user id')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('update user’s information success','err_msg','string','Error message, only used when err = 1')
                }
            ),
            deleteuser:new Content(
                'This api is responsible for deleting the user’s account',
                '/api/v2/auth/deleteuser',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg2NjA3M30.2kBzXKQshCT51E0XeNOIXhdumN6-O94NjK9-_ZO-O2c',
                        'token','string','Access token'
                    ),
                    userid:new Newtype1('131','userid','int','user id')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('success','err_msg','string','Error message, only used when err = 1')
                }
            )
        },
        project:{
            createproject:new Content(
                'This api is responsible for creating the project',
                '/api/v2/project/create',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDI5NTI3N30.FYMSFzfEhc5d7oG6q6OkoSWn-wUsm5dSilN0ocrNb8A',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','userid'),
                    projectname:new Newtype1(
                        'testing project','projectname','string',
                        'Project name, this doesn’t need to be unique, each project will be assigned a unique project_id'),
                    projectDescription:new Newtype1('this is project description2','projectDescription','string','Project’s Description'),
                    type:new Newtype1('AI Model training','type','string','AI Model training or Image generation two types')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('project create success','err_msg','string','Error message, only used when err = 1')
                }
            ),
            deleteproject:new Content(
                'This api is responsible for deleting the project',
                '/api/v2/project/delete',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDI5NTI3N30.FYMSFzfEhc5d7oG6q6OkoSWn-wUsm5dSilN0ocrNb8A',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','userid'),
                    projectname:new Newtype1('testing project','projectname','string','Project name')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('project deletion success','err_msg','string','Error message, only used when err = 1')
                }
            ),
            getsingleproject:new Content(
                'This api is responsible for deleting the project',
                '/api/v2/project/delete',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg1ODc2OX0.ppi12a4Q1RenUL_aSXeY8GKAbjXskhRqKy1iCNPq3f4',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','userid'),
                    projectname:new Newtype1('testing_project2','projectname','string','Project name')
                },
                {
                    CreateTime:new Newtype1('2024-07-13 06:20:45.875','CreateTime','string','“2024-07-13 06:20:45.875” time format'),
                    Type:new Newtype1('AI Model training','Type','string','AI Model training or Image generation two types'),
                    email:new Newtype1('1234@gmail.com','email','string','email'),
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('success','err_msg','string','Error message, only used when err = 1'),
                    id:new Newtype1('624','id','int','Project id'),
                    img_generation_remaining_count:new Newtype1('4','img_generation_remaining_count','int','Image generation remaining count, the count will decrease when using txt2img'),
                    img_quantity:new Newtype1('1','img_quantity','int','Image quantity represents how many pictures there are currently under the project'),
                    project_description:new Newtype1('this is project description222','project_description','string','Project’s Description'),
                    project_name:new Newtype1('testing_project2','project_name','string','Project name'),
                    status:new Newtype1('Model training completed','status','string','Project status'),
                    user_id:new Newtype1('115','user_id','string','userid')
                }
            ),
            listproject:new Content(
                'This api is responsible for listing all projects from the user account',
                '/api/v2/project/list',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDM1OTAxMX0.cvJCkIXLp0h6oGjERkLjUJIwpIACloXU1t366wGIS58',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','userid')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('get peoject success','err_msg','string','Error message, only used when err = 1'),
                    project_list:new Newtype1(
                        [
                            {
                                "Type": "AI Model training",
                                "img_quantity": null,
                                "project_description": "this is project description2",
                                "project_name": "testing project",
                                "status": "Image upload"
                            }
                        ]
                        ,'project_list','array json','Project list, Only works when err = 0')
                }
            ),
            listallproject:new Content(
                'This api is responsible for listing all project information',
                '/api/v2/project/listall',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg1ODc2OX0.ppi12a4Q1RenUL_aSXeY8GKAbjXskhRqKy1iCNPq3f4',
                        'token','string','Access token'
                    )
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('success','err_msg','string','Error message, only used when err = 1'),
                    project_list:new Newtype1(
                        [
                            {
                                "CreateTime": "2024-04-26 15:03:48.230",
                                "Type": "AI Model training",
                                "email": "TTT123@gmail.com",
                                "id": 14,
                                "img_generation_remaining_count": 4,
                                "img_quantity": 3,
                                "project_description": "this is project description",
                                "project_name": "aaa",
                                "status": "Model training completed",
                                "user_id": "13"
                            },
                            {
                                "CreateTime": "2024-04-26 15:03:48.230",
                                "Type": "AI Model training",
                                "email": "pricetestinguser@gmail.com",
                                "id": 18,
                                "img_generation_remaining_count": 4,
                                "img_quantity": 114,
                                "project_description": "this is project description",
                                "project_name": "PriceTestingProject",
                                "status": "Model training completed",
                                "user_id": "19",
                                "...":"...僅列出部分"
                            }
                        ]
                        ,'project_list','array json','Project list, Only works when err = 0')
                }
            )
        },
        image:{
            deleteimage:new Content(
                'This api is responsible for deleting the image information',
                '/api/v2/image/delete',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDM1OTAxMX0.cvJCkIXLp0h6oGjERkLjUJIwpIACloXU1t366wGIS58',
                        'token','string','Access token'
                    ),
                    image_path:new Newtype1('uploads/115/testing project/getsingleproject.png','image_path','string','Image path from s3')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('delete image success','err_msg','string','Error message, only used when err = 1')
                }
            ),
            uploadimage:new Content(
                'This api is responsible for uploading the image',
                '/api/v2/image/upload',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDI5NTI3N30.FYMSFzfEhc5d7oG6q6OkoSWn-wUsm5dSilN0ocrNb8A',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','userid'),
                    projectname:new Newtype1('testing project','projectname','string','Project name'),
                    type:new Newtype1('"feedback"','type','string','Image upload type,tpye:""為一般圖片上傳,type:"feedback"為上傳feedback圖片'),
                    image:new Newtype1('file','image','file','Image actual file')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('Image uploaded successfully','err_msg','string','Error message, only used when err = 1'),
                    uploaded_files:new Newtype1(
                        [
                            "getallproject.png",
                            "getsingleproject.png"
                        ]
                        ,'uploaded_files','string','uploaded files list'
                    )
                }
            ),
            feedbackinformation:new Content(
                'This api is responsible for updating the image feedback information',
                '/api/v2/image/feedbackinfo',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg2NjA3M30.2kBzXKQshCT51E0XeNOIXhdumN6-O94NjK9-_ZO-O2c',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','Project name'),
                    feedbackinfo:new Newtype1('this is feedbackinfo','feedbackinfo','string','image feedback information'),
                    origin_img_name:new Newtype1('image_1.jpg','origin_img_name','string','origin image name')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('Update feedbackInfo succes','err_msg','string','Error message, only used when err = 1')
                }
            )
        },
        requierment:{
            uploadrequirement:new Content(
                'This api is responsible for uploading the requirement',
                '/api/v2/image/requirement',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg1ODc2OX0.ppi12a4Q1RenUL_aSXeY8GKAbjXskhRqKy1iCNPq3f4',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','Project name'),
                    request:new Newtype1(
                        {
                            "Requirement1": {
                              "question": "What is the type of location/environment that the AI model will be used?",
                              "answer": "111"
                            },
                            "Requirement2": {
                              "question": "What is the type of location/environment that the AI model will be used?",
                              "answer": "111"
                            },
                            "ID": "testing_project2",
                            "author": "115",
                            "LastUpdated": "2024/7/13 上午12:21:05"
                        }
                        ,'request','json','requirement body')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('Requirement uploaded successfully','err_msg','string','Error message, only used when err = 1')
                }
            ),
            getrequirement:new Content(
                'This api is responsible for getting the requirement information',
                '/api/v2/image/getrequirement',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg1ODc2OX0.ppi12a4Q1RenUL_aSXeY8GKAbjXskhRqKy1iCNPq3f4',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','Project name')
                },
                {
                    ID:new Newtype1('testing_project2','ID','string','Project name'),
                    LastUpdated:new Newtype1('2024/7/13 上午12:21:05','LastUpdated','string','“2024/7/13 上午12:21:05” time format'),
                    Requirement1:new Newtype1(
                        {
                            "answer": "111",
                            "question": "What is the type of location/environment that the AI model will be used?"
                        }
                        ,'Requirement1','json','requirement1 information'
                    ),
                    Requirement2:new Newtype1(
                        {
                            "answer": "111",
                            "question": "What is the type of location/environment that the AI model will be used?"
                        }
                        ,'Requirement2','json','requirement2 information'
                    ),
                    author:new Newtype1('115','author','string','user id'),
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('requirement found','err_msg','string','Error message, only used when err = 1')
                }
            )
        },
        model:{
            deletemodel:new Content(
                'This api is responsible for deleting the model',
                '/api/v2/model/delete',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDM2MzY0M30.2ceHoE2UFTcnU7hc8-BZWzHeC4FQw_nYG2MyB42aQgI',
                        'token','string','Access token'
                    ),
                    project_id:new Newtype1('623','project_id','string','Project id')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('Model delete success','err_msg','string','Error message, only used when err = 1')
                }
            ),
            downloadmodel:new Content(
                'This api is responsible for downloading the model',
                '/api/v2/model/download',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDM2MzY0M30.2ceHoE2UFTcnU7hc8-BZWzHeC4FQw_nYG2MyB42aQgI',
                        'token','string','Access token'
                    ),
                    project_id:new Newtype1('623','project_id','string','Project id')
                },
                {
                    model:new Newtype1('file','model','file','actual model file')
                }
            ),
            uploadmodel:new Content(
                'This api is responsible for uploading the model',
                '/api/v2/model/upload',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDI5NTI3N30.FYMSFzfEhc5d7oG6q6OkoSWn-wUsm5dSilN0ocrNb8A',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing project','projectname','string','Project name'),
                    model:new Newtype1('file','model','file','actual model file')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('upload model success','err_msg','string','Error message, only used when err = 1')
                }
            )
        },
        sdprocess:{
            txt2img:new Content(
                'This api is responsible for txt2img generation',
                '/api/v2/process/txt2img',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg3ODg2M30.hxR1xwEh2pP56j0waWklQLhjtwhP1SCQHD8Y785T6UU',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','Project name'),
                    count:new Newtype1('2','count','string','image generation count'),
                    txt2img_parameter:new Newtype1(
                        {
                            "enable_hr": false,
                            "denoising_strength": 0,
                            "hr_scale": 2,
                            "hr_upscaler": "Latent",
                            "hr_second_pass_steps": 0,
                            "hr_resize_x": 0,
                            "hr_resize_y": 0,
                            "prompt": "A cat",
                            "styles": [],
                            "seed": -1,
                            "batch_size": 2,
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
                              "sd_model_checkpoint": "animagineXLV31_v31.safetensors [e3c47aedb0]" 
                            },
                            "script_args": [],
                            "sampler_index": "Euler a",
                            "alwayson_scripts": {}                        
                        }
                        ,'txt2img_parameter','json','txt2img parameter')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('upload SDImages success','err_msg','string','Error message, only used when err = 1'),
                    base64:new Newtype1('base64圖片','base64','string','image base64')
                }
            ),
            getsdimange:new Content(
                'This api is responsible for getting the sd image base64',
                '/api/v2/process/getsdimg',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg4MDQ2MX0.UN1jtLZkdr3kp-oJzd-gtLgmAAaz39U14HozxI2ppD0',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','Project name'),
                    count:new Newtype1('2','count','string','image generation count')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('upload SDImages success','err_msg','string','Error message, only used when err = 1'),
                    base64:new Newtype1('base64圖片j在s3上的位址','base64','string','The path of the base64 image on s3')
                }
            ),
            listsdmodel:new Content(
                'This api is responsible for listing the sd model',
                '/api/v2/model/listsdmodel',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg3Nzk2OH0.qm8EB4v0-1zfxGD9JVcEd4FRgMtpYmS00pQmHCLfx9M',
                        'token','string','Access token'
                    )
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('get model success','err_msg','string','Error message, only used when err = 1'),
                    model_list:new Newtype1(
                        [
                            {
                                "checkpoint": "animagineXLV31_v31.safetensors [e3c47aedb0]",
                                "model_name": "S Series",
                                "description": "This is a model S Series image style.",
                                "model_styleimg_base64": "base64"
                            }
                        ]
                        ,'model_list','string','model information'
                    )
                }
            ),
            modifysdmodel:new Content(
                'This api is responsible for modifying the sd model',
                '/api/v2/model/modifysdmodel',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDg2NjA3M30.2kBzXKQshCT51E0XeNOIXhdumN6-O94NjK9-_ZO-O2c',
                        'token','string','Access token'
                    ),
                    description:new Newtype1('This is a model S Series image style._test','description','string','model description'),
                    modelname:new Newtype1('S Series_test','modelname','string','model name'),
                    checkpoint:new Newtype1('2','checkpoint','string','checkpoint'),
                    base64:new Newtype1('base64圖片','base64','string','image base64')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('Update SD model information success','err_msg','string','Error message, only used when err = 1')
                }
            )
        },
        ec2context:{
            deployec2:new Content(
                'This api is responsible for deploy ec2',
                '/api/v2/ec2context/deploy_ec2',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlcmVrd2FuIiwiZW1haWwiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsImV4cCI6MTcxODAxMDIxNH0.0kkN5cJh5WapMTSpRtVtddv0ADdEpevuovN13M0wIJw',
                        'token','string','Access token'
                    )
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('deploy ec2 success','err_msg','string','Error message, only used when err = 1'),
                    instance_id:new Newtype1('i-03e0edfae53e98623','instance_id','string','instance_id')
                }
            ),
            startec2:new Content(
                'This api is responsible for start ec2',
                '/api/v2/ec2context/start_ec2',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlcmVrd2FuIiwiZW1haWwiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsImV4cCI6MTcxODQ0NzI3M30.oOFZdg37lsQ_7KMSNZGVXrrYvQeUaD_GDauohCyflC8',
                        'token','string','Access token'
                    ),
                    instance_id:new Newtype1('i-03e0edfae53e98623','instance_id','string','instance_id')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('start ec2 success','err_msg','string','Error message, only used when err = 1')
                }
            ),
            stopec2:new Content(
                'This api is responsible for stop ec2',
                '/api/v2/ec2context/stop_ec2',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlcmVrd2FuIiwiZW1haWwiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsImV4cCI6MTcxODQ0NzI3M30.oOFZdg37lsQ_7KMSNZGVXrrYvQeUaD_GDauohCyflC8',
                        'token','string','Access token'
                    ),
                    instance_id:new Newtype1('i-03e0edfae53e98623','instance_id','string','instance_id')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('stop ec2 success','err_msg','string','Error message, only used when err = 1')
                }
            ),
            deleteec2:new Content(
                'This api is responsible for delete ec2',
                '/api/v2/ec2context/delete_ec2',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlcmVrd2FuIiwiZW1haWwiOiJ0ZXN0MTIzQGdtYWlsLmNvbSIsImV4cCI6MTcxNjk5MzE1OH0.mtE_3P1kPKmQA0WXkR-UjW0N8REio3Y942gP7PfLnRk',
                        'token','string','Access token'
                    ),
                    instance_id:new Newtype1('i-03e0edfae53e98623','instance_id','string','instance_id')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('stop ec2 success','err_msg','string','Error message, only used when err = 1')
                }
            )
        }
    }

    const tag = [['Description'],['HTTP request'],['Request body'],['Key','Value_type','Value'],['Response'],['Key','Value_type','Value']];
    const spy = ['Description','HTTP request','Request body','Response'];

    const Params = useParams();
    const [claim,setclaim]=useState('')
    const [inputFrom,setinputFrom]=useState([])

    useEffect(()=>{
        let h=''
        if(Params.name!==undefined){
            h+=Params.name
        }
        if(Params.value!==undefined){
            h+='.'+Params.value
        }
        setclaim(h)
        let a=[]
        if(Params.name!==undefined&&Params.value!==undefined){
          for (const [key, value] of Object.entries(apicontent[Params.name][Params.value].request)) {
            a.push(value)
          }
          setinputFrom(a)
        }
    },[Params])

    const handlepagestatue= (e,list)=>{
        let p =[]
        for (const element of pagelist) {
            if(element.name===list.name){
                p.push({
                    name:list.name,
                    value:list.value,
                    statue:!list.statue
                })
            }
            else{
                p.push(element)
            }
        }
        setpagelist(p)
    }

    const handlepagevalue = (name,value) =>{
        let html=value.map((list) =>
            <div>
                <Link class="dropdown-item tpl2" to={`/reference/rest/${name}/${list}`}>{list}</Link>
            </div>
        )
        return html
    }
    let html1 =pagelist.map((list) => 
        <div>
            <div class='grid2 tpl1' onClick={(e) => handlepagestatue(e,list)}>
                <Link class={`${list.statue ? 'trun' : ' '} icon2 dropdown-item`}>chevron_right</Link>
                <Link
                    class="dropdown-item"
                >{list.name}
                </Link>
            </div>
            <ul class={`${list.statue ? 'navshow' : 'navhide'}`}>
                <div>
                    {handlepagevalue(list.name,list.value)}
                </div>
            </ul>
        </div>
    )

    const handledescription = (value) => {
        let h = value.map((list) =>
            <td>{apicontent[Params.name][Params.value].description}</td>
        )
        return h
    }

    const handlehttp = (value) => {
        let h = value.map((list) =>
            <td>{`${apicontent[Params.name][Params.value].method}    ${domain}${apicontent[Params.name][Params.value].api}`}</td>
        )
        return h
    }
    
    const handlejson = (name,value) => {
        let json={}
        if(Params.name!==undefined && Params.value!==undefined){
            for (const [key, value] of Object.entries(apicontent[Params.name][Params.value][name])) {
                json[value.key]=value.example
            }
        }

        let h =<></>
        h = value.map((list) =>
            <td><pre>{JSON.stringify(json,null,2)}</pre></td>
        )
        
        return h
    }


    const handletable = (name) => {
        let l=[]
        if(Params.name!==undefined && Params.value!==undefined){
            for (const [key, value] of Object.entries(apicontent[Params.name][Params.value][name])) {
                l.push(`${value.key}`)
            }
        }
        let h=<></>
        h = l.map((list) =>
            <tr>
                <td>{apicontent[Params.name][Params.value][name][list].key}</td>
                <td>{apicontent[Params.name][Params.value][name][list].type}</td>
                <td>{apicontent[Params.name][Params.value][name][list].description}</td>
            </tr>
        )
        
        return h
    }

    const handletbody = (value) =>{
        let number = tag.indexOf(value)
        let h=<></>
        if(Params.name!==undefined && Params.value!==undefined){
            switch (number){
                case 0:
                    h=<tr>{handledescription(value)}</tr>;
                    break;
                case 1:
                    h=<tr>{handlehttp(value)}</tr>;
                    break;
                case 2:
                    h=<tr>{handlejson('request',value)}</tr>;
                    break;
                case 3:
                    h=handletable('request');
                    break;
                case 4:
                    h=<tr>{handlejson('response',value)}</tr>;
                    break;
                case 5:
                    h=handletable('response');
                    break;
                default:
                    console.log('miss')
                    break;
            }
        }
        return h
    }

    const handlespyid = (value) =>{
        let h=<></>;
        for(const element of spy){
            if(element === value){
                h=<div><div class='pt-5 pb-4'id={`${value}`}></div><div>{value}</div></div>
                return h
            }
            else{
                h=<div>{value}</div>
            }
        }
        return h
    }

    const handlethead = (value) =>{
        let h = value.map((list) =>
            <th scope="col">{handlespyid(list)}</th>
        )
        return h
    }

    let html2 =tag.map((list) =>
        <div>
            <table class="table table-striped mt-2">
            <thead>
                <tr>
                    {handlethead(list)}
                </tr>
            </thead>
            <tbody>
                    {handletbody(list)}
            </tbody>
            </table>
        </div>
    )

    const handlescrollspy = (e) => {
        let name=e.target.innerText
        document.getElementById(name).scrollIntoView({'behavior':'instant'});
    }

    let html3=spy.map((list) => 
        <Link
            style={{'font-size': '14px'}}
            id={list}
            onClick={(e) => handlescrollspy(e)}
            class="dropdown-item pt-2 item"
        >
            {list}
        </Link>
    )

    const changeInputBox = (e) =>{
      let a=[]
      for(const element of inputFrom){
        if(element.key===e.target.name){
          let b ={
            example:e.target.value,
            key:element.key,
            type:element.type,
            description:element.description
          }
          a.push(b)
        }
        else{
          a.push(element)
        }
      }
      console.log(a)
      setinputFrom(a)
    }


    const onSelected = (event) => {
        if(event.target.files.length > 0){
            let files =event.target.file
            var object = {};
            
            if (files) {
                const newFiles = new DataTransfer();
                for (let index = 0; index < files.length; index++) {
                    newFiles.items.add(files[index]);
                }
                const formData = new FormData();
            
                for (let index = 0; index < newFiles.files.length; index++){
                    const element = newFiles.files[index];
                    formData.append('file-' + index, element); // 確保每個文件都被正確命名
                }
                formData.forEach((value, key) => object[key] = value);
            }
            
            let a=[]
            for(const element of inputFrom){
                if(element.key===event.target.name){
                let b ={
                    example:object,
                    key:element.key,
                    type:element.type,
                    description:element.description
                }
                a.push(b)
                }
                else{
                a.push(element)
                }
            }
            setinputFrom(a)
        }
    }

    const handleinputtype = (value) =>{
        let h=<></>
        
        if(value.type==='file'){
            h=<div class="mb-3">
                <label class="form-label">{value.key}</label>
                <input
                name={value.key}
                type={value.type}
                class="form-control"
                multiple="true"
                accept={accept}
                onChange={(e) => onSelected(e)}
                />
            </div>
        }
        else if(value.type==='json'){
            h=<div class="mb-3">
                <label class="form-label">{value.key}</label>
                <textarea
                name={value.key}
                type={value.type}
                class="form-control"
                placeholder={value.key}
                value={JSON.stringify(value.example)}
                style={{'field-sizing': 'content'}}
                onChange={(e) => changeInputBox(e)}
                />
            </div>
        }
        else if(value.key==='token'){
            h=<div class="mb-3">
                <label class="form-label">{value.key}</label>
                <textarea
                name={value.key}
                type={value.type}
                class="form-control"
                placeholder={value.key}
                value={value.example}
                style={{'field-sizing': 'content'}}
                onChange={(e) => changeInputBox(e)}
                />
            </div>
        }
        else{
            h=<div class="mb-3">
                <label class="form-label">{value.key}</label>
                <input
                name={value.key}
                type={value.type}
                class="form-control"
                placeholder={value.key}
                value={value.example}
                onChange={(e) => changeInputBox(e)}
                />
            </div>
        }

        
        return h
    }

    let html4 = <></>;
    if(Params.name!==undefined && Params.value!==undefined){

      html4 = inputFrom.map((list) =>
        handleinputtype(list)
      )
    }

    const Execute = () => {
        let outputFrom={}
        for (const e of inputFrom) {
            outputFrom[e.key]=e.example
        }
        console.log(outputFrom)

        axios.post(domain + apicontent[Params.name][Params.value].api,JSON.stringify(outputFrom),{
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
                    if(!JSON.parse(response.data).err){
                        alert(response.data)
                    }
                    else{
                        alert("Input error")
                    }
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

    return(
        <Fragment>
            <div class={`grid ${isMouseClick? 'active' : ''}`}>
                <div class={`${isMouseClick? 'navback' : ''}`}>
                    <div class={`nav ${isMouseClick? 'active' : ''}`}>
                    <nav style={{'display':`${isMouseClick? 'block':'none'}`}}>
                    <div style={{'margin-top':'24px'}}>
                    <div class='grid2' onClick={() => setisDropDownMenu(!isDropDownMenu)}>
                            <Link class={`${isDropDownMenu ? 'trun' : ' '} icon2 dropdown-item`}>chevron_right</Link>
                            <Link
                                class="dropdown-item"
                            >Rest Api
                            </Link>
                        </div>
                        <ul class={`${isDropDownMenu ? 'navshow' : 'navhide'}`}>
                            {html1}
                        </ul>
                    </div>
                    </nav>
                    </div>
                </div>
                {isMouseClick?
                  <button 
                  class="btn2type1"
                  style={isMouseEnter? {'padding-left': '20px'} :{'padding-left': '0px'}} 
                  onClick={handleMouseClick}
                  collapsed="">
                      <span class="icon">chevron_right</span>
                  </button>
                :
                  <button 
                  class="btn1type1"
                  style={isMouseEnter? {'padding-left': '0px'} :{'padding-left': '20px'}} 
                  onMouseEnter={handleMouseEnterLeave}
                  onMouseLeave={handleMouseEnterLeave}
                  onClick={handleMouseClick}
                  collapsed="">
                      <span class="icon">chevron_right</span>
                  </button>
                }
                
                

                {Params.value!==undefined ?
                    <div class="main1">
                        <div class="main2">
                            <div class="main3">
                                <div class="fs-2">{`Api:${claim}`}</div>
                                <div class='mmm'></div>
                                {html2}
                            </div>
                        </div>
                    </div> 
                :
                    <div class="main1">
                        <div class="main2">
                            <div class="main3">
                                <div class="fs-2">{`Api:${claim}`}</div>
                                
                            </div>
                        </div>
                    </div>
                }

                <div style={{'width':'fit-content'}}>
                  {Params.value!==undefined ?
                      <div class='spy'>
                          <div style={{'padding':'10px','border-left': 'thick double #32a1ce'}}>
                              <div class='fw-bold' style={{'font-size': '16px'}}>On this page</div>
                              {html3}
                              <button
                                  type="button" 
                                  class="btn btn-primary mt-3"
                                  onClick={handleCloseBtn}
                              >
                                  Try it!
                              </button>
                          </div>
                      </div>
                  :
                  <div class='spy'>
                      <div style={{'padding':'10px','border-left': 'thick double #32a1ce'}}>
                          <div class='fw-bold' style={{'font-size': '16px'}}>On this page</div>
                          
                      </div>
                  </div>
                  }
                  <div class={`${isCloseBtn? '':'show'} dropdown-menu dropdown-menu-end input`} style={{'overflow-y': 'auto'}}>
                    <form  class="px-4 py-3">
                      {isCloseBtn?
                        <></>
                        :
                        <button 
                        type="button" 
                        class="btn-close closebtn active" 
                        aria-label="Close"
                        onClick={handleCloseBtn}
                        collapsed="">
                        </button>
                      }
                      {html4}
                      <button 
                      type="button" 
                      class="btn btn-primary" 
                      style={{'left': '85px','position': 'relative'}} 
                      onClick={Execute}
                      >
                        Execute
                      </button>
                    </form>
                  </div>
                </div>
                
            </div>
        </Fragment>    
    );
}

export default Reference;