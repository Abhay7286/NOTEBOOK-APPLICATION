import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

const About = (props) => {

  return (
    <>
      <div className="container">
        <AddNote showAlert={showAlert}/>
      </div>

      <div className="container">
        <Notes showAlert={showAlert}/>
      </div>
    </>
  );
}

export default About;
