import React from 'react';
import {Link} from 'gatsby';
import ChevronDown from 'baseui/icon/chevron-down';

import {styled} from 'baseui';

export const TocChevron = styled(ChevronDown, ({$depth, $isTocOpen}) => ({
  height: '16px',
  width: '16px',
  position: 'absolute',
  left: `${$depth * 24 + 36}px`,
  top: '20px',
  transform: $isTocOpen ? 'none' : 'rotate(-90deg)',
  transition: 'transform 0.3s'
}));

export const TocEntry = styled('div', ({$theme, $depth, ...props}) => ({
  ...$theme.typography.font350,
  borderTop: `1px solid ${$depth ? 'tranparent' : $theme.colors.mono500}`,
  borderBottom: `1px solid ${$depth ? 'tranparent' : $theme.colors.mono500}`,
  color: $depth ? $theme.colors.mono800 : $theme.colors.mono1000,
  cursor: 'pointer',
  margin: `-0.5px 0`,
  position: 'relative',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
}));

export const TocHeader = styled('span', ({$depth, $theme}) => ({
  display: 'block',
  padding: `16px 16px 16px ${$depth * 24 + 60}px`,
  ':hover': {
    background: $theme.colors.mono200
  }
}));

export const TocLink = styled(Link, ({$active, $depth, $theme}) => {
  let color;
  if ($active) {
    color = $theme.colors.primary400;
  } else {
    color = $depth ? $theme.colors.mono800 : $theme.colors.mono1000;
  }
  return {
    display: 'block',
    color,
    padding: `16px 16px 16px ${$depth * 24 + 60}px`,
    textDecoration: 'none',
    ':visited': color,
    ':active': color,
    ':hover': {
      color,
      background: $theme.colors.mono200
    }
  };
});

export const TocSubpages = styled('ul', ({$height, ...props}) => ({
  listStyle: 'none',
  margin: 0,
  maxHeight: `${$height * 56}px`,
  overflow: 'hidden',
  padding: 0,
  transition: 'max-height 0.3s'
}));

export const TocContainer = styled('div', ({$theme, $isTocOpen, ...props}) => ({
  [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
    position: 'fixed',
    maxWidth: '300px',
    height: '100%',
    zIndex: 2,
    borderRight: `1px solid ${$theme.colors.mono500}`,
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: '100%'
  },
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    // order: 3,
    borderRight: 'none',
    position: 'sticky',
    top: '56px', // height of toc toggle, ie 20 + 18 * 2
    transition: 'opacity 0.3s, transform 0.3s',
    ...($isTocOpen
      ? {
          opacity: 1,
          maxHeight: 'unset',
          transform: 'translateY(0)'
        }
      : {
          opacity: 0,
          maxHeight: 0,
          overflow: 'hidden',
          transform: 'translateY(30px)'
        })
  }
}));

const StyledTocToggle = styled('div', ({$theme}) => ({
  ...$theme.typography.font300,
  fontFamily: 'Uber Move',
  background: $theme.colors.mono1000,
  color: $theme.colors.mono100,
  alignItems: 'center',
  padding: '18px 24px',
  position: 'sticky',
  top: 0,
  userSelect: 'none',
  zIndex: 10,
  [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
    display: 'flex'
  },
  [`@media screen and (min-width: ${$theme.breakpoints.medium}px)`]: {
    display: 'none'
  }
}));

const TocToggleChevron = styled('div', ({$theme, $isTocOpen}) => ({
  display: 'inline',
  height: $theme.sizing.scale600,
  marginRight: $theme.sizing.scale600,
  transform: $isTocOpen ? 'none' : 'rotate(-90deg)',
  transition: 'transform 0.3s',
  width: $theme.sizing.scale600
}));

export const TocToggle = ({toggleToc, isTocOpen, isMenuOpen}) => {
  return isMenuOpen ? null : (
    <StyledTocToggle onClick={toggleToc}>
      <TocToggleChevron $isTocOpen={isTocOpen}>
        <ChevronDown />
      </TocToggleChevron>
      Table of Contents
    </StyledTocToggle>
  );
};