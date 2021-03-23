class Rover {
   // Write code here!
  constructor(position) {
    this.position = position,
    this.mode = 'NORMAL',
    this.generatorWatts = 110
  }
  receiveMessage(message) {
    
    let results = [];
    for(let i =0; i<message.commands.length; i++) {
      if(message.commands[i].commandType === 'STATUS_CHECK') {
        results.push({completed:true, roverStatus:{mode:this.mode, generatorWatts:this.generatorWatts, position:this.position}});
      } else 
        if(message.commands[i].commandType === 'MODE_CHANGE'){
        this.mode = message.commands[i].value;
        results.push({completed:true});
      } else 
        if(message.commands[i].commandType === 'MOVE') {
          if(this.mode !== 'LOW_POWER') {
            this.position = message.commands[i].value;
            results.push({completed:true});
          } else {
            results.push({completed:false});
          }
      }
    }
    return {message: message.name,results: results};
    
  }
}


module.exports = Rover;