"use strict";

export class Contact
{
    constructor(firstName="",lastName="",emailAddress="",contactNumber="",shortMessage="")
    {
        this.firstName=firstName;
        this.lastName=lastName;
        this.emailAddress=emailAddress;
        this.contactNumber=contactNumber;
        this.shortMessage=shortMessage;
    }

    toString()
    {
        let outputstring="";
        outputstring+="First Name    :"+this.firstName+"\n";
        outputstring+="Last Name     :"+this.lastName+"\n";
        outputstring+="E-mail Adress :"+this.emailAddress+"\n";
        outputstring+="Contact Number:"+this.contactNumber+"\n";
        outputstring+="Short Message :"+this.shortMessage+"\n";
        outputstring+="Business Number:"+this.businessNumber+"\n";
        return outputstring;
    }
    toJSON()
    {
        let JSONObject=
        {
            firstName:this.firstName,
            lastName:this.lastName,
            emailAddress:this.emailAddress,
            contactNumber:this.contactNumber,
            shortMessage:this.shortMessage,
            businessNumber:this.businessNumber,
        };
        return JSONObject;
    }
    setContact(JSON_Data)
    {
        this.firstName=JSON_Data.firstName;
        this.lastName=JSON_Data.lastName;
        this.emailAddress=JSON_Data.emailAddress;
        this.contactNumber=JSON_Data.contactNumber;
        this.shortMessage=JSON_Data.shortMessage;
        this.businessNumber=JSON_Data.businessNumber;
    }
    

    
}

