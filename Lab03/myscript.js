$(document).ready(function() {
    $('#submit-btn').click(function() {
        console.log('click on submit button');
    });
  
    $.ajax({
        url: "data.json",
        dataType: "json"
    }).done(function(response) {
        console.log(response);
        response.forEach(element => {
            console.log(element.name, element.age);
        });
    });
  
  
    $.getJSON("data.json",function(data){
        var bookData = '';
        $.each(data, function(key,value){
            bookData += '<tr>';
            bookData += '<td id=td-rank>' + value.rank+ '</td>';
            bookData += '<td id=td-image>' +'<img src=' +value.imagePath+" "+'class="img-fluid" alt="Responsive image"'+'>' +'</td>';
            bookData += '<td id=td-bookName>' + value.bookName+ '</td>';
            bookData += '<td id=td-authorName>' + value.authorName+ '</td>';
            bookData += '<td id=td-review>' + value.review+ '</td>';
            bookData += '<td id=td-publisher>' + value.publisher+ '</td>';
            bookData += '<td id=td-numPage>' + value.numPage+ '</td>';
            bookData += '<td id=td-price>' + value.price+ '</td>';
            bookData += '<td id=link>' +'<a href='+value.link+'>'+"click"+'</a>'+'</td>';
            bookData += '</tr>';
  
        });
        $('#bookTable-body').append(bookData);
    })


    $("#submit-simple-btn").click(function(){
        var input = document.getElementById("simple-input-text");
        var filter = input.value.toLowerCase();
        var table = document.getElementById("bookTable");
        var tr = table.getElementsByTagName("tr");
        var td, i, txtValue;
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[2];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          } 
        }
    })


    $("#submit-advance-btn").click(function(){
        
        //Declare main values
        var table = document.getElementById("bookTable");
        var tr = table.getElementsByTagName("tr");  
        var td, i, txtValue;
        var matchingRows = new Array(); 
        var n=0;
        var isFirstSearchBlockYet = false;        
        var isError=false;
       

        //declare Rank values
        var inputRankStart = document.getElementById("rank-input-text-start").value;
        var filterRankStart = parseInt(inputRankStart);
        var inputRankEnd = document.getElementById("rank-input-text-end").value;
        var filterRankEnd = parseInt(inputRankEnd);
        var isRankEmpty=false;
        
        //check rank input 
        if(inputRankStart=="" && inputRankEnd==""){
            isRankEmpty=true;}
        else if(inputRankStart==""){ filterRankStart=1;}
        else if(inputRankEnd==""){ filterRankEnd=filterRankStart;}
        if(filterRankStart > filterRankEnd  || filterRankEnd > 100 || filterRankStart <1){
            isError=true;
        }

        //declareBookNameValues
        var inputBookName = document.getElementById("bookname-input-text");
        var filterBookName = inputBookName.value.toLowerCase();
        var isBookNameEmpty=false;      
        if(filterBookName==""){isBookNameEmpty=true;}

        //declareAuthorValues
        var inputAuthor = document.getElementById("author-input-text");
        var filterAuthor = inputAuthor.value.toLowerCase();
        var isAuthorEmpty=false;      
        if(filterAuthor==""){isAuthorEmpty=true;}

        //declarePublisherValues
        var inputPublisher = document.getElementById("publisher-input-text");
        var filterPublisher = inputPublisher.value.toLowerCase();
        var isPublisherEmpty=false;      
        if(filterPublisher==""){isPublisherEmpty=true;}
        

        //Declare Npage values
        var inputNpageStart = document.getElementById("npage-input-text-start").value;
        var filterNpageStart = parseInt(inputNpageStart);
        var inputNpageEnd = document.getElementById("npage-input-text-end").value;
        var filterNpageEnd = parseInt(inputNpageEnd);
        var isNpageEmpty=false;
        
        //check Npage input
        if(inputNpageStart=="" && inputNpageEnd==""){
            isNpageEmpty=true;
        }
        else if(inputNpageStart==""){ 
            filterNpageStart=1;
        }
        else if(inputNpageEnd==""){ 
            filterNpageEnd = filterNpageStart;
        }
        if(filterNpageStart > filterNpageEnd  || filterNpageEnd > 10000 || filterNpageStart <1)
        {isError=true;} 


        //Declare Price values
        var inputPriceStart = document.getElementById("price-input-text-start").value;
        var filterPriceStart = parseFloat(inputPriceStart);
        var inputPriceEnd = document.getElementById("price-input-text-end").value;
        var filterPriceEnd = parseFloat(inputPriceEnd);
        var isPriceEmpty=false;
           
        //check price input
        if(inputPriceStart=="" && inputPriceEnd==""){isPriceEmpty=true;}
        else if(inputPriceStart==""){ filterPriceStart=1;}
        else if(inputPriceEnd==""){ filterPriceEnd=filterPriceStart;}
        if(filterPriceStart > filterPriceEnd  || filterPriceEnd > 10000 || filterPriceStart <1)
        {isError=true;}


        //Check Type Input
        /*
       alert(
        ";\n\nInputRankStart:"+inputRankStart+"InputRankEnd:"+inputNpageEnd+
        ";\nFilterRankstart:"+filterRankStart+"FilterRankEnd:"+filterRankEnd
        +
        ";\n\nInputBookName:"+inputBookName+
        ";\nFilterBookName:"+filterBookName
        +
        ";\n\nInputAuthor:"+inputAuthor+
        ";\nFilterAuthor:"+filterAuthor
        +
        ";\n\nInputPublisher:"+inputPublisher+
        ";\nFilterPublisher:"+filterPublisher
        +
        ";\n\nInputNpagestart:"+inputNpageStart+"InputNPageEnd:"+inputNpageEnd+
        ";\nFilterNpagestart:"+filterNpageStart+"FilterNpageEnd:"+filterNpageEnd
        +
        ";\n\nInputPricestart:"+inputPriceStart+"InputPriceEnd:"+inputPriceEnd+
        ";\nFilterPricestart:"+filterPriceStart+"FilterPriceEnd:"+filterPriceEnd
        ); 
        */

        //Show every element on table if didn't search anything
        var state =
        (isRankEmpty && isBookNameEmpty && isAuthorEmpty && isPublisherEmpty
            && isNpageEmpty && isPriceEmpty);

            
        document.getElementById("rank-input-text-start").value="";
        document.getElementById("rank-input-text-end").value="";
        document.getElementById("bookname-input-text").value=""; 
        document.getElementById("author-input-text").value="";
        document.getElementById("publisher-input-text").value=""; 
        document.getElementById("npage-input-text-start").value="";
        document.getElementById("npage-input-text-end").value="";
        document.getElementById("price-input-text-start").value="";
        document.getElementById("price-input-text-end").value="";       

            
//SEARCH  FUNCTION

//Search Rank
        if(!isError && !isRankEmpty && !isFirstSearchBlockYet){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = parseInt(td.textContent || td.innerText);
                    if (txtValue >= filterRankStart && txtValue <= filterRankEnd) {
                        matchingRows[n] = i;
                        n=matchingRows.length;
                        isFirstSearchBlockYet = true;   
                        tr[i].style.display = "none";
                    }
                    else{
                        tr[i].style.display = "none";
                    }
                } 
            }
        }

    
//Search BookName
        if(!isError && !isBookNameEmpty && !isFirstSearchBlockYet){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[2];
                
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toLowerCase().indexOf(filterBookName) > -1) {
                        matchingRows[n] = i;n=matchingRows.length;
                        isFirstSearchBlockYet = true; 
                        tr[i].style.display = "none";  
                    }
                    else{
                        tr[i].style.display = "none";
                    }
                } 
            }
        }

        else if(!isError && !isBookNameEmpty && isFirstSearchBlockYet){
            i=0;var index; var isNotEndIndex=true;
            while(isNotEndIndex){
                index=matchingRows[i];
                td = tr[index].getElementsByTagName("td")[2];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toLowerCase().indexOf(filterBookName) == -1) {
                        matchingRows.splice(i,1);
                    }
                    else{
                            i+=1;
                    }
                    if(matchingRows.length==i){
                            isNotEndIndex=false;
                    }
                }
            }
        }
//Search Author
        if(!isError && !isAuthorEmpty && !isFirstSearchBlockYet){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[3];
                
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toLowerCase().indexOf(filterAuthor) > -1) {
                        matchingRows[n] = i;n=matchingRows.length;
                        isFirstSearchBlockYet = true;
                        tr[i].style.display = "none";   
                    }
                    else{
                        tr[i].style.display = "none";
                    }
                } 
            }
        }

        else if(!isError && !isAuthorEmpty && isFirstSearchBlockYet){
            i=0;var index;var isNotEndIndex=true;
            while(isNotEndIndex){
                index= matchingRows[i];
                td = tr[index].getElementsByTagName("td")[3];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toLowerCase().indexOf(filterAuthor) == -1) {
                        matchingRows.splice(i,1);
                    }
                    else{
                            i+=1;
                    }
                    if(matchingRows.length==i){
                            isNotEndIndex=false;
                    }
                }
            }
        }

        //Search Publisher
        if(!isError && !isPublisherEmpty && !isFirstSearchBlockYet){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[5];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toLowerCase().indexOf(filterPublisher) > -1) {
                        matchingRows[n] = i;n=matchingRows.length;
                        isFirstSearchBlockYet = true;   
                        tr[i].style.display = "none";
                    }
                    else{
                    tr[i].style.display = "none";
                    }
                } 
            }
        }

        else if(!isError && !isPublisherEmpty && isFirstSearchBlockYet){
            i=0;var index;var isNotEndIndex=true;
            while(isNotEndIndex){
                index=matchingRows[i];
                td = tr[index].getElementsByTagName("td")[5];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toLowerCase().indexOf(filterPublisher) == -1) {
                        matchingRows.splice(i,1);
                    }
                    else{
                            i+=1;
                    }
                    if(matchingRows.length==i){
                            isNotEndIndex=false;
                    }
                }
            }
        }


        //Search nPage
        if(!isError && !isNpageEmpty && !isFirstSearchBlockYet){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[6];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    txtValue = parseInt(txtValue);
                    if (txtValue>=filterNpageStart && txtValue <= filterNpageEnd ) {
                        matchingRows[n] = i;
                        n=matchingRows.length;
                        isFirstSearchBlockYet = true; 
                        tr[i].style.display = "none";  
                    }
                    else{
                        tr[i].style.display = "none";
                    }
                } 
            }
        }

        else if(!isError && !isNpageEmpty && isFirstSearchBlockYet){
            i=0;var isNotEndIndex=true;var index;
            while(isNotEndIndex){
                index = matchingRows[i];
                td = tr[index].getElementsByTagName("td")[6];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    txtValue = parseInt(txtValue);
                    if (txtValue<filterNpageStart || txtValue > filterNpageEnd ) {
                        matchingRows.splice(i,1);
                    }
                    else{
                            i+=1;
                    }
                    if(matchingRows.length==i){
                            isNotEndIndex=false;
                    }
                }
            }
        }

        //Search price
        
        if(!isError && !isPriceEmpty && !isFirstSearchBlockYet){
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[7];
                if (td) {
                    txtValue = td.textContent || td.innerText ;
                    txtValue = td.parseFloat(txtValue); 
                    if (filterPriceStart <= txtValue && txtValue <= filterPriceEnd ) {
                        matchingRows[n] = i;
                        n=matchingRows.length;
                        isFirstSearchBlockYet = true; 
                        tr[i].style.display = "none";  
                    }
                    else{
                    tr[i].style.display = "none";
                    }
                } 
            }
        }

        else if(!isError && !isPriceEmpty && isFirstSearchBlockYet){
            i=0;var isNotEndIndex = true;var index;
            while(isNotEndIndex){
                index=matchingRows[i];
                td = tr[index].getElementsByTagName("td")[7];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    txtValue = parseFloat(txtValue);
                    if (txtValue<filterPriceStart || txtValue > filterPriceEnd ) {
                        matchingRows.splice(i,1);
                    }
                    else{
                            i+=1;
                    }
                    if(matchingRows.length==i){
                            isNotEndIndex=false;
                    }
                }
            }
        }
        
        if(isError){
            table.style.display="none";
        }
        //show table
        if(!state){
            for( i=0 ; i<matchingRows.length+1 ; i++ ){
                var j=matchingRows[i];
                tr[j].style.display = "";
            }
        }
        else{
                $("tbody").style.display ="none";
            
        }  
        



        //Finish everything clear state
        isFirstSearchBlockYet=false;isError=false;state=false;
      

    })
 

    $("#toggle-advance-btn").click(function(){
        $("#container-advance-search").toggle();
        $("#container-simple-search").toggle();
        if( $("#container-advance-search").is(":hidden")){
            $(this).text("Advance Search");
        }
        else {
            $(this).text("Simple Search");
        }
    })
  
});
  
