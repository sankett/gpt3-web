const RenderData = (response) => {

    let prevData =""
    let eachData ="";
    let collected_events = [];
    for (let data of response.data) {
        console.log(data)
        prevData = data
        if(data === "\n"){
            
            if(prevData === "\n") {
                data = data.replace("\n","|")  
                eachData = "";
            }
            else{
                data = data.replace("\n","") 
                eachData += data;
                collected_events.push(eachData)
            }
        }
        else{            
            eachData += data;
        }
    }

    collected_events.pop();
    const finalArray =[]
    collected_events.forEach(element => {
        finalArray.push(JSON.parse(element.trim().replace("data:","")).choices[0].text)
    });
    const finaldata= finalArray.join("")
    return finaldata;

}

export default RenderData