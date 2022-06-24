const sortBy = property => {  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       return -1;
    }  
 }

 module.exports = sortBy;