import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../atoms/Input';
import { setSearchTerm } from '../../redux/slices/filterSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.filters.searchTerm);

  return (
    <div className="search-bar">
      <Input
        type="search"
        placeholder="Search earrings, necklaces, rings..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
