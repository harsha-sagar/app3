import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './todoItem';

class TodoList extends React.Component{
    constructor(){
        super();
        this.removeItem = this.removeItem.bind(this);
        this.updateComplete = this.updateComplete.bind(this);
    }
	removeItem(nodeId) {
		this.props.removeItem(nodeId);
		return;
	}
	updateComplete(nodeId, complete) {
		this.props.updateComplete(nodeId, complete);
		return;
	}
	render() {
		var list = this.props.data.map(item => {
			return (
				<TodoItem key={item.key} nodeId={item._id} task={item.task} complete={item.complete} removeItem={this.removeItem} updateComplete={this.updateComplete} />
			);
		},this);
		return (
			<ul className="list-group">
				{list}
			</ul>
		);
	}
}

export default TodoList
