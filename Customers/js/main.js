

$(document).ready(function () { // wait for document to be ready
	var searchResults = [];
	
	var userData = document.querySelector('.userData').innerHTML;
	var panelData = document.querySelector('.panel').innerHTML;
	
	var userTemplate = Handlebars.compile(userData);
	var panelTemplate = Handlebars.compile(panelData);
	
	var results = document.querySelector('.results');
	var panelData = document.querySelector('.info-panel');
	
	var search = document.getElementById('search');
	
	$.getJSON('js/grid_Data.js').done(function(data) {
		
		
		var myData = data.fs_DATABROWSE_F0101.data.gridData.rowset;
		
		console.log(myData);
		
		checkCRelationship(myData);
		
		results.innerHTML = userTemplate({
			department: myData});
		
	
		
		
	
		search.onkeyup = function() {
		searchResults = [];
			
			for (var i =0; i < myData.length; i++) {
				if (myData[i].F0101_ALPH.includes(search.value)) {
					searchResults.push(myData[i]);
				}
			}
			
			results.innerHTML = "";
			
			console.log(searchResults);
			
			results.innerHTML = userTemplate({
			department: searchResults});
		};

	});
	
function checkCRelationship(data) {
	var customerRelations = [];
	var opportunities = [];
	var suppliers = [];
	var warehouses = [];

	
	for (var i = 0; i < data.length; i++) {
		if (data[i].F0101_AT1.includes('C')) {
			customerRelations.push(data[i]);
		}
		
		if (data[i].F0101_AT1.includes('O')) {
			opportunities.push(data[i]);
		}
		
		if (data[i].F0101_AT1.includes('V')) {
			suppliers.push(data[i]);
		}
		
		if (data[i].F0101_AT1.includes('W')) {
			warehouses.push(data[i]);
		}

	}
	panelData.innerHTML = panelTemplate({
			number_companies: data.length,
			number_customers: customerRelations.length,
			number_opportunities: opportunities.length,
			number_suppliers: suppliers.length,
			number_warehouses: warehouses.length
	});
}
	
});




// Token request response example
// {
//   "username": "DEMO",
//   "environment": "JDV920",
//   "role": "*ALL",
//   "jasserver": "http://e1srv:7020",
//   "userInfo": {
//     "token": "044v2SEf1SZK9xhb/Say3dkrNzm43TUDkvtVBvPe8X08XQ=MDE4MDA5OTM5NTM0ODA4MTg2MTY3MzY1YWlzVGVzdGVyMTQ5NDk2NTI1OTg0Nw==",
//     "langPref": "  ",
//     "locale": "en",
//     "dateFormat": "MDE",
//     "dateSeperator": "/",
//     "simpleDateFormat": "MM/dd/yyyy",
//     "decimalFormat": ".",
//     "addressNumber": 0,
//     "alphaName": "DEMO",
//     "appsRelease": "E920",
//     "country": " ",
//     "username": "DEMO"
//   },
//   "userAuthorized": false,
//   "version": null,
//   "poStringJSON": null,
//   "altPoStringJSON": null,
//   "aisSessionCookie": "negS345IlfkoLIS3aLD2mO4uM35_uX0LzNVTbtemxEy-AhVMLdO1!1643583743!1494965259848",
//   "adminAuthorized": false,
//   "deprecated": true
// }



//  extra credit to play around with Form Services
// form service
//   var reqData = {
//                 "version": "ZJDE0001",
//                 "formActions": [],
//                 "deviceName": "aisTester",
//                 "formName": "P4101_W4101A"
//   }
