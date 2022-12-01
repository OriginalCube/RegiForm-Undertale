import React from 'react'
import Typewriter from 'typewriter-effect';

const Loading = (props) => {
    const [read, setRead] = React.useState(0);
    const action = (e) =>{
        if(e==='form'){
            setRead(2);
        }else if(e==='read'){
            setRead(1);
        }
    }

    const audioPlay = () =>{
        const audio = new Audio('./dialogue.mp3');
        audio.volume = .5;
        audio.play();
    }

    React.useEffect(()=>{
        if(read===2){
            props.setLoading(false);
        }
    },[read])
  return (
    <div className='absolute h-full w-full text-3xl' style={{textAlign:'center'}}>
        <span style={{position:'relative', top:'25%', display:read===0?'block':'none'}}><Typewriter
            options={{
            strings: 'Hello!',
            autoStart: true,
        }}/></span>
        <span style={{fontSize: '5rem', position:'relative', top:'28%', display:read===0?'block':'none'}}>
        <Typewriter
            options={{
            strings: 'Welcome to my Registration Form!',
            autoStart: true,
        }}/>
        </span>

        {read===1?<span style={{fontSize: '5rem', position:'relative', top:'20%', width:'80%',}}>
        <div className='largeText'><Typewriter
            options={{
            strings: 'You need to dodge the box or they will hurt you. You can use W A S D to dodge. Moving around will also hurt the boss so move consistently. Goodluck challenger you will need it!',
            autoStart: true,
            delay: 65,
        }}/>
       </div> </span> :null}
        <div className='loadingOption' style={{display:read===0?'block':'none'}}>
            <p className='loadingButton' onClick={()=>action('form')} style={{marginLeft: '0%'}}>Register form</p>
            <p className='loadingButton' onClick={()=>action('read')}>Read Text</p>
        </div>
            {read===1?<p className='loadingButton relative' style={{top:'28%', marginLeft:'0%'}} 
            onClick={()=>action('form')}>Registration Form</p>:null}
    </div>
  )
}

export default Loading