import React from 'react';

class TodoItem extends React.Component{
    constructor(){
        super();
        this.removeItem = this.removeItem.bind(this);
        this.updateComplete = this.updateComplete.bind(this);
    }
	removeItem(e) {
		e.preventDefault();
		this.props.removeItem(this.props.nodeId);
		return;
	}
	updateComplete(e) {
		e.preventDefault();
		this.props.updateComplete(this.props.nodeId, !this.props.complete);
		return;
	}
	updateClass() {
		
	}
	render() {
		var classes = 'list-group-item clearfix';
		if (this.props.complete === true) {
			classes += ' list-group-item-success';
		}
		return (
			<li className={classes}>
				{this.props.task}
				<div className="pull-right">
					<button type="button" className="btn btn-xs btn-success" onClick={this.updateComplete}>&#x2713;</button>
                    <button type="button" className="btn btn-xs btn-danger" onClick={this.removeItem}>&#xff38;</button>
				</div>
			</li>
		);
	}
}

export default TodoItem
