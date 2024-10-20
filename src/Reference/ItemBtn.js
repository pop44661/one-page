import './ItemBtn.css';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const ItemBtn = (props) => {
    const {Value,btn3click,handleBtn3Click}=props

    const [show,setshow]=useState(false)


    const handleCopy = () => {
        navigator.clipboard.writeText(Value) 
          .then(() => {
            console.log('复制成功！'); 
          })
          .catch(err => {
            console.error('复制失败:', err); 
          });
      };

    const click = () => {
        setshow(!show)
        handleBtn3Click();
    };

    return( 
        <>
            <div class='btn3loc'>
                <div class='grid3'>
                    <button class={`icon3${btn3click?'dark':''}`} onClick={handleCopy}>content_copy</button>
                    <button class={`icon3${btn3click?'dark':''} tag`} onClick={(e) => setshow(!show)}>more_vert</button>
                </div>
            </div>
            <div class='mt-2'></div>
            <div class={`btn3${show?'show':'hide'} ${btn3click?'dark':''}`}>
                <div class='grid4'>
                    <button class={`icon3${btn3click?'dark':''}`} onClick={click}>brightness_medium</button>
                    <Link 
                    class={`dropdown-item btn3text ${btn3click?'dark':''}`}
                    onClick={click}
                    >Dark code theme</Link>
                </div>
            </div>
            <pre class={`pretext ${btn3click?'dark':''}`}>{Value}</pre>
        </>    
    )
};

export default ItemBtn;