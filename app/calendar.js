;(function(window, undefined) {

	'use strict';

	function init() {
		console.time('calendar');
		var sY = 2013, eY = 2022,
			mArr = [31, 28 , 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			allYearArr = [],
			holidayArr = [
				[1,'2'],
				[11],
				[100],
				[29],
				[3, 4, 5],
				[],
				['3'],
				[],
				['3', 1000],
				['2'],
				[3, 23],
				[23]
			],
			fMondayArr = [2, 1, 7, 6, 5, 4, 3],
			yArr, holidays, holidayObj, len, i , j, k, lenY, lenD, week, day, currentD,
			targetY, targetM ,prevM, tmpPrevM, isSun, isSat, cName, isOther;

		for(; sY <= eY; sY++){
			yArr = [];
			i = 0;
			for(; i < 12; i++){
				holidays = holidayArr[i];
				len = holidays.length;
				j = 0;
				week = new Date(sY, i, 1).getDay();
				holidayObj = {};
				for(; j < len; j++){
					day = holidays[j];
						day = day === 100 ?
							sY%4 === 0 || sY%4 === 1 ?
								20 :
								21 :
							day;
					day = day === 1000 ?
							sY%4 === 0 ?
								22 :
								23 :
							day;
					day = typeof day === 'number' ?
							new Date(sY, i, day).getDay() === 0 ?
								day + 1 :
								day :
							fMondayArr[week] + (7 * (day - 1));

					holidayObj[day] = true;
				}
				yArr.push([sY, i+1, mArr[i] + (i === 1 ? sY % 4 ? 0 : sY % 100 ? 1 : sY % 400 ? 0 : 1 : 0), week, holidayObj]);
			}
			allYearArr.push(yArr);
		}


		lenY = allYearArr.length;
		i = 0;

		var document = window.document,
			createElement = document.createElement, 
			divElm = createElement.call(document, 'div'),
			styleElm = createElement.call(document, 'style'),
			tableElm, trElm, thElm, tdElm, textNode;

		textNode = document.createTextNode('table {border-collapse:collapse;margin-bottom:20px;}th,td{padding:5px;border:1px #000 solid;text-align:center}.weeks {background: #ccc;}.t-sun {color:#f66;}.t-sat {color:#0ff} .t-hol {color:#fff} .t-oth {color:#999}.bg-sun {background:#fcf}.bg-sat {background: #6ff}.bg-hol {background:#f66}');
		styleElm.appendChild(textNode);
		document.getElementsByTagName('head')[0].appendChild(styleElm);

		for(; i < lenY; i++){
			targetY = allYearArr[i];
			j = 0;
			for(; j < 12; j++){
				targetM = targetY[j];
				tmpPrevM = targetY[j -1];
				prevM = tmpPrevM ? tmpPrevM : allYearArr[i -1] ? allYearArr[i -1][11] : [0,0,31];
				k = 0;
				// src += '<table><tr><th colspan="7">' + targetM[0] + '年' + targetM[1] + '月' + '</th></tr><tr class="weeks"><th class="t-sun">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th class="t-sat">土</th></tr>';
				tableElm = createElement.call(document, 'table')
				trElm = createElement.call(document, 'tr');
				thElm = createElement.call(document, 'th');
				thElm.setAttribute('colspan', 7);
				textNode = document.createTextNode(targetM[0] + '年' + targetM[1] + '月');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				tableElm.appendChild(trElm);

				trElm = createElement.call(document, 'tr');
				trElm.setAttribute('class', 'weeks');

				thElm = createElement.call(document, 'th');
				thElm.setAttribute('class', 't-sun');
				textNode = document.createTextNode('日');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				thElm = createElement.call(document, 'th');
				textNode = document.createTextNode('月');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				thElm = createElement.call(document, 'th');
				textNode = document.createTextNode('火');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				thElm = createElement.call(document, 'th');
				textNode = document.createTextNode('水');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				thElm = createElement.call(document, 'th');
				textNode = document.createTextNode('木');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				thElm = createElement.call(document, 'th');
				textNode = document.createTextNode('金');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				thElm = createElement.call(document, 'th');
				thElm.setAttribute('class', 't-sat');
				textNode = document.createTextNode('土');
				trElm.appendChild(thElm);
				thElm.appendChild(textNode);

				tableElm.appendChild(trElm);


				lenD = targetM[2];
				week = targetM[3];
				holidays = targetM[4];

				for(; k < 42; k++){
					currentD = k + 1 - week;
					if(currentD > 0) {
						if (currentD <= lenD) {
							day = currentD;
							isOther = false;
						}else {
							day = currentD - lenD;
							isOther = true;
						}
					}else {
						day = prevM[2] - week + k + 1;
						isOther = true;
					}
					isSun = k % 7 === 0;
					isSat = k % 7 === 6;
					cName = isSun ? 'bg-sun' : isSat ? 'bg-sat' : '';
					cName += isOther ? ' t-oth' : '';
					cName += holidays[day] && !isOther ? ' bg-hol t-hol' : '';

					
					isSun && (trElm = createElement.call(document, 'tr'));
					tdElm = createElement.call(document, 'td');
					cName && (tdElm.setAttribute('class', cName));
					textNode = document.createTextNode(day);
					trElm.appendChild(tdElm);
					tdElm.appendChild(textNode);
					isSat && tableElm.appendChild(trElm);
				}

				divElm.appendChild(tableElm);
			}

		}
		
		document.body.appendChild(divElm);

		console.timeEnd('calendar');
	}

	window.addEventListener('load', init, false);

})(window);
