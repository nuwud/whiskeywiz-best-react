import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

function HomePage() {
  const [activeQuarter, setActiveQuarter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the active quarter
        const quartersQuery = query(
          collection(db, 'quarters'),
          where('active', '==', true),
          orderBy('releaseDate', 'desc'),
          limit(1)
        );
        const quartersSnapshot = await getDocs(quartersQuery);
        
        if (!quartersSnapshot.empty) {
          const quarterData = {
            id: quartersSnapshot.docs[0].id,
            ...quartersSnapshot.docs[0].data()
          };
          setActiveQuarter(quarterData);
        }

        // Sample testimonials (in a real app, these would come from the database)
        setTestimonials([
          {
            id: 1,
            name: 'Alex Thompson',
            text: 'WhiskeyWiz helped me identify my whiskey preferences. I discovered that I have a preference for smoky Islay scotches!',
            rating: 5,
          },
          {
            id: 2,
            name: 'Jessica Wong',
            text: 'The blind tasting game is so much fun at parties. My friends and I look forward to each new quarterly selection.',
            rating: 4,
          },
          {
            id: 3,
            name: 'Michael Rodriguez',
            text: 'Great way to expand your palate. I've learned to identify subtle notes that I never noticed before.',
            rating: 5,
          },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-amber-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Train Your Whiskey Palate</h1>
          <p className="text-xl mb-8">Test your sensory skills and discover new whiskeys with our interactive tasting game</p>
          <Link
            to={activeQuarter ? `/game/${activeQuarter.id}` : '/game'}
            className="btn btn-primary text-lg px-8 py-3"
          >
            Start Tasting Now
          </Link>
          
          {activeQuarter && (
            <div className="mt-8 inline-block bg-amber-700 px-4 py-2 rounded-full">
              <span className="font-bold">Current Selection:</span> {activeQuarter.name} - Released {new Date(activeQuarter.releaseDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How WhiskeyWiz Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-amber-700 text-4xl mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Subscribe to a Quarter</h3>
              <p className="text-gray-600">Receive a selection of mystery whiskey samples delivered to your door every quarter.</p>
            </div>
            
            <div className="card text-center">
              <div className="text-amber-700 text-4xl mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Blind Taste Test</h3>
              <p className="text-gray-600">Analyze each sample and log your observations about type, flavor, region, and more.</p>
            </div>
            
            <div className="card text-center">
              <div className="text-amber-700 text-4xl mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Learn & Compare</h3>
              <p className="text-gray-600">See how your palate stacks up against others and discover what your preferences reveal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Whiskey Wizards Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-bold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Challenge Your Palate?</h2>
          <p className="text-xl mb-8">Join the community of whiskey enthusiasts and start your tasting journey today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn bg-white text-amber-800 hover:bg-gray-100 text-lg px-8 py-3">
              Sign Up Now
            </Link>
            <Link to="/game" className="btn border-2 border-white text-white hover:bg-amber-800 text-lg px-8 py-3">
              Try a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;