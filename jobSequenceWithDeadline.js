
function min(x,y){ return x < y ? x : y;}
function jobScheduler(jobs){
	
	jobs.sort(function(x,y){return y.profit-x.profit;});
	console.log(jobs);
	var sched =[];

	for(var i = 0; i < jobs.length; i++){
		//Find the biggest possible free spot based of tll or size of array if ttl > array
		//if thats taken iterate down array until find biggest open space
		for(var j = min(jobs[i].ttl, jobs.length)-1; j >= 0; j--){
			if(sched[j] === undefined){
				sched[j] = jobs[i];
				break;
			}
		}
	}
	return sched.filter(function(ele){if(ele) return true; return false;});
}

var j = [{profit: 100 , ttl:20}, {profit:25 , ttl:1}, {profit:40 , ttl:2}, {profit:35 , ttl:2}];
console.log(jobScheduler(j));