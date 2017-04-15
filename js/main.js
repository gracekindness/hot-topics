$(document).ready(function () {
    
    "use strict";

    //d efine variables
    var contents = {};
    var url="";
    var nm="";
    var em="";
    var sb="";
    var ms="";
    var dt={};
    var errors = [];
    var collect = "";
    var i=0;
    
    // load intial partials
    $(".box").load("./partials/home.html", function (pageRsp) {
        console.log(pageRsp)
      contents["./partials/home.html"] = pageRsp;
    });

    function handleResponse(rsp) {
        $(".feedback").html(rsp).hide().fadeIn(500);  
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
    }
        
    function validateForm(ev) {
        ev.preventDefault();
        // get trimmed values
        nm = $.trim($("#name").val());
        em = $.trim($("#email").val());
        sb = $.trim($("#subject").val());
        ms = $.trim($("#message").val());

        // validate name
        if (nm === "") {
            errors.push("<p>Name?</p>");
        } else {
            dt.name = nm;
        }

        // validate email
        if (em === "") {
            errors.push("<p>Email?</p>");
        } else {
            dt.email = em;
        }

        // validate subject
        if (sb === "") {
            errors.push("<p>Subject?</p>");
        } else {
            dt.subject = sb;
        }

        // validate message
        if (ms === "") {
            errors.push("<p>Message?</p>");
        } else {
            dt.message = ms;
        }

        // print any errors
        if (errors.length === 0) {
            $.ajax({
                type: "post",
                url: "./php/form-submit.php",
                data: dt,
                dataType: "text"
            }).done(handleResponse).fail(handleErrors);
        } else {
              collect = "<p>Please fix the following errors:</p>";
              collect += "<ul>";

              for (i = 0; i < errors.length; i++) {
                  collect += "<li>" + errors[i] + "</li>";
              }

              collect += "</ul>";
              $(".feedback").append(collect);

              errors = [];
              collect = "";
        }
    }
    /*
    ------------------------------
    HANDLING HTML FORM - SEND DATA 
    TO SERVER USING $.ajax({})
    ------------------------------ */

    /* 
    What happens if user is on contact page and 
    submits the form? 
    Handle the success response of form handling 
    ajax object - define function handleResponse.
    This function has a parameter - rsp
    for example. rsp contains server's 
    response to the request of web browser. */      
       /* 
       Pass the response to HTML element
       with class "feedback" placed below the 
       form element (in HTML document) */    
       /* 
       Use val() jQuery method to clear the form 
       fields name, email, subject and message */       
    /* 
    End function handleResponse */
    
    function handleErrors(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" +
                    "errorThrown: " + errorThrown);
    }
   
    /* 
    Define validateForm function The form will be handled 
    on submit event so you need event object parameter */
       /* 
       Prevent default behaviour of form element */ 
       /* 
       Access all form elements (name, email, subject and 
       message) and pass the outputs to variables declared 
       for that purpose */
       /* 
       Use $.trim() method to remove eventual white space 
       from form elements */
  

       /* 
       VALIDATE NAME FIELD: */
       /* 
       if nm is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */         
          /* 
          Pass nm to object dt as a new 
          property of that object. */
       /* 
       end else */


       /* 
       EVALUATE EMAIL FIELD: */
       /* 
       if em is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */             
          /* 
          Pass em to object dt as a new 
          property of that object. */
       /* 
       end else */

        
       /* 
       EVALUATE SUBJECT FIELD: */
       /* 
       if sb is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */        
          /* 
          Pass sb to object dt as a new 
          property of that object. */
       /* 
       end else */
        
  
       /* 
       EVALUATE MESSAGE FIELD: */
       /* 
       if ms is empty string: */
          /* 
          Pass the corresponding error message to 
          errors array (use push()) */
       /* 
       end if 
       else: */        
          /* 
          Pass ms to object dt as a new 
          property of that object. */
       /* 
       end else */


       /* 
       FINALLY, IF THERE IS NO ERRORS SEND
       DATA TO SERVER, OTHERWISE PRINT ERRORS */
       /* 
       if errors array is empty: */    
          /* 
          Use $.ajax({}) to send dt 
          to server. Chain done() and fail() 
          methods to ajax object. Method done()
          calls handleResponse function if request 
          is successful otherwise fail() method
          calls handleErrors. */    
       /* 
       end if
       otherwise: */
          /* 
          Assign collect variable with initial message:
          "Please fix the following errors:" */
          /* 
          Loop through array errors and parse the values of 
          errors array to unordered list - for each loop iteration
          append (save) the result in collect variable. */
          /* 
          Pass collect to HTML element
          with class "feedback" placed below the 
          form element (in HTML document) */
          /* 
          Empty errors array */
          /* 
          Assign collect with empty string */
       /* 
       end else */
    /* 
    End function validateForm */
    
    

    /*
    ---------------------
    LOADING HTML PARTIALS
    --------------------- */

    function storeContents(container) {
        if (!contents[container]) {
            $(".box").load(container, function(pageRsp) {
                contents[url] = pageRsp;
            });
        } else {
            $(".box").html(contents[url]);
        }
    }
    
    $(".nav ul li a").on("click", function(ev) {
        ev.preventDefault();
        url = $(this).attr("href");
        storeContents(url);
        $("body").on("submit", "form", validateForm);
    });
    
});