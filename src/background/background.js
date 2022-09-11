chrome.webNavigation.onCompleted.addListener(
	function (details) {
		if (details.url && details.url.match(/vinted\.fr\/*/)) {
			chrome.tabs.executeScript(details.tabId, {
				code: 'if (document.querySelectorAll(\'.details-list--price\')[0]) {var price = parseFloat(document.querySelectorAll(\'.details-list--price > div > div > h1\')[0].innerHTML.slice(0,-7).replace(\',\',\'.\'));var shipping = parseFloat(document.querySelectorAll(".details-list__item > div > div")[4].querySelectorAll(\'h3 span\')[1].innerHTML.slice(12,-7).replace(\',\',\'.\'));var feesLine = document.querySelectorAll(".details-list__item > div > div")[1].querySelectorAll(\'h3\')[1].innerHTML;var feesFixed = parseFloat(feesLine.slice(0, feesLine.indexOf(\'&\')).replace(\',\',\'.\'));var feesPercentage = parseFloat(feesLine.slice(feesLine.indexOf(\'+\')+2, feesLine.indexOf(\'%\')))/100+1;var actualPrice = Math.round(100 * (price * feesPercentage + feesFixed + shipping)) / 100;var currency = document.querySelectorAll(\'.details-list--price > div > div > h1\')[0].innerHTML.split(\'&nbsp;\')[1];document.querySelectorAll(\'.details-list--price > div > div\')[0].append(actualPrice + \' \' + currency);}'
			});
		}
	},
	{
		url: [{hostContains: '.vinted.'}]
	}
);

// The script in a multiline form is :
/*
if (document.querySelectorAll('.details-list--price')[0]) {
	var price = parseFloat(document.querySelectorAll('.details-list--price > div > div > h1')[0].innerHTML.slice(0,-7).replace(',','.'));
	var shipping = parseFloat(document.querySelectorAll(".details-list__item > div > div")[4].querySelectorAll('h3 span')[1].innerHTML.slice(12,-7).replace(',','.'));
	var feesLine = document.querySelectorAll(".details-list__item > div > div")[1].querySelectorAll('h3')[1].innerHTML;
	var feesFixed = parseFloat(feesLine.slice(0, feesLine.indexOf('&')).replace(',','.'));
	var feesPercentage = parseFloat(feesLine.slice(feesLine.indexOf('+')+2, feesLine.indexOf('%')))/100+1;
	var actualPrice = Math.round(100 * (price * feesPercentage + feesFixed + shipping)) / 100;
	var currency = document.querySelectorAll('.details-list--price > div > div > h1')[0].innerHTML.split('&nbsp;')[1];
	document.querySelectorAll('.details-list--price > div > div')[0].append(actualPrice + ' ' + currency);
}
 */
// The "actualPrice" is rounded at two digits
// Yes, this could be a huge one line script, but it's pretty useless to do so, and so much more difficult to maintain. Verbose for the win.
