import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/NavBar';
import newBlog from './components/newBlog';
import SingleBlog from './components/SingleBlog'


class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = { blogs: [] };
	}

	async componentDidMount() {
		try {
			let r = await fetch('/api/blogs');
			let blogs = await r.json();
			this.setState({ blogs });
		} catch (error) {
			console.log(error);
		}
	};

	render() {

		return (
			<main className="container my-5">
				<h1 className="text-primary text-center">3LOGGER!</h1>
				<ul className="list-group">
					<Router>
						<Navbar />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/blogs/add" component={newBlog} />
							<Route exact path="/blogs/:id/" component={SingleBlog} />
						</Switch>
					</Router>
				</ul>
			</main>
		);
	}
}

export interface IAppProps { }

export interface IAppState {
	blogs: Array<{ id: number, title: string, body: string, author: string }>;
}

export default App;