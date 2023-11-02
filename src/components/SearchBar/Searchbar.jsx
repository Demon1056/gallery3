import { useState } from 'react';

import { FaMagnifyingGlass } from 'react-icons/fa6';

import {
  SearchInputContainer,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export const  Searchbar =({submitForm})=> {
  const [value, setValue]=useState('')
  
  const updateValue = e => {
    const { value } = e.target;
    setValue(value);
  };

 const  handlerSubmit = e => {
    e.preventDefault();
    submitForm(value);
    setValue('')
  };

    return (
      <SearchInputContainer>
        <SearchForm onSubmit={handlerSubmit}>
          <SearchFormButton type="submit">
            <ButtonLabel>Search</ButtonLabel>
            <FaMagnifyingGlass />
          </SearchFormButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={updateValue}
          />
        </SearchForm>
      </SearchInputContainer>
    );
  }

