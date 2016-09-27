import React from 'react';
import ReactDOM from 'react-dom';

class TodoForm extends React.Component{
    constructor(){
        super();
        this.doSubmit = this.doSubmit.bind(this);
    }
	doSubmit(e) {
		e.preventDefault();
		var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.onTaskAdd(task);
		ReactDOM.findDOMNode(this.refs.task).value = '';
		return;
	}
	render() {
		return (
			<form className="form-horizontal" onSubmit={this.doSubmit}>
				<div className="form-group">
					<div className="col-md-10">
						<input type="text" ref="task" className="form-control" placeholder="Add into list here..." />
					</div>
					<div className="col-md-2">
						<input type="submit" value="Add" className="btn btn-primary" />
					</div>
				</div>
			</form>
		);
	}
}

export default TodoForm
