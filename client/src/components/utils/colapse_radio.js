import React, { Component } from 'react';

import { List, 
        ListItem,
        ListItemText,
        Radio,
        RadioGroup,
        FormControlLabel,
        Collapse, } from '@material-ui/core/';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';

class ColapseRadio extends Component {
    state = {
        open: false,
        value: '0'
    }

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            });
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleAngle = () => (
        <FontAwesomeIcon
            icon={this.state.open ? faAngleUp : faAngleDown}
            className='icon'
        />
    )

    handelChange = (event) => {
        const value = event.target.value;
        this.setState({
            value
        }, () => {
            this.props.handleFilters(value);
        });
    }

    renderList = () => (
        this.props.list ? 
            this.props.list.map((value) => (
                <FormControlLabel
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio/>}
                    label={value.name}
                />
            ))
        : null
    )

    render() {
        return (
            <div className='collapse_items_wrapper'>
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem onClick={() => this.handleClick()} style={{padding: '10px 23px 10px 0'}}>
                        <ListItemText
                            primary={this.props.title}
                            className='collapse_title'
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <RadioGroup
                                aria-label='prices'
                                name='prices'
                                value={this.state.value}
                                onChange={this.handelChange}
                            >
                                {this.renderList()}
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default ColapseRadio;