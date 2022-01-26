import React,{useState} from 'react';
// import { Axios } from 'axios';
import axios from 'axios';

var s='';
var print='';

const Http = () => {

    const [getu,getUrl]=useState();
    const [input,setInput]=useState();

    if(getu!==undefined)
    {
        document.getElementById('result').innerHTML = JSON.stringify(getu, undefined, 2)
    }

    function makeRequest()
    {
        getUrl(undefined)
        document.getElementById('result').innerHTML = '';
        var url="http://localhost:8081/"
        s=document.getElementById('s').value;
        if(s==='get')
        {
            fetch(input)
            .then((res)=>res.json())
            .then((json)=>getUrl(json))   
            .catch(getUrl("enter a valid url")) 
        }
        if(s==='post')
        {    
            const postreqr = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            axios(input,postreqr)
            .then((res)=>getUrl(res.data))
            .catch(getUrl("enter a valid url"))
            
        }
        if(s==='put')
        {
            const postreqr = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            };
            axios(input,postreqr)
            .then((res)=>getUrl(res.data))
            .catch(getUrl("enter a valid url"))
        }
    }

    return (
        <div>
            <div className="above">
                <p>Get syntax  : http://localhost:8081/</p>
                <p>Post syntax : http://localhost:8081?user=abc</p>
                <p>Put syntax  : http://localhost:8081/userName</p>
            </div>
            <div className="middle">
                <select name="req" id="req" id="s">
                    <option value="get" >Get</option>
                    <option value="post">Post</option>
                    <option value="put">Put</option>   
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input placeholder="http://localhost:8081/" value={input} onChange={(e)=>{setInput(e.target.value)}}></input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={makeRequest}>DISPLAY</button>   
            </div>
            <br></br><br></br>
            <div className="below">
                <p id="result"></p>
            </div>
        </div>
    )
}

export default Http
