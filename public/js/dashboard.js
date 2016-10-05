import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class Dashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            totalItems: 0,
            completedItems: 0,
            activeItems: 0
        };
    }
    componentWillMount(){
		this.fetchList();
    }
	render() {
		return (
			<div>
                <h1>Overview</h1>
                <ul className="list-group">
                    <li>Total list items: {this.state.totalItems}</li>
                    <li>Completed items: {this.state.completedItems}</li>
                    <li>Active items: {this.state.activeItems}</li>
                </ul>
                <nav>
                    <Link to={{pathname: '/items', query:{list: 'all'}}}>Open list</Link><br/>
                    <Link to={{pathname: '/items', query:{list: 'completed'}}}>Completed list</Link><br/>
                    <Link to={{pathname: '/items', query:{list: 'active'}}}>Active list</Link><br/>
                    <Link to="/additem">Add item</Link><br/>
                </nav>
			</div>
		);
	}
	fetchList(){
		axios.get('http://localhost:5000/items')
		.then(res => {
			res.data.forEach(item => item.key = item._id);
			this.setState({
                totalItems: res.data.length,
				completedItems: (res.data.filter(function(item){
                    return item.complete === true;
                })).length,
				activeItems: (res.data.filter(function(item){
                    return item.complete === false;
                })).length
			});
		})
		.catch(err => console.error(err));
	}
}

export default Dashboard
