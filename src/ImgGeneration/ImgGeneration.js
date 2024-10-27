import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

const ImgGeneration = () => {

    const img_gen = process.env.REACT_APP_TXT2IMG_PROCESS_DEMO;
    const [status, setStatus] = useState('default')
    const [iswidth, setiswidth] = useState('default')
    const [images, setImages] = useState([])
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
        e.preventDefault();
        const data = formData;

        try {
            setStatus('Generating');
            const response = await axios.post(img_gen, data);
            setImages(response.data.images);

        } catch (error) {
            console.error("Error generating images:", error)

        }
        
        setStatus('done')
    }

    useEffect(()=>{
        
        const width = window.innerWidth;
        
        if (width < 992) {
            setiswidth('smaller')
        }
        else {
            setiswidth('default')
        }

        const updateStyleBasedOnWidth = () => {
            const width = window.innerWidth;
        
            if (width < 992) {
                setiswidth('smaller')
            }
            else {
                setiswidth('default')
            }
        };
        
        window.addEventListener('resize', updateStyleBasedOnWidth);

        return () => {
            window.removeEventListener('resize', updateStyleBasedOnWidth)
        }
    },[])


    // useEffect(() => {
    //     console.log(images)
    // }, [images])
    function From(){
        return(
            <div className='col border ' style={{"border-radius": "var(--bs-border-radius)"}}>
                <form onSubmit={handleGenerate}>

                    {status === 'done'?
                        <>
                        {iswidth === 'smaller'?
                            <>
                                <div className='mt-2'>
                                    <label htmlFor="InputPrompt" className='form-label fw-bold'>Prompt </label>
                                    <input name="prompt" value={formData.prompt} onChange={handleChange} type='text' className='form-control' id="InputPrompt" placeholder="Please enter prompt for image generation" ></input>
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor="InputNegativePrompt" className='form-label fw-bold'>Negative Prompt</label>
                                    <input name="negative_prompt" value={formData.negative_prompt} onChange={handleChange} type='text' className='form-control' id="InputNegativePrompt" placeholder="Please enter negative prompt for image generation" ></input>
                                </div>
                            </>
                        :
                        <div class="row">
                            <div className='mt-2 col'>
                                <label htmlFor="InputPrompt" className='form-label fw-bold'>Prompt </label>
                                <input name="prompt" value={formData.prompt} onChange={handleChange} type='text' className='form-control' id="InputPrompt" placeholder="Please enter prompt for image generation" ></input>
                            </div>
                            <div className='mt-2 col'>
                                <label htmlFor="InputNegativePrompt" className='form-label fw-bold'>Negative Prompt</label>
                                <input name="negative_prompt" value={formData.negative_prompt} onChange={handleChange} type='text' className='form-control' id="InputNegativePrompt" placeholder="Please enter negative prompt for image generation" ></input>
                            </div>
                        </div>
                        }
                        </> 
                    :
                    <div className='row'>

                        <div className='mt-2'>
                            <label htmlFor="InputPrompt" className='form-label fw-bold'>Prompt </label>
                            <input name="prompt" value={formData.prompt} onChange={handleChange} type='text' className='form-control' id="InputPrompt" placeholder="Please enter prompt for image generation" ></input>
                        </div>
                        <div className='mt-5'>
                            <label htmlFor="InputNegativePrompt" className='form-label fw-bold'>Negative Prompt</label>
                            <input name="negative_prompt" value={formData.negative_prompt} onChange={handleChange} type='text' className='form-control' id="InputNegativePrompt" placeholder="Please enter negative prompt for image generation" ></input>
                        </div>

                    {/* Width & Batch size */}
                    <div className='col-6'>
                        <div className='mt-5'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label htmlFor="widthRange" className='mt-2 form-label fw-bold'>Width</label>
                                </div>
                                <div className='col-6'>
                                    <input name="width" value={formData.width} onChange={handleChange} type='number' className='form-control' ></input>
                                </div>
                            </div>
                            <input name="width" value={formData.width} onChange={handleChange} type='range' min="64" max="2048" className='form-range' id='widthRange'></input>
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className='mt-5'>
                            <div className='row'>
                                <div className='col-8'>
                                    <label htmlFor="BatchSizeRange" className='mt-2 form-label fw-bold'>Batch Size</label>
                                </div>
                                <div className='col-4'>
                                    <input name="batch_size" value={formData.batch_size} onChange={handleChange} type='number' className='form-control' ></input>
                                </div>
                            </div>
                            <input name="batch_size" value={formData.batch_size} onChange={handleChange} type='range' min="1" max="8" className='form-range' id='BatchSizeRange'></input>
                        </div>
                    </div>



                    {/* Height & Batch count */}
                    <div className='col-6'>
                        <div className='mt-5'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label htmlFor="heightRange" className='mt-2 form-label fw-bold'>Height</label>
                                </div>
                                <div className='col-6'>
                                    <input name="height" value={formData.height} onChange={handleChange} type='number' className='form-control' ></input>
                                </div>
                            </div>
                            <input name="height" value={formData.height} onChange={handleChange} type='range' min="64" max="2048" className='form-range' id='heightRange'></input>
                        </div>
                    </div>

                    {/* <div className='col-4'>
                    <div className='mt-5'>
                        <div className='row'>
                            <div className='col-8'>
                                <label  htmlFor="batchCountRange" className='mt-2 form-label fw-bold'>Batch Count</label>
                            </div>
                            <div className='col-4'>
                                <input type='number' className='form-control' ></input>
                            </div>
                        </div>
                        <input type='range' className='form-range' id='batchCountRange'></input>
                    </div>
                    </div> */}

                    </div>
                    }

                    <button type='submit' className='btn btn-primary btn-lg mt-3 mb-2' style={{position:'relative',left:"calc(100% - 120px)"}}>Generate</button>

                </form>
            </div>
        )
    }


    
    return (
        <div className={`${status === 'done'? '': 'd-flex'} container-fluid align-items-center my-4`}>
            <div className='mx-3 row w-100 ' >

                {status === 'done'?
                <>
                <div className='row'>
                    <From/>
                </div>

                {/* 右半部顯示內容*/}
                <div className='row'>
                    <div className={`mt-3 col border`} style={{ display: 'flex', flexWrap: 'wrap',"border-radius": "var(--bs-border-radius)" }}>
                        {images.map((base64, index) => (
                            <div key={index} style={{ flex: '1 0 50%', maxWidth: '50%', padding: '10px' }}>
                                <img src={`data:image/png;base64,${base64}`} alt={`Generated ${index}`} className='img-fluid' style={{ width: '100%', height: 'auto' }} />
                            </div>
                        ))}
                    </div>
                </div>
                </>
                :
                <>

                {iswidth==='smaller'?
                <>
                    <div className='row'>
                        <From/>
                    </div>

                    <div className='row'>
                        {/* 右半部顯示內容*/}
                        <div className={`mt-3 col border d-flex align-items-center justify-content-center`} 
                            style={{"border-radius": "var(--bs-border-radius)",backgroundColor:"#f1f3f4"}}>
                            {status === 'default'?
                            'No images'
                            :
                            <></>
                            }
                            {status === 'Generating'?
                            <>
                                <div className="spinner-border " role="status">
                                    <span className="visually-hidden ">Loading...</span>
                                </div>
                                <div>
                                    <p className="mt-3 ms-3">Generating...</p>
                                </div>
                            </>
                            :
                            <></>
                            }
                        </div>
                    </div>
                </>
                
                :
                <>
                <From/>

                {/* 右半部顯示內容*/}
                <div className={`ms-3 col border d-flex align-items-center justify-content-center`} 
                    style={{"border-radius": "var(--bs-border-radius)",backgroundColor:"#f1f3f4"}}>
                    {status === 'default'?
                    'No images'
                    :
                    <></>
                    }
                    {status === 'Generating'?
                    <>
                        <div className="spinner-border " role="status">
                            <span className="visually-hidden ">Loading...</span>
                        </div>
                        <div>
                            <p className="mt-3 ms-3">Generating...</p>
                        </div>
                    </>
                    :
                    <></>
                    }
                </div>
                </>
                }
                </>
                }
                
            </div>
        </div>
    )

}

export default ImgGeneration
