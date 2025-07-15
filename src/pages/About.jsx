import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About EasyCVCraft</h1>
          <p>Empowering job seekers to create professional resumes that stand out</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>At EasyCVCraft, we believe that everyone deserves the opportunity to present themselves professionally in the job market. Our mission is to democratize access to professional resume creation tools, making it easy for job seekers of all backgrounds to create compelling resumes that get them noticed by employers.</p>
            
            <p>We understand that the job application process can be overwhelming, and a well-crafted resume is often the first step toward landing your dream job. That's why we've built a platform that combines simplicity with sophistication, allowing users to create professional resumes without the need for design skills or expensive services.</p>
          </div>

          <div className="about-section">
            <h2>Our Story</h2>
            <p>EasyCVCraft was founded in 2020 by a team of HR professionals and software engineers who recognized the challenges that job seekers face in creating effective resumes. We noticed that many talented individuals were being overlooked simply because their resumes didn't effectively communicate their skills and experience.</p>
            
            <p>What started as a simple tool to help friends and colleagues has grown into a comprehensive platform used by thousands of job seekers worldwide. Our commitment to user experience, professional design, and ATS optimization has made us a trusted partner in the job search journey.</p>
          </div>

          <div className="about-section">
            <h2>What Sets Us Apart</h2>
            <div className="features-grid">
              <div className="feature">
                <h3>Professional Templates</h3>
                <p>Our templates are designed by HR professionals and are optimized to pass through Applicant Tracking Systems (ATS) while still looking great to human recruiters.</p>
              </div>
              
              <div className="feature">
                <h3>User-Friendly Interface</h3>
                <p>We've designed our platform to be intuitive and easy to use, regardless of your technical background. No design skills required!</p>
              </div>
              
              <div className="feature">
                <h3>ATS Optimization</h3>
                <p>All our templates and formatting are optimized to work seamlessly with Applicant Tracking Systems used by most companies.</p>
              </div>
              
              <div className="feature">
                <h3>Real-time Preview</h3>
                <p>See your changes instantly as you build your resume, ensuring you create exactly what you want before downloading.</p>
              </div>
              
              <div className="feature">
                <h3>Secure & Private</h3>
                <p>Your personal information is encrypted and secure. We never share your data with third parties.</p>
              </div>
              
              <div className="feature">
                <h3>Export Options</h3>
                <p>Download your resume in high-quality PDF format that looks perfect on any device or platform.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value">
                <h3>Accessibility</h3>
                <p>We believe that professional resume creation should be accessible to everyone, regardless of their background or budget.</p>
              </div>
              
              <div className="value">
                <h3>Quality</h3>
                <p>We maintain high standards in everything we do, from our templates to our user experience.</p>
              </div>
              
              <div className="value">
                <h3>Innovation</h3>
                <p>We continuously improve our platform based on user feedback and industry best practices.</p>
              </div>
              
              <div className="value">
                <h3>Privacy</h3>
                <p>We respect your privacy and ensure that your personal information is always protected.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Our Team</h2>
            <p>Our team consists of experienced HR professionals, software engineers, and designers who are passionate about helping job seekers succeed. We combine industry expertise with technical innovation to create the best possible resume building experience.</p>
            
            <p>We're constantly learning from our users and the broader HR community to ensure that EasyCVCraft remains at the forefront of resume creation technology.</p>
          </div>

          <div className="about-section">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you! Whether you have feedback, suggestions, or just want to say hello, we're here to help.</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <h4>Email</h4>
                <p>hello@easycvcraft.com</p>
              </div>
              
              <div className="contact-item">
                <h4>Support</h4>
                <p>support@easycvcraft.com</p>
              </div>
              
              <div className="contact-item">
                <h4>Business Inquiries</h4>
                <p>partnerships@easycvcraft.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 