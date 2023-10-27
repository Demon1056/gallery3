import { Component } from 'react';
import { ModalDiv, Overlay } from './Modal.styled';

export class Modal extends Component {
 chekEvent = (e)=> {if(e.code==="Escape"||e.target.nodeName==='DIV'){
  this.props.closeModal()}
  else{ console.log("anothe click");}
 }
  componentDidMount() {
    window.addEventListener('keydown', this.chekEvent);
  }
  componentWillUnmount() {window.removeEventListener('keydown', this.chekEvent)}
  render() {
    return (
      <Overlay onClick={this.chekEvent}>
        <ModalDiv>
          <img src={this.props.src} alt={this.props.alt} />
        </ModalDiv>
      </Overlay>
    );
  }
}
