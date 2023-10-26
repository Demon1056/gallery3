import { Component } from "react";
import { FaMagnifyingGlass} from "react-icons/fa6";
import {
  SearchInputContainer,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  Input
} from './Searchbar.styled';

export class Searchbar extends Component {
  state ={
    value :''
  }
  updateValue = (e)=>{
    const {value} = e.target
  this.setState({value})}

  handlerSubmit = (e)=>{
  e.preventDefault()
 this.props.submitForm(this.state.value)
 this.setState({value:''})
}
 render(){


  return (
    <SearchInputContainer>
      <SearchForm onSubmit={this.handlerSubmit}>
        <SearchFormButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
          <FaMagnifyingGlass/>
        </SearchFormButton>
        <Input
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.value}
      onChange={this.updateValue}
    />
      </SearchForm>
    </SearchInputContainer>
  );
}}
