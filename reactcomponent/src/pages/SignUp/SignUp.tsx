import React, { useState } from "react";
import styles from "./Signup.module.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

 const validateForm = () => {
  let valid = true;
  const newErrors = {
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  };

 
  // Full Name
  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required";
    valid = false;
  }

  // Email
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Please enter a valid email";
    valid = false;
  }

  // Phone
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
    valid = false;
  } else if (!/^\d{10}$/.test(formData.phone)) {
    newErrors.phone = "Phone must be 10 digits";
    valid = false;
  }

  // Gender
  if (!formData.gender) {
    newErrors.gender = "Gender is required";
    valid = false;
  }

  // Date of Birth
  if (!formData.dob) {
    newErrors.dob = "Date of birth is required";
    valid = false;
  }

  // Country
  if (!formData.country) {
    newErrors.country = "Country is required";
    valid = false;
  }

  // Password
  if (!formData.password) {
    newErrors.password = "Password is required";
    valid = false;
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
    valid = false;
  }

  // Confirm Password
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
    valid = false;
  }

  // Terms & Conditions
  if (!formData.agreeTerms) {
    newErrors.agreeTerms = "You must accept the terms and conditions";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    setIsSubmitting(true);

    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Account created successfully") {
          setSuccessMessage(data.msg);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            gender: "",
            dob: "",
            country: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
          });
          setErrors({
            fullName: "",
            email: "",
            phone: "",
            gender: "",
            dob: "",
            country: "",
            password: "",
            confirmPassword: "",
            agreeTerms: "",
          });
        } else {
          alert(data.msg || "Something went wrong.");
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Signup error:", error);
        alert("Signup failed. Try again later.");
        setIsSubmitting(false);
      });
  }
};



  return (
    <div className={styles.signupContainer}>
      <div className={styles.splitLayout}>
        {/* Left Side - Content */}
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <h2>Welcome to Our Platform</h2>
            <p>
              Join thousands of users who are already benefiting from our
              services.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>Instant access to premium features</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>24/7 customer support</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span>Secure data protection</span>
              </div>
            </div>

            <div className={styles.illustration}>
              <img
                src="https://illustrations.popsy.co/amber/digital-nomad.svg"
                alt="Signup Illustration"
                className={styles.illustrationImage}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.rightSide}>
          <div className={styles.formContainer}>
            <div className={styles.signupCard}>
              <div className={styles.signupHeader}>
                <h2>Create Account</h2>
                <p>Get started in just a few seconds</p>
              </div>

              {successMessage && (
                <div className={styles.successMessage}>{successMessage}</div>
              )}

              <form onSubmit={handleSubmit} className={styles.signupForm}>
               
                {/* Full Name */}
                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <FaUser className={styles.inputIcon} />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.fullName ? styles.inputError : ""
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <span className={styles.errorText}>{errors.fullName}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <FaEnvelope className={styles.inputIcon} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.phone ? styles.inputError : ""
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <span className={styles.errorText}>{errors.phone}</span>
                  )}
                </div>

                {/* Gender */}
                <div className={styles.formGroup}>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`${styles.formInput} ${
                      errors.gender ? styles.inputError : ""
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className={styles.errorText}>{errors.gender}</span>
                  )}
                </div>

                {/* Date of Birth */}
                <div className={styles.formGroup}>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`${styles.formInput} ${
                      errors.dob ? styles.inputError : ""
                    }`}
                  />
                  {errors.dob && (
                    <span className={styles.errorText}>{errors.dob}</span>
                  )}
                </div>

                {/* Country */}
                <div className={styles.formGroup}>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`${styles.formInput} ${
                      errors.country ? styles.inputError : ""
                    }`}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Australia">Australia</option>
                    {/* Add more as needed */}
                  </select>
                  {errors.country && (
                    <span className={styles.errorText}>{errors.country}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <FaEnvelope className={styles.inputIcon} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.email ? styles.inputError : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <FaLock className={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.password ? styles.inputError : ""
                      }`}
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className={styles.errorText}>{errors.password}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <FaLock className={styles.inputIcon} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`${styles.formInput} ${
                        errors.confirmPassword ? styles.inputError : ""
                      }`}
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className={styles.errorText}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
                {/* Terms and Conditions */}
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agreeTerms: e.target.checked,
                        })
                      }
                    />
                    I agree to the <a href="/terms">Terms & Conditions</a>
                  </label>
                  {errors.agreeTerms && (
                    <span className={styles.errorText}>
                      {errors.agreeTerms}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>
              </form>

              <div className={styles.loginRedirect}>
                <p>
                  Already have an account? <a href="/login">Log in</a>
                </p>
              </div>

              <div className={styles.socialSignup}>
                <div className={styles.divider}>
                  <span>OR</span>
                </div>
                <div className={styles.socialIcons}>
                  <div
                    style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}
                  >
                    <FaGoogle
                      className={styles.socialButton}
                      style={{ color: "#DB4437" }}
                    />
                    <FaFacebookF
                      className={styles.socialButton}
                      style={{ color: "#1877F2" }}
                    />
                    <FaTwitter
                      className={styles.socialButton}
                      style={{ color: "#1DA1F2" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
