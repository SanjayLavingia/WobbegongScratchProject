import React, { Component } from 'react';
import CategoriesContainer from './containers/CategoriesContainer.jsx';
import ResultsContainer from './containers/ResultsContainer.jsx';

import './styles.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //results from server
            results: [],
            optionCategory: ["Games", "Arts and culture", "Outdoor", "Culinary"],
            optionDescription: ["Fun", "Adventure", "Relaxation", "Entertainment"],
            optionLocation: [
                { city: "Arts District", zipcode: 90013 },
                { city: "Beverly Hills", zipcode: 90210 },
                { city: "Burbank", zipcode: 91505 },
                { city: "Culver City", zipcode: 90232 },
                { city: "DTLA", zipcode: 90017 },
                { city: "Glendale", zipcode: 91204 },
                { city: "Hollywood", zipcode: 90028 },
                { city: "Koreatown", zipcode: 90010 },
                { city: "Los Feliz", zipcode: 90027 },
                { city: "Mid City", zipcode: 90019 },
                { city: "NoHo", zipcode: 91606 },
                { city: "Santa Monica", zipcode: 90401 },
                { city: "Sherman Oaks", zipcode: 91403 },
                { city: "Silverlake", zipcode: 90026 },
                { city: "Studio City", zipcode: 91604 },
                { city: "Venice", zipcode: 90292},
                { city: "WeHo", zipcode: 90069 },
            ],
            dateType: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.randomize = this.randomize.bind(this);
    }

    randomize() {
        // grab one random category
        const category = this.state.optionCategory[Math.floor(Math.random() * this.state.optionCategory.length)];
        const description = this.state.optionDescription[Math.floor(Math.random() * this.state.optionDescription.length)];
        // one random description
        this.setState({
            dateType: `${category},${description}`
        });

    }

    handleSubmit(e) {
        e.preventDefault();
        const categories = `${this.state.dateType}`;
        const location = e.target.location.value;
        if (location === "Select one..."){
            return;
        }
        console.log(location, 'location')
        fetch(`/api/search/yelp/${categories}/${location}`)
            .then((data) => data.json())
            .then((jsonData) => {
                this.setState({
                    results: jsonData
                })
            })
            .catch((err) => {
                console.log("ERROR IN CATCH OF ADD RESULTS", err)
            })
    }

    render() {
        return (
            <div>
                <h1 className="title">Lazy Date</h1>
                <CategoriesContainer handleSubmit={this.handleSubmit} optionLocation={this.state.optionLocation} optionDescription={this.state.optionDescription} randomize={this.randomize} dateType={this.state.dateType} />
                <ResultsContainer results={this.state.results} />
            </div>
        )
    }
}

export default App;