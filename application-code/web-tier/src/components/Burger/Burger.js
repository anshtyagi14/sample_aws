import React from 'react';
import PropTypes from 'prop-types';
import { StyledBurger } from './Burger.styled';

const Burger = ({ open, setOpen, ...props }) => {
  const isExpanded = open;

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <StyledBurger
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      open={open}
      onClick={toggleMenu}
      {...props}
    >
      <span />
      <span />
      <span />
    </StyledBurger>
  );
};

Burger.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Burger;
