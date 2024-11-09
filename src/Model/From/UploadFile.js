import React, {
  Fragment,
  useState,
} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

class FileInfo {
    index = 0;
    name = '';
    size = 0;
    type = '';
  
    constructor(index, name, size, type) {
      this.index = index;
      this.name = name;
      this.size = size;
      this.type = type;
    }
}

const UploadFile = (props) => {
    var unitScale = 1024 * 1024;
    var filenames = useState([]);
    var [isDragOver,setisDragOver] = useState(false);
    var [uploading,setuploading] = useState(false);
    var [uploadSuccess,setuploadSuccess] = useState(false);
    var accept = '*';
    var numRows = 10;
    var maxPageSize = 4;
    var {uploadfile,tasktype,url,setfilestatus,modelstatus} =props
    var [show,setshow] = useState({
        files:{
            value:new FileInfo()
        },
        fileInfoList:{
            value:[]
        },
        currentPage:{
            value:0
        },
        pageList:{
            value:[0]
        },
        showingPageList:{
            value:[]
        }
    })

    const changePage = (event,page) => {
        console.log(page)
        if (page === show.currentPage.value) {
            return;
        }
        
        let newfileInfoList = []
        for (let index = 0; index < numRows; index++) {
            const idx = page * numRows + index;
            if (idx >= show.files.value.length) {
                break;
            }
            const element = show.files.value[idx];
            if(typeof(element) !== 'undefined'){
                newfileInfoList.push(
                    new FileInfo(
                        idx,
                        element.name,
                        element.size / unitScale,
                        element.type
                    )
                );
            }
            
        }
        
        const offset = show.currentPage.value < 2 ? 0 : show.currentPage.value - 2;
        var newshowingPageList = [];
        for (let index = 0; index < maxPageSize; index++) {
            const idx = index + offset;
            if (idx >= show.pageList.value.length) {
                break
            }
            console.log(show.pageList.value.length)
            newshowingPageList.push(show.pageList.value[idx]);
        }

        setshow((prevUser) => ({
            ...prevUser,
            currentPage:{
                value:page
            },
            fileInfoList:{
                value:newfileInfoList
            },
            showingPageList:{
                value:newshowingPageList
            }
        }))
        
    }

    const onDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            handleSelectedFiles(event.dataTransfer.files);
        }
    }

    const onDragOver = (event) => {
        event.preventDefault();
        setisDragOver(true);
    }

    const onDragLeave = (event) => {
        event.preventDefault();
        setisDragOver(false);
    }

    const onSelected = (event) => {
        if(event.target.files.length > 0){
            handleSelectedFiles(event.target.files)
        }
    }

    const handleSelectedFiles = (files) => {
        const newFiles = new DataTransfer();
        
        if (files) {
            for (let index = 0; index < files.length; index++) {
                newFiles.items.add(files[index]);
            }
        }
        for (let index = 0; index < files.length; index++) {
            
            if (filenames.includes(files[index].name)) {
                continue;
            }
            filenames.push(files[index].name);
        }

        let newfileInfoList = []
        const maxSize =
            files.length < numRows ? files.length : numRows;
        for (let index = 0; index < maxSize; index++) {
            const element = files[index];
            newfileInfoList.push(
                new FileInfo(
                    index,
                    element.name,
                    element.size / unitScale,
                    element.type
                )
            );
        }

        let newpageList = []
        for (let index = 0; index < files.length / numRows; index++) {
            newpageList.push(index);
        }

        const offset = show.currentPage.value < 2 ? 0 : show.currentPage.value - 2;
        var newshowingPageList = [];
        for (let index = 0; index < maxPageSize; index++) {
            const idx = index + offset;
            if (idx >= newpageList.length) {
                break
            }
            newshowingPageList.push(newpageList[idx]);
        }

        setshow((prevUser) => ({
            ...prevUser,
            files:{
                value:newFiles.files
            },
            fileInfoList:{
                value:newfileInfoList
            },
            pageList:{
                value:newpageList
            },
            showingPageList:{
                value:newshowingPageList
            }
        }))
    }

    const clear = () => {
        modelstatus(false)
        setfilestatus(false)
        filenames = []
        setshow({
            files:{
                value:new DataTransfer().files
            },
            fileInfoList:{
                value:[]
            },
            currentPage:{
                value:0
            },
            pageList:{
                value:[0]
            },
            showingPageList:{
                value:[]
            }
        });
        setuploadSuccess(false);
    }

    const upload = () => {
        if (!show.files.value) {
            return;
        }
        setuploading(true);
        uploadOdTesting(show.files.value,url);
    }
    
    const uploadOdTesting = (files, url) => {
        const formData = new FormData();

        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          formData.append('file', element); 
        }
        formData.append("task_type", tasktype);
        formData.append("upload_type", uploadfile)

        axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
            'Access-Control-Allow-Origin': '*', 
          },
          responseType: 'text',
        })
        .then(response => {
          console.log("Upload successful:", response);
          console.log(JSON.parse(response.data).err);
          if(!JSON.parse(response.data).err){
            setuploadSuccess(true);
            setfilestatus(true);
            setuploading(false);
          }
        })
        .catch(error => {
          setuploading(false);
          setfilestatus(false); 
          if (error.response) {
            console.log("Server responded with an error:", error.response);
          } else if (error.request) {
            console.log("No response received from server. Network error:", error.request);
          } else {
            console.log("Error in request setup:", error.message);
          }
        });
    };
    

    let html1 = show.showingPageList.value.map((list) => 
        <li
            class="page-item"
            onClick={(e) => changePage(e,`${list}`)}
        >
            <Link
                class={`page-link ${show.currentPage.value === list ? 'd' : 'f'}`}
            >
                {list}
            </Link>
        </li>
    )

    let html2 = show.fileInfoList.value.map((list) => 
        <tr key={list.index}>
            <th scope="row">{list.index}</th>
            <td>{list.name}</td>
            <td>{typeof(list.size) === 'undefined' ? list.size : list.size.toFixed(3)}</td>
            <td>{list.type}</td>
        </tr>
    );
    

    
    return(
        <Fragment>
            <div class="container-fluid m-0 p-0">
                {show.showingPageList.value.length>0  ? 
                <div class="row justify-content-end">
                    <div class="col-12 col-md-6">
                        {show.pageList.value.length > 1 ?
                        <nav aria-label="Page navigation example" >
                            <ul class="pagination justify-content-end">
                            {show.currentPage.value !== show.pageList.value[0] ?
                            <li
                                class="page-item"
                                onClick={(e) => changePage(e,show.currentPage.value - 1)}
                            >
                                <Link class="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only" >Previous</span>
                                </Link>
                            </li>
                            :
                            <></>
                            }
        
                            {html1}
                            {show.showingPageList.value.length > 0 && 
                            show.showingPageList.value[show.showingPageList.value.length - 1] !==
                            show.pageList.value[show.pageList.value.length - 1] ?
                            <li
                                class="page-item"
                                
                            >
                                <Link class="page-link disabled" aria-label="Next">
                                <span class="sr-only">...</span>
                                </Link>
                            </li>
                            :
                            <></>
                            }
                            {show.showingPageList.value.length > 0 && 
                            show.showingPageList.value[show.showingPageList.value.length - 1] !== 
                            show.pageList.value[show.pageList.value.length - 1] ?
                            <li
                                class="page-item"
                                
                            >
                                <Link class="page-link" aria-label="Next">
                                <span class="sr-only">{ show.pageList.value[show.pageList.value.length - 1] }</span>
                                </Link>
                            </li>
                            :
                            <></>
                            }
                            {show.currentPage.value !== show.pageList.value[show.pageList.value.length - 1] ?
                            <li
                                class="page-item"
                                onClick={(e) => changePage(e,show.currentPage.value + 1)}
                            >
                                <Link class="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only" >Next</span>
                                </Link>
                            </li>
                            :
                            <></>
                            }
                            </ul>
                        </nav>
                        :
                        <></>
                        }
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="d-grid">
                            <button class="btn btn-danger" onClick={clear} disabled={uploading} >
                            Clear
                            </button>
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="d-grid">
                            <button
                                class={`${uploadSuccess ? 'btn-success' : ''} btn btn-primary`}
                                onClick={upload}
                                disabled={uploading || uploadSuccess}
                            >
                            { uploadSuccess ? "Success" : <>{ uploading ? <span className="spinner-border spinner-border-sm" role="status"> </span>:"Upload"}</> }
                            
                            </button>
                        </div>
                    </div>
                </div>
                :
                <></>
                }
                
                {show.showingPageList.value.length>0 ?
                <div class="row mt-2" >
                    <div class="col-12">
                    <table class="table table-bordered">
                        <thead>
                        <tr class={`${uploadSuccess ? 'table-success' : ''}`} >
                            <th scope="col" style={{width: '10%'}}>#</th>
                            <th scope="col" style={{width: '50%'}}>Name</th>
                            <th scope="col" style={{width: '20%'}}>Size (MB)</th>
                            <th scope="col" style={{width: '20%'}}>Type</th>
                        </tr>
                        </thead>
                        <tbody
                            onDrag={(e) => onDrop(e)}
                            onDragOver={(e) => onDragOver(e)}
                            onDragLeave={(e) => onDragLeave(e)}
                        >
                        {html2}
                        </tbody>
                    </table>
                    </div>
                </div>
                :
                <></>
                }
                

                {show.showingPageList.value.length === 0 ?
                <div class="row" >
                    <div class="col-12">
                        <div class="input-group mb-3">
                            <input
                            type="file"
                            class="form-control"
                            multiple="true"
                            accept={accept}
                            onChange={(e) => onSelected(e)}
                            />
                        </div>
                    </div>
                    <div class="col-12">
                        <div
                            class={`${isDragOver ? 'drag-over' : ''} drag-drop-area`}
                            onDrop={(e) => onDrop(e)}
                            onDragOver={(e) => onDragOver(e)}
                            onDragLeave={(e) => onDragLeave(e)}
                        >
                            <p>Or drag and drop the files</p>
                        </div>
                    </div>
                </div>
                :
                <></>
                }
            </div>
        </Fragment>    
    );
}
export default UploadFile;