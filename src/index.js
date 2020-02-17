
let years = []
let workingInQuarter = []
let startYears =[]
let leftYears =[]
let boardMembersJoined = []
let presidentJoined = []
let boardLeft = []
let presidentLeft = [{x:0, y:0}]
let test = []
let data = []
var url = "http://localhost:3000/people"
var myUploadedFile = document.getElementById("myFile").files[0];


  // fetch the data 
  var getPost = async function () {
    var res = await fetch(url);
    var info = await res.json();
    console.log(info)
    return info 
  };

  //assign fetch data to variable 
  async function retreiveData() {
    data = await getPost();
  }

  //
 
  setData = () => {
 
      yearsW = data.years_working
      //get the x axis (into array)
      yearsW.forEach(e => years.push(e[0]))

      //get the number of employees working in each quarter into array 

      yearsW.forEach(e => workingInQuarter.push(e[1]))
      


      //create arrays to hold the start dates and left dates with correct index number
      years.forEach(e => startYears.push(0))
      years.forEach(e => leftYears.push(0))
  
      //ensure the years (xaxis) is in the correct order
      yearSort = years.sort((a,b) => a-b)

      //get the amount of employees joing 
      data.employees.forEach((e)=> plotItPlus(e,startYears))

      //get the amount of employees leaving 
      data.employees.forEach((e)=> plotItMinus(e,leftYears))

      // plot the head positons start dates 
      data.board.forEach((b)=> {
        title = b[1].toLowerCase()
        let y = boardMembersJoined.length 
        let y2 = presidentJoined.length

        //get he CxO members  
        if(!title.includes("vp") && !title.includes("vice")  && !title.includes("board") || title.includes("chief")){
          scatterPlot(b,boardMembersJoined,1,(y * 10)+ 5 )
        }   
        //get the president positions
        if(title.includes("vp") || title.includes("vice")  && !title.includes("board")){
          scatterPlot(b,presidentJoined,1,(y2 * 10) +10)
        }   
      })
      //plot the head positions left dates 
      data.board.forEach((b) => {
        title = b[1].toLowerCase()
        let y = boardLeft.length 
        let y2 = presidentLeft.length
        if(!title.includes("vp") && !title.includes("vice")&& !title.includes("board")&& !title.includes("Current Employee")){
          scatterPlotMinus(b,boardLeft,2,(y * 10)+ 5 )
        }   
        if(title.includes("vp") || title.includes("vice")  && !title.includes("board")&& !title.includes("Current Employee")){
          scatterPlotMinus(b,presidentLeft,2,(y2 * 10) +10)
        }   
      })
     
      //execute the chart function 
      if(boardLeft.length == 0){
        boardLeft =  [{x:0, y:0}]
      }


      console.log(presidentLeft)
      executeChart()
  }


  executeChart = () => {

  Chart.defaults.global.defaultFontSize = 8;
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    plugins: [ChartDataLabels],

    type: 'bar',

    data: {
      labels: yearSort.sort(),
      datasets: [
        
        { 
          label: "# Hired in Quarter",
          data: startYears.slice(0, years.length),
          borderColor: "#15831D",
          backgroundColor: "#15831D",
          backgroundColorHover: "#91D896",
          // fill: false,
          
        },
        { 
          data: workingInQuarter,
          label: "# of working employees",
          backgroundColor: "#3e95cd",
          borderColor: "#3e95cd",
          fill: false,
          order: 1,
          type: 'line'
        },

        { 
          data: leftYears,
          label: "employees left in quarter",
          borderColor: "#C70039",
          backgroundColor:"#C70039",
          // fill: false
        },

        { 
          data: boardMembersJoined,
          label: "Chief Officers hired",
          borderColor: "#0E4421",
          fill: false,
          
          // pointStyle: 'circle',
          type: 'bubble',
          datalabels: {
            anchor: 'start',
            align: 'right',
            color: 'green'
            // rotation: -12
        }
        },
        {
          data: presidentJoined,
          label: "VPs hired",
          borderColor:" #00ff00",
          fill: false,
          
          pointStyle: 'triangle',
          type: 'bubble',
          datalabels: {
            // offset: "center",
            anchor: 'start',
            align: 'right',
            color: 'green'
        }

        },
        
      ]
    },
   
  });
  }



// ----------------- helper functions ------------------

  whichIndex = (string, num) => {
    let split = string[num].split("-")
      if(split[1] !== "00"){
        let qrt = Math.ceil((parseInt(split[1]))/3)
        let str = `Q${qrt}`
        let year = split[0]
        let together = `${year} ${str}`
          if(yearSort.includes(together)){
            myInd = yearSort.indexOf(together)           
          }
      }
    return myInd
  }
  
  plotItPlus = (data, array) => {
    if(data[2]){
      array[whichIndex(data,2)] +=1 
    }
  }
  
  plotItMinus = (data, array) => {
    if(data[3] && data[3] !== "Current Employee" ){
      array[whichIndex(data,2)] -=1
    }   
  }
  
  scatterPlot = (data, array, num, ya) => {
    if(data[num]){
      array.push({x: whichIndex(data,num), y: ya,r:5, label: `${data[0]} ${data[1]}`})
      // 
      // console.log(ya)
    }
  }

  scatterPlotMinus = (data, array, num, ya) => {
    if(data[num]){
      array.push({x: -(whichIndex(data,num)), y: ya,r:5, label: `${data[0]} ${data[1]}`})
      // console.log(ya)
    }
  }
  
// ----------------- helper functions ------------------