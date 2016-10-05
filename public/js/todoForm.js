import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TodoForm extends React.Component{
    constructor(){
        super();
        this.doSubmit = this.doSubmit.bind(this);
        this.addIntoList = this.addIntoList.bind(this);
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
	doSubmit(e) {
		e.preventDefault();
		var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.addIntoList(task);
		ReactDOM.findDOMNode(this.refs.task).value = '';
		return;
	}
	addIntoList(task) {
		axios.post('http://localhost:5000/items', {
			task: task
		})
		.then(res => {
			this.context.router.push('/');
		})
		.catch(err => console.error(err));
	}
}

TodoForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default TodoForm
