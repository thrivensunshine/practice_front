
let xAxis = []
let viceP = []
let board = []
let left = []
let joined = []
const quarters = [[1,2,3],[4,5,6],[7,8,9],[10,11,14]]

var url = "http://localhost:3000/employees"
var myUploadedFile = document.getElementById("myFile").files[0];


  // fetch the data 
  var getPost = async function () {
    var res = await fetch(url);
    var info = await res.json();
    // console.log(info)
    return info 
  };

  //assign fetch data to variable 
  async function retreiveData() {
    data = await getPost();
  }



document.addEventListener("DOMContentLoaded", () => {
    retreiveData()
  });

seperateEmp = () => {
console.log(data)

}


setData = () =>{
seperateEmp()

data.forEach(y => {
    console.log(y)
})

}

clickIt = () =>{
    
 
}