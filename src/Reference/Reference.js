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

import JsonEditor from './JsonEditor';

class Pagelist {
    name = '';
    value = [];
    statue = false;
    type = '';
  
    constructor(name,value, statue,type) {
      this.name = name;
      this.value = value;
      this.statue = statue;
      this.type = type;
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
    
    const [isMouseEnter, setisMouseEnter] = useState(false);
    const handleMouseEnterLeave = () => {
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
            'Rest Api',
            [
                new Pagelist(
                    'auth',
                    [
                        new Pagelist('signup',[],true,'link'),
                        new Pagelist('signin',[],false,'link'),
                        new Pagelist('listuser',[],false,'link'),
                        new Pagelist('modifyuser',[],false,'link'),
                        new Pagelist('deleteuser',[],false,'link')
                    ],
                    true,
                    'scroll'
                ),
                new Pagelist(
                    'project',
                    [
                        new Pagelist('createproject',[],false,'link'),
                        new Pagelist('deleteproject',[],false,'link'),
                        new Pagelist('getsingleproject',[],false,'link'),
                        new Pagelist('listproject',[],false,'link'),
                        new Pagelist('listallproject',[],false,'link')
                    ],
                    false,
                    'scroll'
                ),
                new Pagelist(
                    'image',
                    [
                        new Pagelist('deleteimage',[],false,'link'),
                        new Pagelist('getimage',[],false,'link'),
                        new Pagelist('listimage',[],false,'link'),
                        new Pagelist('uploadimage',[],false,'link'),
                        new Pagelist('feedbackinformation',[],false,'link')
                    ],
                    false,
                    'scroll'
                ),
                new Pagelist(
                    'requierment',
                    [
                        new Pagelist('uploadrequirement',[],false,'link'),
                        new Pagelist('getrequirement',[],false,'link')
                    ],
                    false,
                    'scroll'
                ),
                new Pagelist(
                    'model',
                    [
                        new Pagelist('deletemodel',[],false,'link'),
                        new Pagelist('downloadmodel',[],false,'link'),
                        new Pagelist('getmodel',[],false,'link'),
                        new Pagelist('listmodel',[],false,'link'),
                        new Pagelist('uploadmodel',[],false,'link')
                    ],
                    false,
                    'scroll'
                ),
                new Pagelist(
                    'sdprocess',
                    [
                        new Pagelist('txt2img',[],false,'link'),
                        new Pagelist('getsdimange',[],false,'link'),
                        new Pagelist('listsdmodel',[],false,'link'),
                        new Pagelist('modifysdmodel',[],false,'link')
                    ],
                    false,
                    'scroll'
                ),
                new Pagelist(
                    'ec2context',
                    [
                        new Pagelist('deployec2',[],false,'link'),
                        new Pagelist('startec2',[],false,'link'),
                        new Pagelist('stopec2',[],false,'link'),
                        new Pagelist('deleteec2',[],false,'link')
                    ],
                    false,
                    'scroll'
                )
            ],
            true,
            'scroll'
        ),
        new Pagelist(
            'Client Libraries',
            [
                new Pagelist('overview',[],false,'link')
            ],
            false,
            'scroll'
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
                'This api is responsible for getting the single project information',
                '/api/v2/project/get',
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
            getimage:new Content(
                'This api is responsible for getting the image information',
                '/api/v2/image/get',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMTgxNTcxNX0.uAaFFkgMabBfldKIgPGkF9XINZ0t9pnsOHiWMkA3e9c',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','project name')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('Get image info success','err_msg','string','Error message, only used when err = 1'),
                    image_list:new Newtype1(
                        [
                            {
                                "LastUpdated": "2024-07-13 06:35:14.218",
                                "image_name": "4.png",
                                "image_path": "uploads/115/testing_project2/4.png",
                                "img_info": null
                            },
                            {
                                "LastUpdated": "2024-07-24 08:44:24.827",
                                "image_name": "image_19.jpg",
                                "image_path": "uploads/115/testing_project2/image_19.jpg",
                                "img_info": null
                            },
                            {
                                "LastUpdated": "2024-07-24 08:44:29.034",
                                "image_name": "image_21.jpg",
                                "image_path": "uploads/115/testing_project2/image_21.jpg",
                                "img_info": null
                            },
                            {
                                "LastUpdated": "2024-07-24 08:45:22.231",
                                "image_name": "image_10.jpg",
                                "image_path": "uploads/115/testing_project2/image_10.jpg",
                                "img_info": null
                            },
                            {
                                "LastUpdated": "2024-07-24 08:45:26.450",
                                "image_name": "image_4.jpg",
                                "image_path": "uploads/115/testing_project2/image_4.jpg",
                                "img_info": null
                            }
                        ],
                        'image_list','array json','Image information'
                    )
                }
            ),
            listimage:new Content(
                'This api is responsible for listing the images',
                '/api/v2/image/list',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMDM1OTAxMX0.cvJCkIXLp0h6oGjERkLjUJIwpIACloXU1t366wGIS58',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','project name')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('images found in s3','err_msg','string','Error message, only used when err = 1'),
                    images:new Newtype1(
                        [
                            "uploads/115/testing_project2/4.png",
                            "uploads/115/testing_project2/image_10.jpg",
                            "uploads/115/testing_project2/image_19.jpg",
                            "uploads/115/testing_project2/image_21.jpg",
                            "uploads/115/testing_project2/image_4.jpg"
                        ],
                        'images','array string','Image path from s3'
                    )
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
                    type:new Newtype1('feedback','type','string','Image upload type,tpye:""為一般圖片上傳,type:"feedback"為上傳feedback圖片'),
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
                        ,'uploaded_files','array string','uploaded files list'
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
            getmodel:new Content(
                'This api is responsible for getting the model information',
                '/api/v2/model/get',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMTgxOTY4MX0.tfj5rFwd-LLVwYjOe_w4b0FH7Gr9ftcw1aeYnFsaGVk',
                        'token','string','Access token'
                    ),
                    username:new Newtype1('115','username','string','user id'),
                    projectname:new Newtype1('testing_project2','projectname','string','project name')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('get model success','err_msg','string','Error message, only used when err = 1'),
                    model_list:new Newtype1(
                        [
                            {
                                "createtime": "2024-07-13 07:02:52.913",
                                "id": 76,
                                "model_name": "yolov3tiny.zip",
                                "model_path": "uploads/115/testing_project2/model/yolov3tiny.zip",
                                "project_id": "624",
                                "version_number": "1"
                            }
                        ],
                        'model_list','array json','model information'
                    )
                }
            ),
            listmodel:new Content(
                'This api is responsible for listing the model',
                '/api/v2/model/list',
                'POST',
                {
                    token:new Newtype1(
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNSwiZW1haWwiOiIxMjM0QGdtYWlsLmNvbSIsImV4cCI6MTcyMTgxOTY4MX0.tfj5rFwd-LLVwYjOe_w4b0FH7Gr9ftcw1aeYnFsaGVk',
                        'token','string','Access token'
                    ),
                    project_id:new Newtype1('624','project_id','string','Project id')
                },
                {
                    err:new Newtype1('false','err','string','1: error, 0: success'),
                    err_msg:new Newtype1('images found in s3','err_msg','string','Error message, only used when err = 1'),
                    model_list:new Newtype1(
                        [
                            {
                                "createtime": "2024-07-13 07:02:52.913",
                                "id": 76,
                                "model_name": "yolov3tiny.zip",
                                "model_path": "uploads/115/testing_project2/model/yolov3tiny.zip",
                                "project_id": "624",
                                "version_number": "1"
                            }
                        ],
                        'model_list','array json','model information'
                    )
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
                        ,'model_list','array json','model information'
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
                    ResponseMetadata:new Newtype1(
                        {
                            "HTTPHeaders": {
                              "cache-control": "no-cache, no-store",
                              "content-length": "412",
                              "content-type": "text/xml;charset=UTF-8",
                              "date": "Fri, 18 Oct 2024 12:29:11 GMT",
                              "server": "AmazonEC2",
                              "strict-transport-security": "max-age=31536000; includeSubDomains",
                              "x-amzn-requestid": "880fac54-dc6a-4e3e-a838-25ee518af42f"
                            },
                            "HTTPStatusCode": 200,
                            "RequestId": "880fac54-dc6a-4e3e-a838-25ee518af42f",
                            "RetryAttempts": 0
                        },
                        'ResponseMetadata','json','Response Meta data'),
                    StartingInstances:new Newtype1(
                        [
                            {
                              "CurrentState": {
                                "Code": 16,
                                "Name": "running"
                              },
                              "InstanceId": "i-0d4542539ba13bd7a",
                              "PreviousState": {
                                "Code": 16,
                                "Name": "running"
                              }
                            }
                        ],
                        'StartingInstances','array json','Starting Instances')
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
                    ResponseMetadata:new Newtype1(
                        {
                            "HTTPHeaders": {
                              "cache-control": "no-cache, no-store",
                              "content-length": "411",
                              "content-type": "text/xml;charset=UTF-8",
                              "date": "Fri, 18 Oct 2024 12:32:57 GMT",
                              "server": "AmazonEC2",
                              "strict-transport-security": "max-age=31536000; includeSubDomains",
                              "x-amzn-requestid": "e235d5d7-1ed1-4a7d-9897-ed8b0ec2aa9a"
                            },
                            "HTTPStatusCode": 200,
                            "RequestId": "e235d5d7-1ed1-4a7d-9897-ed8b0ec2aa9a",
                            "RetryAttempts": 0
                        },
                        'ResponseMetadata','json','Response Meta data'),
                    StoppingInstances:new Newtype1(
                        [
                            {
                              "CurrentState": {
                                "Code": 64,
                                "Name": "stopping"
                              },
                              "InstanceId": "i-0d4542539ba13bd7a",
                              "PreviousState": {
                                "Code": 16,
                                "Name": "running"
                              }
                            }
                        ],
                        'StoppingInstances','array json','Stopping Instances')
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
                    ResponseMetadata:new Newtype1(
                        {
                            "HTTPHeaders": {
                              "cache-control": "no-cache, no-store",
                              "content-length": "423",
                              "content-type": "text/xml;charset=UTF-8",
                              "date": "Fri, 18 Oct 2024 12:34:25 GMT",
                              "server": "AmazonEC2",
                              "strict-transport-security": "max-age=31536000; includeSubDomains",
                              "x-amzn-requestid": "6f4ecc54-21b4-4a52-aa21-6f584282f6ac"
                            },
                            "HTTPStatusCode": 200,
                            "RequestId": "6f4ecc54-21b4-4a52-aa21-6f584282f6ac",
                            "RetryAttempts": 0
                        },
                        'ResponseMetadata','json','Response Meta data'),
                    TerminatingInstances:new Newtype1(
                        [
                            {
                              "CurrentState": {
                                "Code": 48,
                                "Name": "terminated"
                              },
                              "InstanceId": "i-0d4542539ba13bd7a",
                              "PreviousState": {
                                "Code": 80,
                                "Name": "stopped"
                              }
                            }
                        ],
                        'TerminatingInstances','array json','Terminating Instances')
                }
            )
        }
    }

    const tag = {
        rest:[['Description'],['HTTP request'],['Request body'],['Key','Value_type','Value'],['Response'],['Key','Value_type','Value']],
        client:[[''],['Install the client library'],['Set up authentication'],['Use the client library'],['Additional resources']]
    };
    const [spy,setspy] = useState({
        rest:[
            {
                name:'Description',
                statue:false
            },
            {
                name:'HTTP request',
                statue:false
            },
            {
                name:'Request body',
                statue:false
            },
            {
                name:'Response',
                statue:false
            }],
        client:[
            {
                name:'Install the client library',
                statue:false
            },
            {
                name:'Set up authentication',
                statue:false
            },
            {
                name:'Use the client library',
                statue:false
            },
            {
                name:'Additional resources',
                statue:false
            }]
        });

    const Params = useParams();
    const [claim,setclaim]=useState('')
    const [inputFrom,setinputFrom]=useState([])
    const [overviewbtn,setoverviewbtn]=useState({
        c:true,n:false,p:false      
    });
    
    const [responsemsg,setresponsemsg]=useState({})

    const onScroll = () => {
        let w_y=window.pageYOffset
        let s={...spy}
        if(document.getElementById(s[Params.tag][0].name)!==null){
            
            let c;
            for(let i=0;i<s[Params.tag].length;i++){
                let y =document.getElementById(s[Params.tag][i].name).offsetTop
                if(w_y >y){
                    c=i
                }
            }
            for(let j=0;j<s[Params.tag].length;j++){
                if(c===j){
                    s[Params.tag][j].statue=true
                }
                else{
                    s[Params.tag][j].statue=false
                }
            }
            setspy(s)
        }
        
    }

    useEffect(()=>{
        let h=''
        if(Params.tag!==undefined){
            if(Params.tag==='rest'){
                h+='Api: '
            }
            else if(Params.tag==='client'){
                h+='Library: '
            }
        }
        if(Params.name!==undefined){
            h+=Params.name
        }
        if(Params.value!==undefined){
            h+='.'+Params.value
        }
        setclaim(h)
        let a=[]
        if(Params.name!==undefined&&Params.value!==undefined){
            console.log(1)
          for (const [key, value] of Object.entries(apicontent[Params.name][Params.value].request)) {
            let v = value
            if(v.type==='file'){
                v.example=[new File([""],'')];
            }
            else if(v.type==='json'){
                v.example={ example:'example'};
            }
            else{
                v.example=''
            }
            a.push(v)
          }
          setinputFrom(a)
        }

        window.addEventListener('scroll',onScroll);
        
        return () => {
            window.removeEventListener('scroll',onScroll)
        }
    },[Params])

    const handlepagestatue= (e,list)=>{
        let p =pagelist
        if(list.type==='scroll'){
            for (const element1 of p) {
                if(element1.name===list.name){
                    element1.statue=!list.statue
                }
                else{
                    for (const element2 of element1.value){
                        if(element2.name===list.name){
                            element2.statue=!list.statue
                        }
                        else{
                            for (const element3 of element2.value){
                                if(element3.name===list.name){
                                    element3.statue=!list.statue
                                }
                            }
                        }
                    }
                }
            }
        }
        else if(list.type==='link'){
            for (const element1 of p) {
                if(element1.type==='link'){
                    element1.statue=false
                }
                if(element1.name===list.name){
                    element1.statue=true
                }
                else{
                    for (const element2 of element1.value){
                        if(element2.type==='link'){
                            element2.statue=false
                        }
                        if(element2.name===list.name){
                            element2.statue=true
                        }
                        else{
                            for (const element3 of element2.value){
                                if(element3.type==='link'){
                                    element3.statue=false
                                }
                                if(element3.name===list.name){
                                    element3.statue=true
                                }
                            }
                        }
                    }
                }
            }
        }
        
        setpagelist(p)
    }

    const handlepagelist = (l,c,n) => {
        n++;
        let html = l.map((list) =>
        {
            let name='';
            if(list.name==='Rest Api'){
                name='rest'
            }
            else if(list.name==='Client Libraries'){
                name='client'
            }
            else{
                name=list.name
            }
            if(list.type==='scroll'){
                let b=c;
                c+=`/${name}`;
                let h=<div>
                        <div class={`grid2 tpl${n} me-3`} onClick={(e) => handlepagestatue(e,list)}>
                            <Link class={`${list.statue ? 'trun' : ' '} icon2 dropdown-item`}>chevron_right</Link>
                            <Link
                                class="dropdown-item"
                            >{list.name}
                            </Link>
                        </div>
                        <ul class={`${list.statue ? 'navshow' : 'navhide'}`}>
                            <div>
                                {handlepagelist(list.value,c,n)}
                            </div>
                        </ul>
                    </div>
                c = b;
                return h
            }
            else if(list.type==='link'){
                let b=c;
                c+=`/${name}`;
                let h =<div class='me-3'>
                        <Link 
                        class={`dropdown-item tpl${n} ${list.statue ? 'onpage':''}`}
                        onClick={(e) => handlepagestatue(e,list)} 
                        to={`/reference${c}`}>
                            {list.name}
                        </Link>
                    </div>
                c=b;
                return h
            }
        }
        )
        
        return html
    }

    let html1 =handlepagelist(pagelist,'',-1)

    const handledescription = (value) => {
        let h = value.map((list) =>
            <td class='word'>{apicontent[Params.name][Params.value].description}</td>
        )
        return h
    }

    const handlehttp = (value) => {
        let h = value.map((list) =>
            <td class='word'>{`${apicontent[Params.name][Params.value].method}    ${domain}${apicontent[Params.name][Params.value].api}`}</td>
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
            <td><pre class='word'>{JSON.stringify(json,null,2)}</pre></td>
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
                <td class='word'>{apicontent[Params.name][Params.value][name][list].key}</td>
                <td class='word'>{apicontent[Params.name][Params.value][name][list].type}</td>
                <td class='word'>{apicontent[Params.name][Params.value][name][list].description}</td>
            </tr>
        )
        
        return h
    }

    const handletbody = (value) =>{
        let number = tag[Params.tag].indexOf(value)
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
        if(Params.value!==undefined){
            for(const element of spy[Params.tag]){
                if(element === value){
                    h=<div style={{'font-weight':'bold'}}><div class='pt-5 pb-4'></div><div>{value}</div></div>
                    return h
                }
                else{
                    h=<div style={{'font-weight':'bold'}}>{value}</div>
                }
            }
        }
        else if(Params.tag!==undefined){
            for(const element of spy[Params.tag]){
                if(element === value){
                    h=<div class='mt-5' style={{'font-weight':'bold'}}><div class='pt-5 pb-4'></div><div>{value}</div></div>
                    return h
                }
                else{
                    h=<div class='mt-5' style={{'font-weight':'bold'}}>{value}</div>
                }
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

    const handleoverviewbtn = (value) => {
        let btn={...overviewbtn}
        btn.c=false
        btn.n=false
        btn.p=false
        btn[value]=true
        setoverviewbtn(btn)
    }

    const handleclientoverview = (value) => {
        let h=<></>
        if(value===0){
            h=<div>
                <p>This page shows how to get started with the Cloud Client Libraries for the Cloud Build API. Client libraries make it easier to access Google Cloud APIs from a supported language. Although you can use Google Cloud APIs directly by making raw requests to the server, client libraries provide simplifications that significantly reduce the amount of code you need to write.</p>
                <p>However, we recommend using the older Google API Client Libraries if running on App Engine standard environment. Read more about the Cloud Client Libraries and the older Google API Client Libraries in Client libraries explained.</p>
            </div>
        }
        else if(value===1){
            h=<div class='mt-3'>
                <div class='tab py-2 px-2 '>
                    <button class={`${overviewbtn.c? 'active' :''}`} onClick={(e) => handleoverviewbtn('c')}>C++</button>
                    <button class={`${overviewbtn.n? 'active' :''}`} onClick={(e) =>handleoverviewbtn('n')}>Node.js</button>
                    <button class={`${overviewbtn.p? 'active' :''}`} onClick={(e) =>handleoverviewbtn('p')}>Python</button>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.c? 'active' :''}`}>
                    <p>See <span style={{'color':'blue'}}>Setting up a C++ development environment</span>
                    for details about this client library's requirements and install dependencies.</p>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.n? 'active' :''}`}>
                    <pre>npm install --save @google-cloud/cloudbuild</pre>
                    <p>For more information, see <span style={{'color':'blue'}}>Setting Up a Node.js Development Environment</span>.</p> 
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.p? 'active' :''}`}>
                    <pre>pip install --upgrade google-cloud-build</pre>
                    <p>For more information, see <span style={{'color':'blue'}}>Setting Up a Python Development Environment</span>.</p>
                </div>
            </div>
        }
        else if(value===2){
            h=<div  class='mt-3'>
                <p>To authenticate calls to Google Cloud APIs, client libraries support Application Default Credentials (ADC); the libraries look for credentials in a set of defined locations and use those credentials to authenticate requests to the API. With ADC, you can make credentials available to your application in a variety of environments, such as local development or production, without needing to modify your application code.
                For production environments, the way you set up ADC depends on the service and context. For more information, see Set up Application Default Credentials.</p>
                <p>For a local development environment, you can set up ADC with the credentials that are associated with your Google Account:</p>
                <ol>
                    <li><p>Install the Google Cloud CLI, then initialize it by running the following command:</p></li>
                    <pre>gcloud init</pre>
                    <li><p>If you're using a local shell, then create local authentication credentials for your user account:</p></li>
                    <pre>gcloud auth application-default login</pre>
                    <p>You don't need to do this if you're using Cloud Shell.</p>
                    <p>A sign-in screen appears. After you sign in, your credentials are stored in the local credential file used by ADC.</p>
                </ol>
                
                
            </div>
        }
        else if(value===3){
            h=<div class='mt-3'>
                <div class='tab py-2 px-2 '>
                    <button class={`${overviewbtn.c? 'active' :''}`} onClick={(e) => handleoverviewbtn('c')}>C++</button>
                    <button class={`${overviewbtn.n? 'active' :''}`} onClick={(e) =>handleoverviewbtn('n')}>Node.js</button>
                    <button class={`${overviewbtn.p? 'active' :''}`} onClick={(e) =>handleoverviewbtn('p')}>Python</button>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.c? 'active' :''}`}>
                    <pre>C++</pre>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.n? 'active' :''}`}>
                    <pre>Node.js</pre>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.p? 'active' :''}`}>
                    <pre>Python</pre>
                </div>
            </div>
        }
        else if(value===4){
            h=<div class='mt-3'>
                <div class='tab py-2 px-2 '>
                    <button class={`${overviewbtn.c? 'active' :''}`} onClick={(e) => handleoverviewbtn('c')}>C++</button>
                    <button class={`${overviewbtn.n? 'active' :''}`} onClick={(e) =>handleoverviewbtn('n')}>Node.js</button>
                    <button class={`${overviewbtn.p? 'active' :''}`} onClick={(e) =>handleoverviewbtn('p')}>Python</button>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.c? 'active' :''}`}>
                    <p>The following list contains links to more resources related to the client library for C++:</p>
                    <li><span style={{'color':'blue'}}>API reference</span></li>
                    <li><span style={{'color':'blue'}}>Client libraries best practices</span></li>
                    <li><span style={{'color':'blue'}}>Issue tracker</span></li>
                    <li><span style={{'color':'blue'}}>google-cloudbuild on Stack Overflow</span></li>
                    <li><span style={{'color':'blue'}}>Source code</span></li>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.n? 'active' :''}`}>
                    <p>The following list contains links to more resources related to the client library for Node.js:</p>
                    <li><span style={{'color':'blue'}}>API reference</span></li>
                    <li><span style={{'color':'blue'}}>Client libraries best practices</span></li>
                    <li><span style={{'color':'blue'}}>Issue tracker</span></li>
                    <li><span style={{'color':'blue'}}>google-cloudbuild on Stack Overflow</span></li>
                    <li><span style={{'color':'blue'}}>Source code</span></li>
                </div>
                
                <div class={`p-3 tabbox ${overviewbtn.p? 'active' :''}`}>
                    <p>The following list contains links to more resources related to the client library for Python</p>
                    <li><span style={{'color':'blue'}}>API reference</span></li>
                    <li><span style={{'color':'blue'}}>Client libraries best practices</span></li>
                    <li><span style={{'color':'blue'}}>Issue tracker</span></li>
                    <li><span style={{'color':'blue'}}>google-cloudbuild on Stack Overflow</span></li>
                    <li><span style={{'color':'blue'}}>Source code</span></li>
                </div>
            </div>
        }
        return h
    }

    let html2 =tag[Params.tag].map((list,index) => {
        let h=<></>
        if(Params.value!==undefined){
            h=<div id={`${list[0]}`} class="pt-3">
                <table class="table table-striped mt-5">
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
        }
        else  if(Params.name!==undefined){
            h=<div id={`${list[0]}`} class="pt-4">
            {handlespyid(list[0])}
            {handleclientoverview(index)}
            
        </div>
        }
        return h
    })

    const handlescrollspy = (e) => {
        let name=e.target.innerText
        document.getElementById(name).scrollIntoView({'behavior':'instant'});
    }

    let html3=spy[Params.tag].map((list) => 
        <Link
            style={{'font-size': '14px'}}
            onClick={(e) => handlescrollspy(e)}
            class={` dropdown-item pt-2 item ${list.statue ? 'onspy':''}`}
        >
            {list.name}
        </Link>
    )

    const updateInputFrom = (key, value) => {
        setinputFrom((prevInputFrom) => 
            prevInputFrom.map((element) => 
              element.key === key ? { ...element, example: value } : element
            )
          );
      };

    const changeInputBox = (e) =>{
        const { name, value } = e.target;
        updateInputFrom(name, value);
    }

    const handlejsonvalue = (value,key) =>{
        updateInputFrom(key, value);
    }

    const onSelected = (event) => {
        let files =[new File([""],'')]

        if(event.target.files.length > 0){
            files =event.target.files
        }

        let a=[]
        for(const element of inputFrom){
            if(element.key===event.target.name){
            let b ={
                example:files,
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
                <JsonEditor value={value.example} KEY={value.key} handlejsonvalue={handlejsonvalue} />
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

    let html4 = inputFrom.map((list) => {
        let h=<></>
        if(Params.name!==undefined && Params.value!==undefined){
            h=handleinputtype(list)
        }
        return h
    })
    



    const Execute = () => {
        let outputFrom={}
        let isfile = false

        for (const e of inputFrom) {
            outputFrom[e.key]=e.example
            if(e.type==='file'){
                isfile=true
            }
        }

        let data = JSON.stringify(outputFrom)

        let header = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json',
              },
              responseType: 'text',
              reportProgress: true,
              observe: 'events',
        }

        if (isfile) {
            data = new FormData();
            
            for (let index = 0; index < inputFrom.length; index++){
                if(inputFrom[index].type==='file'){
                    for(const element of inputFrom[index].example){
                        data.append(inputFrom[index].key,element);
                    }
                }
                else{
                    data.append(inputFrom[index].key,inputFrom[index].example);
                }
                
            }

            for (var pair of data.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }

            header = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data',
                  },
                  responseType: 'text',
                  reportProgress: true,
                  observe: 'events'
            }
        }

        axios.post(domain + apicontent[Params.name][Params.value].api,data,header)
        .then(
            (response) => {
                console.log(response)
                try{
                    if(!JSON.parse(response.data).err){
                        alert(`success`)
                        setresponsemsg(JSON.parse(response.data))
                    }
                    else{
                        alert(`error`)
                        setresponsemsg(JSON.parse(response.data))
                    }

                }
                catch{
                    const url = window.URL.createObjectURL(new Blob([response.data]));
        
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download');
                    
                    document.body.appendChild(link);
                    link.click();

                    link.parentNode.removeChild(link);
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
                        <div class='mt-3 mb-5'>
                            {html1}
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
                
                <div class="main1">
                    <div class="main2">
                        <div class="main3">
                            <div class="fs-2">{claim}</div>
                            <div class='spy'>
                                <div style={{'padding':'10px','border-left': 'thick double #32a1ce'}}>
                                    <div class='fw-bold' style={{'font-size': '16px'}}>On this page</div>
                                    {html3}
                                    {Params.value!==undefined ?
                                    <button
                                        type="button" 
                                        class="btn btn-primary mt-3"
                                        onClick={handleCloseBtn}
                                    >
                                        Try it!
                                    </button>
                                    :
                                    <></>
                                    }
                                </div>
                            </div>
                            {html2}
                        </div>
                    </div>
                </div> 

                <div style={{'width':'fit-content'}}>

                    {Params.value!==undefined?
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
                            <div>
                                <pre class='word'>
                                    {JSON.stringify(responsemsg,null,2)}
                                </pre>
                            </div>
                            </form>
                        </div>
                        :
                        <></>
                    }
                </div>
                
                  
                
            </div>
        </Fragment>    
    );
}

export default Reference;