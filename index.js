




let btn = document.getElementById('file1'),
    btn1 = document.getElementById('file2'),
    btn2 = document.getElementById('file3'),
    fleft = document.getElementById('fleft'),
    fright = document.getElementById('fright'),
    file1 = {
        labels : [],
        data : [],
        path : '',
        ret : undefined,
        position : []
    },
    file2 = {
        labels : [],
        data : [],
        path : '',
        ret : undefined,
        position : []
    },
    file3 = {
        labels : [],
        data : [],
        path : '',
        ret : undefined,
        position : []
    },
    pathToSave = '',
    pastLabel = undefined,
    range = 0,

    chart1Labels = [],
    chart1DataSet = [],
    colorsSet = ['red','green','blue','pink','lightgreen','lightblue','green','green','green','green','green','green','green','green','green','green','green','green','green'],
    graph = {
        range : 60,
        start : 0,
        lines : 0
    };

    fright.addEventListener('click', function(event) {
        if (1 == 1) {
            graph.start = graph.start + graph.range
            chart.config.data.labels = [];
            for (let j = graph.start; j< (graph.start + graph.range); j++) {
                chart.config.data.labels.push(chart1Labels[j])
            }
            chart.config.data.datasets.forEach(function(item,i) {
                item.data = []
            for (let j = graph.start; j< (graph.start + graph.range); j++) {
                item.data.push(chart1DataSet[i][j])
            }
            
            })


            chart.update()
            console.log(chart1DataSet)
        }

    })

    fleft.addEventListener('click', function(event) {
        if (1 == 1) {
            graph.start = graph.start - graph.range
            chart.config.data.labels = [];
            for (let j = graph.start; j< (graph.start + graph.range); j++) {
                chart.config.data.labels.push(chart1Labels[j])
            }
            chart.config.data.datasets.forEach(function(item,i) {
                item.data = []
            for (let j = graph.start; j< (graph.start + graph.range); j++) {
                item.data.push(chart1DataSet[i][j])
            }
            })


            chart.update()
        }
       
    })

const { dialog } = require('electron').remote
var path = require("path");
let iconv = require('iconv-lite')
var fs = require("fs");
var Chart = require('chart.js');


    let aa = document.getElementById('aa')

    aa.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);

aa.addEventListener("drop", function(event) {
    
    event.preventDefault();
    var i = 0,
     files = event.dataTransfer.files,
     len = files.length;
     for (; i < len; i++) {
          console.log("Filename: " + files[i].name);
          console.log("Type: " + files[i].type);
          console.log("Size: " + files[i].size + " bytes");
          console.log(files[i]);
     }
}, false);


    

btn.addEventListener('click', function(event) {
    dialog.showOpenDialog({ properties: ['openFile'] }).then(val => {
        

        file1.path = val.filePaths[0]; 
        file1.ret = readF(file1,2)
        
        file1.position.forEach(function(item,i){
            if (file2.position.length > 0) {
                file2.position.forEach(function(item1,i1) {
                    file2.position[i1] = file2.position[i1] - 1
                    
                })
            }
            chart.config.data.datasets.splice(file1.position[0],1)
            chart1DataSet.splice(file1.position[0],1)
        })

        file1.data = [];
        file1.labels = [];
        file1.position = [];
        file1.labels = file1.ret[2] 



        file1.ret[0].forEach(function(item,i) {
            
            file1.data.push([])
            file1.data[file1.data.length-1] = file1.ret[1][i]
            chart1DataSet.push(file1.data[i])
            
           
            
            file1.position.push(chart.config.data.datasets.length)
            chart.config.data.datasets.push({
                label : item,
                borderColor : colorsSet[chart1DataSet.length-1],
                data : [],
                fill : false
                })
            chart.config.options.elements.point.radius = 1
            for (let j1=graph.start; j1< (graph.start + graph.range); j1++) {
                chart.config.data.datasets[chart.config.data.datasets.length - 1].data.push(chart1DataSet[chart1DataSet.length-1][j1])
            }
        })

    if (file1.labels.length > chart1Labels.length) {
        chart1Labels = [];
        chart.config.data.labels = []
        file1.labels.forEach(function(item,i) {
            chart1Labels.push(item)
        })
        
        

        
        for (let j=graph.start; j<graph.range;j++) {
            chart.config.data.labels.push(chart1Labels[j])
        }
           
    }
    
    chart.config.data.datasets.forEach(function(item,i) {
        item.borderColor = colorsSet[i]
    })
    chart.update()
    

        })
})

btn1.addEventListener('click' , function(event) {
    dialog.showOpenDialog({ properties: ['openFile'] }).then(val => {


        file2.path = val.filePaths[0]; 
        file2.ret = readF(file2,2)
        
        file2.position.forEach(function(item,i){
            if (file1.position.length > 0) {
                file1.position.forEach(function(item1,i1) {
                    file1.position[i1] = file1.position[i1] - 1
                    
                })
            }
            chart.config.data.datasets.splice(file2.position[0],1)
            chart1DataSet.splice(file2.position[0],1)
        })

        file2.data = [];
        file2.labels = [];
        file2.position = []
        file2.labels = file2.ret[2]


        file2.ret[0].forEach(function(item,i) {
            
            file2.data.push([])
            file2.data[file2.data.length-1] = file2.ret[1][i]


            chart1DataSet.push(file2.data[i])         
        
            file2.position.push(chart.config.data.datasets.length)
            chart.config.data.datasets.push({
                label : item,
                borderColor : colorsSet[chart1DataSet.length-1],
                data : file2.data[i],
                fill : false
                })
            chart.config.options.elements.point.radius = 1
        })

    if (file2.labels.length > chart1Labels.length) {
        chart1Labels = [];
        chart.config.data.labels = []
        file2.labels.forEach(function(item,i) {
            chart1Labels.push(item)
        })
        
        

        
        for (let j=graph.start; j<graph.range;j++) {
            chart.config.data.labels.push(chart1Labels[j])
        }
            
    }
    
    chart.config.data.datasets.forEach(function(item,i) {
        item.borderColor = colorsSet[i]
    })
    chart.update()
    
        })
})

btn2.addEventListener('click' , function(event) {
    dialog.showOpenDialog({ properties: ['openFile'] }).then(val => {
        pathh = val; 
        console.log(pathh.filePaths[0])
        readF()
        })
})




function readF (file, option) {
    let ret = fs.readFileSync(file.path,'utf8'),
// console.log(iconv.decode(aa, 'utf8' )) 
        arr = ret.split('\n'),
        len = arr[0].split(';'),
        obj = {},
        collectName = [],
        collectData = [],
        collectLabels = [],
        step,
        b1;
        if (len.length < 2) {
            len = arr[0].split(',');
        }
        len = len.length;
        
    arr.forEach(function(item,i) {
        let b = item.split(';')
        if (b.length <2) {
            b = item.split(',')
        }

        b.forEach(function(item1,i1) {

            if (i == 0 && i1 != 0) {
                collectName.push(item1)
                collectData.push([])
            }

            if (i == 1 && i1 != 0 ) {
                collectName[i1-1] = collectName[i1-1] + '(' + item1 + ')'
            }

            if (i > 1 && i1 == 0) {
                if (item != '' && item != undefined) {
                b1 = parseInt( item1.split(' ')[1].split(':')[0] );
                
                
                if (pastLabel != undefined && ((pastLabel+1) != b1) ) {
                    if (b1 == 0) {
                        b1 = 24
                    }
                    range = b1 - pastLabel 

                    if (b1 == 24) {
                        b1 = 0
                    }
                    pastLabel = b1

                }

                // if (i < 10) {
                //     console.log('range',range)
                //     console.log('b1',b1)
                //     console.log('pastLabel',pastLabel)
                //     }

                if (pastLabel == undefined || i > 2) {
                    pastLabel = b1
                }
                
                }
                
            }

            
            
            if ( (i > 1) && (i1 > 0) && ( range > 0)) {
                
                if (option == 1) {
                step =  (parseFloat(item1) - parseFloat(collectData[i1-1][collectData[i1-1].length-1])) / parseFloat(range)
                }
                if (option == 2) {
                    step = 0
                }
               
                    for (let j=0; j < (range - 1); j ++) {
                        collectData[i1-1].push( parseFloat((collectData[i1-1][collectData[i1-1].length-1]) + step).toFixed(2) )
                     }
            }


            if (i > 1 && i1 == 0 && range > 0 && item1 != undefined && item1 != '') {
                let hr;
                    for (let j=0; j < (range - 1); j ++) {

                        let lblArr = collectLabels[collectLabels.length-1].split(' ');
               
                    hr = lblArr[1].split(':');
                    hr[0] = parseInt(hr[0]) + 1

                    if (parseInt(hr[0]) < 10) {
                        hr[0] = '0' + hr[0]
                        hr[0] = parseInt(hr[0])
                    }

                    let str = lblArr[0] + ' ';
                    
                    hr.forEach(function(item2,i2) {
                        if (i2 == 0) {
                            str = str + item2
                        } else {
                            str = str + ':' + item2
                        }
                    })

                        collectLabels.push( str )
                        hr[0] = hr[0] + 1
                    } 
            }
            if (i > 1 && i1 > 0) {
            collectData[i1-1].push(parseFloat(item1))
            }
            if (i > 1 && i1 == 0) {
                collectLabels.push(item1)
            }

            
        })
        
    range = 0
        
    })

    pastLabel = undefined
    range = 0

    return [collectName,collectData,collectLabels]

    

}




let obj = [1,'',25,37,4,5,'',0,'',25,37,4,5,66,0,1,25,37,4,5,66,25,17,0,1,25,37,4,5,66]

var ctx = document.getElementById('trand1').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: []
        
    },
    options: {
       
    }
});




var ctx1 = document.getElementById('trand2').getContext('2d');

var chart1 = new Chart(ctx1, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'FT1',
            borderColor: 'rgb(255, 99, 132)',
            data: obj,
            fill:false
        }]
    },
    options: {  }
});


