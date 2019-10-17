var array = [4,7,1,4,5,9,1,6,7,6,9,1,4];
arrayfunction(array);

function arrayfunction(array)
{
        var CacheArray = new Array(3);
        var s=array.toString(); 
        console.log('Requested page sequence : ' +s);
        //fill the Cache for 1st 3 elements
        for(i = 0; i < 3; i++) 
        { 
            CacheArray[i] = array[i];
        } 
        var cachePrint=CacheArray.toString();
        //print cache array
        console.log('Cache Array : ' +cachePrint);
        //for remaining Page Array

        for(var i = 3; i < array.length; i++) 
        { 
          var newElement=array[i];
          //see for page in the Cache
           var availability = checkCache(CacheArray,newElement);
           console.log(availability);
           //if page fault occurs,insert the page in cache array (FIFO)
           if(availability===false)
           {
             cacheArray = updateCache(CacheArray,array[i]);
             cachePrint=cacheArray.toString();
            console.log('Cache Array after updating : ' +cachePrint);
           }
        }
}

function checkCache(CacheArray,newElement)
{
  var a =true;
    for(var i = 0; i < 3; i++)
    {
        if(CacheArray[i]==newElement)
        {
            console.log('Page found '+newElement);
            break;
        }
        else{
            console.log('Page fault at: '+newElement);
            a = false;
            break;
        }
       
    }return a;
}

function updateCache(CacheArray,newElement)
{
        CacheArray[0]=CacheArray[1];
     
        CacheArray[1]=CacheArray[2];
    
        CacheArray[2]=newElement;
   
        return CacheArray;   
     
} 

    // var array = prompt("Please enter the Array of Page Requests");
    //array.push() = document.getElementById("n").value;