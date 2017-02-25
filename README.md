# README

## Summary

This Demo tries to show a simple utilization of the Pitch F/X database to compare two pitcher's pitch-type selections as well as location given a specific game situation (X outs, Y strikes, Z balls). 

There is a simple Pitcher and PitchEvent model in Rails to provide the relationship, along with a single controller for the event list AJAX query.

The UI is a single-page React application using Highchart.js for the Scatter plot and Pie charts.

## Getting Started
> * bundle/install
* rake db:create
* rake db:migrate
* rake db:seed
* rails s

This assumes you have Postgres running locally with a 'postgres' user with 'password'. 

## To Use
The App loads initially in a blank state. To select a batter situation click the desired Ball, Strike, or Out indicators and the UI will update automatically.

Each indicator can be cleared by clicking 'clear' to the respective section's right.

A live demo can be found at http://pure-shore-4802.herokuapp.com/

## Room for improvement
Normally I would build the ReactJS components outside the Rails pipeline and stick to an independent Babel / Webpack process. In this case I was curious about how the Rails pipeline was working with webpack these days, and time constraints didn't allow for a more complex pipeline.
As far as Rails with Webpack:
* Support for the ES6 arrow operator is limited, so I have to use .bind(this) in many areas.
* Can't use NPM and selective Imports
* Limited to the pipeline version of JS assets, as compared to the NPM react-specific libraries ... for Highchart this was an annoyance.

I wanted to stick to things I was mostly familiar with, thus a Rails app with a React frontend. Realistically this wouldn't require a Rails app - or I would use a Rails setup that was a bit more planned. For example I wanted to split Pitch Events by game as well as season. I also don't have any real tests but in any actual production application we wouldn't consider it finished unless our controller endpoints and any model logic had unit test coverage at a minimum.

For the frontend if I made it any more complex I would want to incorporate Redux for smarter handling of global state as well as cleaner action dispatches. With something this simple I was comfortable having a single container component with controlled sub-components via-props, but more changes would definitely start to make comprehension more difficult. Furthermore using Redux would help to make the various controls more testable.

## Features to add
* It would be interesting to see pitch location and selection when controlling for Batter handedness - but I don't believe that was included in the data set.

* I also wanted to include the ability to choose time-through-the-order or at the very-least the particular inning.

* Select multiple situations rather than a single Ball-Strike-Out combination

* Show event outcomes in addition to pitch-selection. e.g Which pitches resulted in outs, or strikes more often.
