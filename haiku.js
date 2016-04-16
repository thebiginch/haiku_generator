var fs = require('fs');
var cmudictFile = fs.readFileSync('./cmudict.txt').toString();
var dictionary = formatData(cmudictFile);


function formatData(data){
	var lines = data.toString().split('\n');
	var lineSplit = "";
	var dictionary ={
		syll1: [],
		syll2: [],
		syll3: [],
		syll4: [],
		syll5: [],
		syll6: [],
		syll7: [],
		syllX: []
	};


	lines.forEach(function(line){   
    	lineSplit = line.split("  ");
		var numSyllables = countSyllables(lineSplit[1]); 
    	
    	if(numSyllables>7){
    		numSyllables='X';
    	}
    	dictionary['syll'+numSyllables].push(lineSplit[0]);

	}); 

	return dictionary;  
}


function countSyllables(phoneme){
	return (phoneme.match(/\d/g) || []).length;
}

function pickWord(dict,syll){
	return dict['syll'+syll][Math.floor(Math.random()*dict['syll'+syll].length)];
}



function createHaiku(structure){

	var poem = structure.map(function(row){
		return row.map(function(word){
			return pickWord(dictionary,word);
		}).join(' ');
	}).join('\n');

	console.log(poem);
	return poem;
}




module.exports = {
	createHaiku: createHaiku,
};

