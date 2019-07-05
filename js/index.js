var dateForm = (function(){

	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();

	return {
		count: 0,
		calcYear: year,
		calcMonth: month,

		change: function(state,dateArr){
			//向前翻页
			if(state == 'add'){
				if(this.calcYear < year){ //不是当前的年份
					if(this.calcMonth >= 11){
						this.calcMonth = 0;
						this.calcYear = this.calcYear + 1;
					}else{
					this.calcMonth = this.calcMonth + 1;
					}
				}else{
					if(this.calcMonth < month){
						this.calcMonth = this.calcMonth + 1;
					}
				}
			}else if(state == 'reduce'){//向后翻页
				if(this.calcYear == year){//是当前的年份
					this.count++;

					if(this.calcMonth == 0){
						this.count = 0;
						this.calcMonth = 11;
						this.calcYear = year - 1;
					}else{
						this.calcMonth = this.calcMonth - 1;
					}
				}else{ //不是当前的年份
					if(this.calcMonth <= 0){
						this.calcMonth = 11;
						this.calcYear = this.calcYear - 1;
					}else{
						this.calcMonth = this.calcMonth - 1;
					}
				}

			}else if(state == 'init'){
				this.calcYear = year;
				this.calcMonth = month;
			}

			document.getElementById('curDate').innerHTML = this.calcYear+'年'+ ( this.calcMonth+1 < 10 ? '0'+(this.calcMonth+1) : this.calcMonth+1 )+'月';
			document.getElementById('curDate').setAttribute('data-date', this.calcYear+'-'+ ( this.calcMonth+1 < 10 ? '0'+(this.calcMonth+1) : this.calcMonth+1 ) );
			
			//当前月的第一天的日期
			var firstDay = new Date(this.calcYear,this.calcMonth,1);
			//第一天是星期几
			var weekday = firstDay.getDay();

			//求当前月一共有多少天
			//new Date(year,month+1,0) ： month+1是下一个月，day为0代表的是上一个月的最后一天，即我们所需的当前月的最后一天。
			//getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
			var days = new Date(this.calcYear,this.calcMonth+1,0).getDate();
			var curDay = new Date().getDate();

			var res = "";
			//输出第一天之前的空格
			for(var i=0;i<weekday;i++){
			    res+="  ";
			}
			//中转变量
			var curRes = '';

			for(var j=1;j<=days ;j++){

				if(dateArr && dateArr.length >0){

					for(var m=0;m<dateArr.length;m++){
						curRes = '';
						// console.log(j,dateArr[m].substr(5,2),this.calcMonth+1)
						if(dateArr[m].substr(0,2) == this.calcMonth+1 && dateArr[m].substr(3,2) == j ){

							if(j<10){
								res += '<span class="setDay"> '+ j +' </span>';
							}else{
								res += '<span class="setDay">'+ j +'</span>';
							}

							break;
						}else{
							if(j<10){
								curRes += '<span> '+ j +' </span>';
							}else{
								curRes += '<span>'+ j +'</span>';
							}
						}

					}

					res += curRes;

				}else{
					if(j<10){
						res += '<span> '+ j +' </span>';
					}else{
						res += '<span>'+ j +'</span>';
					}
				}
				
		    weekday++;

		    //如果是周日则换行
		    if(weekday%7 == 0){
	        weekday = 0;
	        res += '||';
		    }
			}

			var arrRes = res.split('||');
			var htmlText = '';
			for(var k=0;k<arrRes.length;k++){
				htmlText += '<li>'+ arrRes[k] +'</li>';
			}

			document.getElementById("dateList").innerHTML = htmlText;

		}


	};

}());

