import React from 'react';
import './App.css';
import ima from './app.png';
import ReactPlayer from "react-player";

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      inputValue : "",
      url:"https://www.youtube.com/watch?v=O02JZBLJnXQ",
      pos: [],
      x: 0,
      y: 0,
      onPlay: false,
      duration: 0,
      addItem: false,
      
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

  handleChange = (event)=>{
    this.setState({inputValue : event.target.value})
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.setState({url: this.state.inputValue})
  }

  addNewItem = (e) =>{
    console.log(e);

    const New= 'X:'+e.nativeEvent.offsetX+' Y:'+e.nativeEvent.offsetY;
    this.setState({pos:[...this.state.pos, New]});
  }

  handleDuration = (duration) => {

    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleProgress = state => {
    console.log('onProgress', parseInt(state.playedSeconds))
    if (!this.state.seeking) {
      this.setState(state)
    }

    if(parseInt(state.playedSeconds) % 10 === 0){
      
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

  
  
    console.log(this.state.pos, this.state.url )

    return (
      <div className="App">
        <header className="App-header">
         
         
          <ReactPlayer 
          url={this.state.url} 
          controls={false} 
          className='react-player'
          onPlay={this.handlePlay}
          onDuration= {this.handleDuration.bind(this)}   
          onProgress={this.handleProgress.bind(this)}   
          />



       
        </header>
        <div>
          <img onMouseMove={this.onMouseMove} width="650" height="350" src={ima} />
        </div>
        <h1>Mouse coordinates: { x } { y }</h1>


        <button onClick={this.descargar.bind(this)} >DEscargar</button>
        
        <div className="imgA">
          
        </div>
      </div>
    );
  }
  
}

export default App;
