function CreateRow(label, value) {
    var p = document.createElement('p');
    var b = document.createElement('b');
    p.appendChild(b);
    b.appendChild(document.createTextNode(label));
    p.appendChild(document.createTextNode(value));
    document.getElementById('contactinfo').appendChild(p);
}

function SetElqContent(){ 
    if (this.GetElqContentPersonalizationValue){
      CreateRow(': ', GetElqContentPersonalizationValue('C_EmailAddress'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_FirstName'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_LastName'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Job_Title1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Company'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_BusPhone'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Address1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_City'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_State_Prov'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Country'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Zip_Postal'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_TwitterID1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Title'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Topic_of_Interest1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Product_Interest_Area1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Lead_Source___Most_Recent1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Lead_Source___Original1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_EmailAddressDomain'));
      CreateRow(': ', GetElqContentPersonalizationValue('M_Instance_BU1'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_MobilePhone'));
      CreateRow(': ', GetElqContentPersonalizationValue('C_Company_Size1'));
  } else {
      CreateRow('Personalization functions not found','');
   }
}