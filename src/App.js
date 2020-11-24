import React from 'react';
import './App.css';
import ima from './app.png';
import ReactPlayer from "react-player";

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      inputValue : "",
      url:"https://www.youtube.com/watch?v=AWi6WAODnaY&feature=youtu.be",
      pos: [],
      x: 0,
      y: 0,
      onPlay: false,
      duration: 0,
      addItem: false,
      event: {X:0 , Y:0},
      
    }

    this.onMouseMove = this.onMouseMove.bind(this);
    
  }

  onMouseMove(e) {
   
    if(this.state.addItem){
      
      this.addNewItem(e)
      this.setState({addItem:false})
      //this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    }
   
  }

  getEvent(){

    return(this.state.event)
  }


  handleChange = (event)=>{
    this.setState({inputValue : event.target.value})
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.setState({url: this.state.inputValue})
  }

  addNewItem = (e) =>{
    console.log(e);

 /*   const New= 'X:'+e.nativeEvent.offsetX+' Y:'+e.nativeEvent.offsetY;
    this.setState({pos:[...this.state.pos, New]});*/
    this.setState({event:{X:e.nativeEvent.offsetX, Y:e.nativeEvent.offsetY}})
  }

  handleDuration = (duration) => {

    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handlePlay = () => {
    console.log('onPlay')
    setInterval(()=>{

      if(this.state.playing){
        const New= 'X:'+this.state.event.X+' Y:'+this.state.event.Y;
    this.setState({pos:[...this.state.pos, New]});
      }
      

    },5000)
    this.setState({ playing: true })
  }


  handlePause = () =>{
    console.log('onPaused')
    this.setState({ playing: false })
  }



  handleProgress = state => {
    console.log('onProgress', parseInt(state.playedSeconds))
    if (!this.state.seeking) {
      this.setState(state)
    }

    if(parseInt(state.playedSeconds) % 5 === 0){
      
      this.setState({addItem:true})
      
    }

  }

    descargar(){
      console.log('descargando')
    var text = JSON.stringify(this.state.pos),
            blob = new Blob([text], { type: 'text/plain' }),
            anchor = document.createElement('a');

        anchor.download = "REsultados" + ".txt";
        anchor.href = (/*window.webkitURL ||*/ window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();

  }


  render(){

    const { x, y } = this.state;

  
  
    console.log(this.state.pos /*, this.state.url*/ )

    return (
      <div className="App">
        <header className="App-header">
         
         
          <ReactPlayer 
          url={this.state.url} 
          controls={false} 
          className='react-player'
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onDuration= {this.handleDuration.bind(this)}   
          onProgress={this.handleProgress.bind(this)}   
          />



       
        </header>
        <div>
          <img ref="imagen" onMouseMove={(e)=>{ this.onMouseMove(e)}} width="650" height="350" src={ima} />
        </div>


        <button className="descarga" onClick={this.descargar.bind(this)} >Descargar Resultados</button>
        
        <div className="imgA">
          
        </div>
      </div>
    );
  }
  
}

export default App;

