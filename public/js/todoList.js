import React from 'react';
import TodoItem from './todoItem';
import axios from 'axios';

class TodoList extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
			listType: 'all',
			categories: ['all','completed','active']
        };
        this.removeFromList = this.removeFromList.bind(this);
        this.updateForComplete = this.updateForComplete.bind(this);
    }
    componentWillMount(){
		if(this.props.location.query.list === this.state.categories[1]){
			this.setState({listType: this.state.categories[1]});
		} else if(this.props.location.query.list === this.state.categories[2]){
			this.setState({listType: this.state.categories[2]});
		} else{
			this.setState({listType: this.state.categories[0]});
		}
		this.fetchList();
    }
	render() {
		if(this.state.data.length === 0){
			return <div>List is empty</div>
		}
		var list = this.state.data.map(item => {
			return (
				<TodoItem key={item.key} nodeId={item._id} task={item.task} complete={item.complete} removeItem={this.removeFromList} updateComplete={this.updateForComplete} />
			);
		},this);
		return (
			<ul className="list-group">
				{list}
			</ul>
		);
	}
	fetchList(){
		axios.get('http://localhost:5000/items')
		.then(res => {
			res.data.forEach(item => item.key = item._id);
			this.updateListState(res.data);
		})
		.catch(err => console.log('fetchListerror', err));
	}
	updateForComplete(nodeId, complete) {
		axios.put('http://localhost:5000/items/'+nodeId, {
			complete: complete
		})
		.then(res => {
			let items = this.state.data;
			let itemIndex = items.findIndex(item => item._id === res.data._id);
			let item = res.data;
			item.key = item._id;
			items[itemIndex] = item;
			this.updateListState(items);
		})
		.catch(err => console.error(err));
	}
	removeFromList(nodeId){
		axios.delete('http://localhost:5000/items/'+nodeId, {
		})
		.then(res => {
			let items = this.state.data;
			items = items.filter(item => {return item._id !== nodeId});
			this.updateListState(items);
		})
		.catch(err => console.error(err));
	}
	updateListState(items){
		let data = [];
		if(this.state.listType === this.state.categories[1]){
			data = items.filter(item => {return item.complete });
		} else if(this.state.listType === this.state.categories[2]){
			data = items.filter(item => {return !item.complete });
		} else{
			data = items;
		}
		this.setState({
			data: data
		});
	}
}

export default TodoList
