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
			src = '<style>table {border-collapse:collapse;border:1px #000 solid;margin-bottom:20px;}th,td{padding:5px;border:1px #000 solid;}.weeks {background: #ccc;}.t-sun {color:#f66;}.t-sat {color:#0ff}}.t-hol {color:#fff} .t-oth {color:#999}.bg-sun {background:#fcf}.bg-sat {background: #6ff}.bg-hol {background:#f66}</style>',
			yArr, holidays, holidayObj, len, i , j, k, lenY, lenD, week, day, currentD, targetY, targetM ,prevM, tmpPrevM, isSun, isSat, cName, isOther;

		//10年分の情報を一つの配列に格納
		//例： [[[2013,1,31,4,0], [2013,1,31,4,0]], [[2013,1,31,4,0], [2013,1,31,4,0]]]
		//カレンダーの情報
		//年月
		//何日までか
		//何曜日か
		//祝日か

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

		//HTML生成
		//1.一度に文字列を生成してinnnerHTML
		//2.createElement
		lenY = allYearArr.length;
		i = 0;
		for(; i < lenY; i++){
			targetY = allYearArr[i];
			j = 0;
			for(; j < 12; j++){
				targetM = targetY[j];
				tmpPrevM = targetY[j -1];
				prevM = tmpPrevM ? tmpPrevM : allYearArr[i -1] ? allYearArr[i -1][11] : [0,0,31];
				k = 0;
				src += '<table><tr><th colspan="7">' + targetM[0] + '年' + targetM[1] + '月' + '</th></tr><tr class="weeks"><th class="t-sun">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th class="t-sat">土</th></tr>';

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
					cName += holidays[day] && !isOther ? ' bg-hol' : '';
					src += isSun ? '<tr>' : '';
					src += (cName ? '<td class="'+cName+'">': '<td>') + day + '</td>';
					src += isSat ? '</tr>' : '';
				}

				src += '</table>';
			}

		}

		//描画は一度だけ
		document.getElementsByTagName('body')[0].innerHTML = src;

		console.timeEnd('calendar');
	}

	window.addEventListener('load', init, false);

})(window);
