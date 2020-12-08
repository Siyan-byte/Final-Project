let min=-2;
let max=2;

window.addEventListener('load',()=> {
    document.getElementById('send-button').addEventListener('click', ()=> {
        let comments = document.getElementById('msg-input').value;
        console.log(comments);

        //creating the object 
        let obj = {"Text" : comments};

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route comments
        fetch('/comments', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

       
    })

      //get info on ALL the comments we've had so far from server
        fetch('/getcomments')
        .then(resp=> resp.json())
        .then(data => {
            document.getElementById('comments-info').innerHTML = '';
            console.log(data.data);
            
            for(let i=0;i<data.data.length;i++) {
                let textElt = document.createElement('a-text');
                textElt.setAttribute('value', data.data[i].comments);
                // textElt.setAttribute('position', "0,1,0");
                
                function getRandomArbitrary(min, max) {
                    return Math.random() * (max - min) + min;
                  }
                  
                textElt.setAttribute('position', {
                    x: getRandomArbitrary(min, max), 
                    y: getRandomArbitrary(min, max), 
                    z: getRandomArbitrary(min, max)});
                
                console.log(document.getElementById('scene'))
                document.getElementById('scene').prepend(textElt);
              }
        })
    })



  