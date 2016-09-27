import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TodoForm from './todoForm';
import TodoList from './todoList';

class TodoApp extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        },
        this.removeFromList = this.removeFromList.bind(this);
        this.addIntoList = this.addIntoList.bind(this);
        this.updateForComplete = this.updateForComplete.bind(this);
    }
    componentWillMount(){
		this.fetchList();
    }
	render() {
		return (
			<div>
				<h1>Todo List</h1>
				<TodoList data={this.state.data} removeItem={this.removeFromList} updateComplete={this.updateForComplete} />
				<TodoForm onTaskAdd={this.addIntoList} />
			</div>
		);
	}
	updateListState(data){
		this.setState({
			data: data
		});		
	}
	fetchList(){
		axios.get('/items')
		.then(res => {
			let items = res.data;
			items.forEach(item => item.key = item._id);
			this.updateListState(items);
		})
		.catch(err => console.error(err));
	}
	addIntoList(task) {
		axios.post('/items', {
			task: task
		})
		.then(res => {
			let items = this.state.data;
			let item = res.data;
			item.key = item._id;
			items.push(item);
			this.updateListState(items);
		})
		.catch(err => console.error(err));
	}
	updateForComplete(nodeId, complete) {
		axios.put('/items/'+nodeId, {
			complete: complete
		})
		.then(res => {
			let items = this.state.data;
			let itemIndex = items.findIndex(item => item._id == res.data._id);
			let item = res.data;
			item.key = item._id;
			items[itemIndex] = item;
			this.updateListState(items);
		})
		.catch(err => console.error(err));
	}
	removeFromList(nodeId){
		axios.delete('/items/'+nodeId, {
		})
		.then(res => {
			let items = this.state.data;
			items = items.filter(item => {return item._id != nodeId});
			this.updateListState(items);
		})
		.catch(err => console.error(err));
	}
}

export default TodoApp
