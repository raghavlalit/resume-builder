import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, submitResume, getResumeInfo } from '../utils/api';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    // User Profile
    profile: {
      dateOfBirth: '',
      gender: '',
      currentSalary: '',
      isAnnually: '0',
      countryId: '',
      stateId: '',
      cityId: '',
      zipcode: '',
      address: ''
    },
    // Education
    education: [{
      degreeName: '',
      instituteName: '',
      startDate: '',
      endDate: '',
      percentage: '',
      cgpa: ''
    }],
    // Experience
    experience: [{
      companyName: '',
      jobTitle: '',
      isCurrentJob: 0,
      startDate: '',
      endDate: '',
      description: '',
      countryId: '',
      stateId: '',
      cityId: ''
    }],
    // Skills
    skills: []
  });

  // Sample data for dropdowns (replace with API calls)
  const [dropdownData, setDropdownData] = useState({
    countries: [
      { id: 1, name: 'United States' },
      { id: 2, name: 'Canada' },
      { id: 3, name: 'United Kingdom' }
    ],
    states: [
      { id: 1, name: 'California', countryId: 1 },
      { id: 2, name: 'New York', countryId: 1 },
      { id: 3, name: 'Ontario', countryId: 2 }
    ],
    cities: [
      { id: 1, name: 'Los Angeles', stateId: 1 },
      { id: 2, name: 'San Francisco', stateId: 1 },
      { id: 3, name: 'New York City', stateId: 2 }
    ],
    skills: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React' },
      { id: 3, name: 'Node.js' },
      { id: 4, name: 'Python' },
      { id: 5, name: 'Java' },
      { id: 6, name: 'SQL' },
      { id: 7, name: 'HTML/CSS' },
      { id: 8, name: 'Git' },
      { id: 9, name: 'TypeScript' },
      { id: 10, name: 'Angular' },
      { id: 11, name: 'Vue.js' },
      { id: 12, name: 'PHP' },
      { id: 13, name: 'C#' },
      { id: 14, name: 'Ruby' },
      { id: 15, name: 'Go' }
    ]
  });

  useEffect(() => {
    const userSession = getSession();
    if (!userSession.isLoggedIn) {
      navigate('/login');
      return;
    }
    setSession(userSession);
    fetchResumeData(userSession.user.user_id);
  }, [navigate]);

  const fetchResumeData = async (userId) => {
    try {
      const response = await getResumeInfo(userId);
      if (response.data.success && response.data.data) {
        const resumeData = response.data.data.resume;
        
        // Update form data with existing resume information
        setFormData(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            ...resumeData.profile
          },
          education: resumeData.education && resumeData.education.length > 0 
            ? resumeData.education 
            : prev.education,
          experience: resumeData.experience && resumeData.experience.length > 0 
            ? resumeData.experience 
            : prev.experience,
          skills: resumeData.skills || []
        }));
      }
    } catch (error) {
      console.error('Error fetching resume data:', error);
    } finally {
      setFetching(false);
    }
  };

  // Validation functions
  const validateProfile = () => {
    const errors = {};
    const { profile } = formData;

    if (!profile.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!profile.gender) errors.gender = 'Gender is required';
    if (!profile.countryId) errors.countryId = 'Country is required';
    if (!profile.stateId) errors.stateId = 'State is required';
    if (!profile.zipcode) errors.zipcode = 'Zipcode is required';
    if (!profile.address) errors.address = 'Address is required';

    return errors;
  };

  const validateEducation = () => {
    const errors = {};
    const { education } = formData;

    if (education.length === 0) {
      errors.general = 'At least one education record is required';
      return errors;
    }

    education.forEach((edu, index) => {
      if (!edu.degreeName) errors[`degreeName_${index}`] = 'Degree name is required';
      if (!edu.instituteName) errors[`instituteName_${index}`] = 'Institute name is required';
      if (!edu.startDate) errors[`startDate_${index}`] = 'Start date is required';
      if (!edu.endDate) errors[`endDate_${index}`] = 'End date is required';
    });

    return errors;
  };

  const validateExperience = () => {
    const errors = {};
    const { experience } = formData;

    if (experience.length === 0) {
      errors.general = 'At least one experience record is required';
      return errors;
    }

    experience.forEach((exp, index) => {
      if (!exp.companyName) errors[`companyName_${index}`] = 'Company name is required';
      if (!exp.jobTitle) errors[`jobTitle_${index}`] = 'Job title is required';
      if (!exp.startDate) errors[`startDate_${index}`] = 'Start date is required';
      if (exp.isCurrentJob === 0 && !exp.endDate) {
        errors[`endDate_${index}`] = 'End date is required for non-current jobs';
      }
    });

    return errors;
  };

  const validateSkills = () => {
    const errors = {};
    const { skills } = formData;

    if (skills.length === 0) {
      errors.skills = 'At least one skill is required';
    }

    return errors;
  };

  const validateCurrentStep = () => {
    let errors = {};

    switch (currentStep) {
      case 1:
        errors = validateProfile();
        break;
      case 2:
        errors = validateEducation();
        break;
      case 3:
        errors = validateExperience();
        break;
      case 4:
        errors = validateSkills();
        break;
      default:
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
    // Clear validation error for this field
    const errorKey = `${field}_${index}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => ({
        ...prev,
        [errorKey]: undefined
      }));
    }
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        degreeName: '',
        instituteName: '',
        startDate: '',
        endDate: '',
        percentage: '',
        cgpa: ''
      }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      experience: updatedExperience
    }));
    // Clear validation error for this field
    const errorKey = `${field}_${index}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => ({
        ...prev,
        [errorKey]: undefined
      }));
    }
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        companyName: '',
        jobTitle: '',
        isCurrentJob: 0,
        startDate: '',
        endDate: '',
        description: '',
        countryId: '',
        stateId: '',
        cityId: ''
      }]
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSkillSelect = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }));
    // Clear validation error
    if (validationErrors.skills) {
      setValidationErrors(prev => ({
        ...prev,
        skills: undefined
      }));
    }
  };

  const removeSkill = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(id => id !== skillId)
    }));
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        setValidationErrors({});
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await submitResume({
        requested_user_id: session.user.user_id,
        user_id: session.user.user_id,
        profile: formData.profile,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills
      });

      if (response.data.success) {
        // alert('Resume saved successfully!');
        navigate('/');
      } else {
        setError(response.data.message || 'Failed to save resume');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!session || fetching) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your resume data...</p>
      </div>
    );
  }

  const getSelectedSkills = () => {
    return dropdownData.skills.filter(skill => formData.skills.includes(skill.id));
  };

  return (
    <div className="resume-builder">
      <div className="container">
        <div className="builder-header">
          <h1>Build Your Resume</h1>
          <p>Complete your profile to create a professional resume</p>
        </div>

        <div className="progress-bar">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Profile</span>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Education</span>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Experience</span>
          </div>
          <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Skills</span>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-container">
          {/* Step 1: User Profile */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.profile.dateOfBirth}
                    onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                    className={validationErrors.dateOfBirth ? 'error' : ''}
                  />
                  {validationErrors.dateOfBirth && (
                    <span className="error-text">{validationErrors.dateOfBirth}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    value={formData.profile.gender}
                    onChange={(e) => handleProfileChange('gender', e.target.value)}
                    className={validationErrors.gender ? 'error' : ''}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {validationErrors.gender && (
                    <span className="error-text">{validationErrors.gender}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Current Salary</label>
                  <input
                    type="number"
                    value={formData.profile.currentSalary}
                    onChange={(e) => handleProfileChange('currentSalary', e.target.value)}
                    placeholder="Enter your current salary"
                  />
                </div>

                <div className="form-group">
                  <label>Salary Type</label>
                  <select
                    value={formData.profile.isAnnually}
                    onChange={(e) => handleProfileChange('isAnnually', e.target.value)}
                  >
                    <option value="0">Monthly</option>
                    <option value="1">Annually</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Country *</label>
                  <select
                    value={formData.profile.countryId}
                    onChange={(e) => handleProfileChange('countryId', e.target.value)}
                    className={validationErrors.countryId ? 'error' : ''}
                  >
                    <option value="">Select Country</option>
                    {dropdownData.countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {validationErrors.countryId && (
                    <span className="error-text">{validationErrors.countryId}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <select
                    value={formData.profile.stateId}
                    onChange={(e) => handleProfileChange('stateId', e.target.value)}
                    className={validationErrors.stateId ? 'error' : ''}
                  >
                    <option value="">Select State</option>
                    {dropdownData.states
                      .filter(state => !formData.profile.countryId || state.countryId == formData.profile.countryId)
                      .map(state => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                  </select>
                  {validationErrors.stateId && (
                    <span className="error-text">{validationErrors.stateId}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>City</label>
                  <select
                    value={formData.profile.cityId}
                    onChange={(e) => handleProfileChange('cityId', e.target.value)}
                  >
                    <option value="">Select City</option>
                    {dropdownData.cities
                      .filter(city => !formData.profile.stateId || city.stateId == formData.profile.stateId)
                      .map(city => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Zipcode *</label>
                  <input
                    type="text"
                    value={formData.profile.zipcode}
                    onChange={(e) => handleProfileChange('zipcode', e.target.value)}
                    placeholder="Enter zipcode"
                    className={validationErrors.zipcode ? 'error' : ''}
                  />
                  {validationErrors.zipcode && (
                    <span className="error-text">{validationErrors.zipcode}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Address *</label>
                  <textarea
                    value={formData.profile.address}
                    onChange={(e) => handleProfileChange('address', e.target.value)}
                    placeholder="Enter your full address"
                    rows="3"
                    className={validationErrors.address ? 'error' : ''}
                  />
                  {validationErrors.address && (
                    <span className="error-text">{validationErrors.address}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Education Details</h2>
              {validationErrors.general && (
                <div className="error-message">{validationErrors.general}</div>
              )}
              {formData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="item-header">
                    <h3>Education #{index + 1}</h3>
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Degree Name *</label>
                      <input
                        type="text"
                        value={edu.degreeName}
                        onChange={(e) => handleEducationChange(index, 'degreeName', e.target.value)}
                        placeholder="e.g., Bachelor of Science in Computer Science"
                        className={validationErrors[`degreeName_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`degreeName_${index}`] && (
                        <span className="error-text">{validationErrors[`degreeName_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Institute Name *</label>
                      <input
                        type="text"
                        value={edu.instituteName}
                        onChange={(e) => handleEducationChange(index, 'instituteName', e.target.value)}
                        placeholder="e.g., University of California"
                        className={validationErrors[`instituteName_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`instituteName_${index}`] && (
                        <span className="error-text">{validationErrors[`instituteName_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Start Date *</label>
                      <input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        className={validationErrors[`startDate_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`startDate_${index}`] && (
                        <span className="error-text">{validationErrors[`startDate_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>End Date *</label>
                      <input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        className={validationErrors[`endDate_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`endDate_${index}`] && (
                        <span className="error-text">{validationErrors[`endDate_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Percentage (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={edu.percentage}
                        onChange={(e) => handleEducationChange(index, 'percentage', e.target.value)}
                        placeholder="e.g., 85.5"
                      />
                    </div>

                    <div className="form-group">
                      <label>CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        value={edu.cgpa}
                        onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                        placeholder="e.g., 3.8"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addEducation} className="add-btn">
                + Add Another Education
              </button>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Work Experience</h2>
              {validationErrors.general && (
                <div className="error-message">{validationErrors.general}</div>
              )}
              {formData.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="item-header">
                    <h3>Experience #{index + 1}</h3>
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Company Name *</label>
                      <input
                        type="text"
                        value={exp.companyName}
                        onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                        placeholder="e.g., Google Inc."
                        className={validationErrors[`companyName_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`companyName_${index}`] && (
                        <span className="error-text">{validationErrors[`companyName_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Job Title *</label>
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                        placeholder="e.g., Senior Software Engineer"
                        className={validationErrors[`jobTitle_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`jobTitle_${index}`] && (
                        <span className="error-text">{validationErrors[`jobTitle_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Start Date *</label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className={validationErrors[`startDate_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`startDate_${index}`] && (
                        <span className="error-text">{validationErrors[`startDate_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>End Date *</label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        disabled={exp.isCurrentJob === 1}
                        className={validationErrors[`endDate_${index}`] ? 'error' : ''}
                      />
                      {validationErrors[`endDate_${index}`] && (
                        <span className="error-text">{validationErrors[`endDate_${index}`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Current Job *</label>
                      <select
                        value={exp.isCurrentJob}
                        onChange={(e) => handleExperienceChange(index, 'isCurrentJob', parseInt(e.target.value))}
                      >
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Country</label>
                      <select
                        value={exp.countryId}
                        onChange={(e) => handleExperienceChange(index, 'countryId', e.target.value)}
                      >
                        <option value="">Select Country</option>
                        {dropdownData.countries.map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      <select
                        value={exp.stateId}
                        onChange={(e) => handleExperienceChange(index, 'stateId', e.target.value)}
                      >
                        <option value="">Select State</option>
                        {dropdownData.states
                          .filter(state => !exp.countryId || state.countryId == exp.countryId)
                          .map(state => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>City</label>
                      <select
                        value={exp.cityId}
                        onChange={(e) => handleExperienceChange(index, 'cityId', e.target.value)}
                      >
                        <option value="">Select City</option>
                        {dropdownData.cities
                          .filter(city => !exp.stateId || city.stateId == exp.stateId)
                          .map(city => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label>Job Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addExperience} className="add-btn">
                + Add Another Experience
              </button>
            </div>
          )}

          {/* Step 4: Skills */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Skills</h2>
              <p>Select the skills that apply to you:</p>
              
              <div className="form-group">
                <label>Select Skills *</label>
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleSkillSelect(parseInt(e.target.value));
                      e.target.value = '';
                    }
                  }}
                  className={validationErrors.skills ? 'error' : ''}
                >
                  <option value="">Choose a skill to add...</option>
                  {dropdownData.skills
                    .filter(skill => !formData.skills.includes(skill.id))
                    .map(skill => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                </select>
                {validationErrors.skills && (
                  <span className="error-text">{validationErrors.skills}</span>
                )}
              </div>

              {formData.skills.length > 0 && (
                <div className="selected-skills">
                  <h3>Selected Skills:</h3>
                  <div className="skills-tags">
                    {getSelectedSkills().map(skill => (
                      <span key={skill.id} className="skill-tag">
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill.id)}
                          className="remove-skill"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Saving...' : 'Save Resume'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 