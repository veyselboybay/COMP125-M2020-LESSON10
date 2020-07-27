//IIFE - Immediately Invoked Function Expression
(function(){

    function Start()
    {
        
        console.log("App Started... " ,"color:white; font-size:24px;");
         
        InitializeSite();
    }
    window.addEventListener("load",Start);

    function AboutContent()
    {
        let XHR=new XMLHttpRequest();
        XHR.open("GET","./Views/Content/about.html");
        XHR.send();

        XHR.addEventListener("readystatechange",function()
        {
            if((XHR.readyState===4)&&(XHR.status===200))
            {
                
                let main=document.getElementsByTagName("main")[0];
                let mainData=XHR.responseText;
                main.innerHTML=mainData;
            }
        });
    }
    function ContactContent()
    {
        let XHR=new XMLHttpRequest();
        XHR.open("GET","./Views/Content/contact.html");
        XHR.send();

        XHR.addEventListener("readystatechange",function()
        {
            if((XHR.readyState===4)&&(XHR.status===200))
            {
                let main=document.getElementsByTagName("main")[0];
                let mainData=XHR.responseText;
                main.innerHTML=mainData;
                validateForm();
            }
        });
    }
    function HomeContent()
    {
        let XHR=new XMLHttpRequest();
        XHR.open("GET","./Views/Content/home.html");
        XHR.send();
        XHR.addEventListener("readystatechange",function()
        {
            if((XHR.readyState===4)&&(XHR.status===200))
            {
                let main=document.getElementsByTagName("main")[0];
                let mainData=XHR.responseText;
                main.innerHTML=mainData;
            }
        });
    }
    function ProductsContent()
    {
        let XHR=new XMLHttpRequest();
        XHR.open("GET","./Views/Content/products.html");
        XHR.send();
        XHR.addEventListener("readystatechange",function()
        {
            if((XHR.readyState===4)&&(XHR.status===200))
            {
                let main=document.getElementsByTagName("main")[0];
                let mainData=XHR.responseText;
                main.innerHTML=mainData;
                loadAddressBookData();
            }

        });
        
    }
    function ServicesContent()
    {
        let XHR=new XMLHttpRequest();
        XHR.open("GET","./Views/Content/services.html");
        XHR.send();
        XHR.addEventListener("readystatechange",function()
        {
            if((XHR.readyState===4)&&(XHR.status===200))
            {
                let main=document.getElementsByTagName("main")[0];
                let mainData=XHR.responseText;
                main.innerHTML=mainData;
            }
        });
    }

    function loadFooter()
    {
        let XHR=new XMLHttpRequest();
        XHR.open("GET","./Views/partials/footer.html");
        XHR.send();

        XHR.addEventListener("readystatechange",function()
        {
            if((XHR.readyState===4)&&(XHR.status===200))
            {
                let footer=document.getElementsByTagName("footer")[0];
                let footerData=XHR.responseText;

                footer.innerHTML=footerData;
                
            }
        });
    }

    function loadAddressBookData()
    {
        let XHR=new XMLHttpRequest();
        XHR.open("GET","./Data/addressBook.json");
        XHR.send();
        XHR.addEventListener("readystatechange",function()
        {
            if((XHR.readyState===4)&&(XHR.status===200))
            {
                let data=JSON.parse(XHR.responseText);
                let addressBook=data.addressBook;
                let contactList=[];

                for(const record of addressBook)
                {
                    let contact=new objects.Contact();
                    contact.setContact(record);
                    contactList.push(contact);
                }
                console.log(contactList);

                let tableBody=document.getElementById("tableBody");
                for(const contact of contactList)
                {
                    let row=document.createElement("tr");
                    row.innerHTML=
                    `
                    <td>${contact.firstName}</td>
                    <td>${contact.lastName}</td>
                    <td>${contact.emailAddress}</td>
                    <td>${contact.contactNumber}</td>
                    `;
                    tableBody.appendChild(row);
                }
            }
        });
    }

    function highlightActiveLink(id)
    {
        let navBar=document.getElementsByTagName("nav")[0];
        let navAnchors = navBar.querySelectorAll("li a");

        for (const anchor of navAnchors) 
        {
         anchor.className = "nav-link";
        }

        for (const anchor of navAnchors) 
        {
            let anchorString = anchor.getAttribute("id");

            if (id === anchorString)
            {
                anchor.className = "nav-link active";
            }
        }
        
    }
    
    
    function validateForm()
    {
        let contact=new objects.Contact();
        let contactForm=document.forms[0];

        
        contactForm.noValidate=true;

        let errorMessage=document.getElementById("errorMessage");

        let firstName=document.getElementById("firstName");
        firstName.addEventListener("blur",(event)=>
        {
            if(firstName.value.length<2)
            {
                firstName.focus();
                errorMessage.hidden=false;
                errorMessage.textContent="Please enter a longer first name";
            }
            else
            {
                contact.firstName=firstName.value;
                errorMessage.hidden=true;
            }
        
        });

        let lastName=document.getElementById("lastName");
        lastName.addEventListener("blur",(event)=>
        {
            if(lastName.value.length<2)
            {
                lastName.focus();
                errorMessage.hidden=false;
                errorMessage.textContent="Please enter longer last Name";
            }
            else
            {
                contact.lastName=lastName.value;
                errorMessage.hidden=true;
            }
        });

        let contactNumber=document.getElementById("contactNumber");
        contactNumber.addEventListener("blur",(event)=>
        {
            let contactNumberPattern=/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
            if(!contactNumberPattern.test(contactNumber.value))
            {
                contactNumber.focus();
                errorMessage.hidden=false;
                errorMessage.textContent="Please enter valid phone number";
            }
            else
            {
                contact.contactNumber=contactNumber.value;
                errorMessage.hidden=true;
            }
        });

        let emailAddress=document.getElementById("emailAddress");
        emailAddress.addEventListener("blur",(event)=>
        {
            
        let emailPattern=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(!emailPattern.test(emailAddress.value))
        {
            emailAddress.focus();
            errorMessage.hidden=false;
            errorMessage.textContent="Please enter a valid email address";
        }
        else
        {
            contact.emailAddress=emailAddress.value;
            errorMessage.hidden=true;
        }
        });

        let shortMessage=document.getElementById("shortMessage");
        shortMessage.addEventListener("blur",(event)=>
        {
            contact.shortMessage=shortMessage.value;
        });

        let submitButton=document.getElementById("submitButton");
        submitButton.addEventListener("click",(event)=>
        {
            event.preventDefault();
            console.log(`Submit button clicked`);
            console.log(contact.toString());
            console.log(contact.toJSON());
        });
        
        
    }
    function setPageContent(id)
    {
        document.title = id;

        window.history.pushState("", id, "/"+id.toLowerCase());

        highlightActiveLink(id);

         // content switcher
        switch(id)
        {
            case "Home":
                HomeContent();
                break;
            case "Contact":
                ContactContent();
                break;
            case "Products":
                ProductsContent();
                break;
            case "Services":
                ServicesContent();
                break;
            case "About":
                AboutContent();
                break;
        }

        loadFooter();
    }
    function InitializeSite()
    {
        console.info("Header Loading...");

        // step 1 - creates the XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - configures the message
        XHR.open("GET", "./Views/partials/header.html");

        // step 3 - Executes the request
        XHR.send();

        XHR.addEventListener("readystatechange", function(){
            if((XHR.readyState === 4) && (XHR.status === 200))
            {
                let header = document.getElementsByTagName("header")[0];

                let headerData = XHR.responseText;

                header.innerHTML = headerData;

                setPageContent("Home");

                let navLinks = document.getElementsByTagName("a");

                for (const link of navLinks) 
                {
                    link.addEventListener("click", (event) =>{
                        event.preventDefault();

                        let id = link.getAttribute("id");

                        setPageContent(id);

                    });
                }
            }
        });
    }

})();