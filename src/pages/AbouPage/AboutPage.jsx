import React from 'react';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

const AboutPage = () => {
  const points = [
    'Luxurious private jet experience',
    'Total commitment to safety',
    'Professional and experienced crew',
    'Flexible flight schedules',
    'Competitive pricing',
  ];
  const milestones = [
    { year: 2012, description: 'First Private Jet' },
    { year: 2016, description: 'The Certification 210' },
    { year: 2018, description: 'The Hall of Fame' },
    { year: 2023, description: 'Record 10,000th Flight' },
  ];
  const members = [
    { name: 'Helen Hilton', role: 'CEO', image: 'path/to/image' },
    { name: 'Alex Morne', role: 'Marketing Head', image: 'path/to/image' },
    { name: 'Robert Pattinson', role: 'Chief Pilot', image: 'path/to/image' },
  ];
  const feedbacks = [
    { name: 'Customer A', feedback: 'Excellent service!' },
    { name: 'Customer B', feedback: 'Very comfortable and punctual.' },
    { name: 'Customer C', feedback: 'Great experience overall.' },
  ];
  return (
    <>
      <Header />
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Private Jet Charters</h2>
          <p className="text-lg mb-8">Save your time and give more comfort.</p>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded">
            Call for Immediate Quotes
          </button>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Our Flynext?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {points.map((point, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded">
                <h3 className="text-xl font-bold mb-4">{point}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Makes Us Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded">
                <h3 className="text-xl font-bold mb-4">{milestone.year}</h3>
                <p>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet Our Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Customer Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded">
                <p className="italic">"{feedback.feedback}"</p>
                <p className="font-bold mt-4">- {feedback.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
