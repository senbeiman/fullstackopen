import React from "react";
import ReactDOM from "react-dom";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescription {
  name: "exercises";
  teacher: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "exercises",
    exerciseCount: 5,
    description: "exercises for typescript",
    teacher: "Yoshi"
  }
];

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  )
};
const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <div>
    {courseParts.map( p => (
      <Part key={p.name} coursePart={p}/>
    ))}
  </div>
);
const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => (
  <p key={coursePart.name}>
    {coursePart.name} {coursePart.exerciseCount}
    {(() => {switch(coursePart.name) {
      case 'Fundamentals':
        return (<> {coursePart.description}</>) 
      case 'Using props to pass data':
        return (<> {coursePart.groupProjectCount}</>) 
      case 'Deeper type usage':
        return (<> {coursePart.description} {coursePart.exerciseSubmissionLink}</>)
      case 'exercises':
        return (<> {coursePart.description} {coursePart.teacher}</>)
    }})()}
  </p>
)
const Total: React.FC<{ total: number }> = ({ total }) => (
  <p>
    Number of exercises{' '}   
    {total}
  </p>
);

ReactDOM.render(<App />, document.getElementById("root"));