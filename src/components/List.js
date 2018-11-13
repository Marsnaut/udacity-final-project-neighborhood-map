import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const ListComponent = (props) => {
  return (
    <List role="listbox" dense={true}>
      {props.list.map((val, key) => {
        return (<ListItem tabIndex="0" style={{ cursor: 'pointer' }} key={key} onClick={() => props.onClickPlace(val)}>
          <ListItemText
            primary={val.title}
          />
        </ListItem>)
      })}
    </List>
  )
}