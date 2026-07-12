import React from 'react';

// DUMMY DATA — replace with API call later
const testimonials = [
  {
    id: 't1',
    name: 'Priya S.',
    text: 'Loved my jewellery for the wedding look, quality exceeded expectations!',
  },
  {
    id: 't2',
    name: 'Ananya R.',
    text: 'Perfect for my Haldi look, got so many compliments and no tarnishing.',
  },
  {
    id: 't3',
    name: 'Kavya M.',
    text: 'Affordable and stylish, I keep coming back for every occasion.',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-card">
            <p>&ldquo;{t.text}&rdquo;</p>
            <span>— {t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
