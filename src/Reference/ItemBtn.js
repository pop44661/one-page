import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './ItemBtn.module.css';

const ItemBtn = (props) => {
    const {Value,btn3click,handleBtn3Click}=props

    const [show,setshow]=useState(false)
    const [visible, setVisible] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(Value) 
        .then(() => {
            setVisible(true)
            console.log('復制成功！'); 
        })
          .catch(err => {
            console.error('復制失敗!', err); 
        });

        setTimeout(() => {
            setVisible(false);
        }, 1500);
    };

    const click = () => {
        setshow(!show)
        handleBtn3Click();
    };

    return( 
        <>
            {visible && (
                <div style={{
                position: 'fixed',
                top: 'calc(100vh - 60px)',
                left: '60px',
                backgroundColor: '#3e3e3e',
                color: '#f1f3f4',
                padding: '10px',
                borderRadius: '5px',
                zIndex: '6',
                fontWeight:'bold'
                }}>
                複製成功！
                </div>
            )}
            <div className={styles.btn3loc}>
                <div className={styles.grid3}>
                    <button className={`${styles[`icon3${btn3click?'dark':''}`]}`} onClick={handleCopy}>content_copy</button>
                    <button className={`${styles[`icon3${btn3click?'dark':''}`]} ${styles.tag}`} onClick={(e) => setshow(!show)}>more_vert</button>
                </div>
            </div>
            <div className='mt-2'></div>
            <div className={`${styles[`btn3${show?'show':'hide'}`]} ${btn3click?styles.dark:''}`}>
                <div className={styles.grid4}>
                    <button className={`${styles[`icon3${btn3click?'dark':''}`]}`} onClick={click}>brightness_medium</button>
                    <Link 
                    className={`dropdown-item ${styles.btn3text} ${btn3click?styles.dark:''}`}
                    onClick={click}
                    >Dark code theme</Link>
                </div>
            </div>
            <pre className={`${styles.pretext} ${btn3click?styles.dark:''}`}>{Value}</pre>
        </>    
    )
};

export default ItemBtn;