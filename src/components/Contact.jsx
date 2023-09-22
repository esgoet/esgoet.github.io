import React, {useState, useRef} from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { SatelliteCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn, textVariant } from '../utils/motion';


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e;
    setForm({
      ...form, 
      [name]: value
    });

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //template id from email js: template_hn5qowi
    //service id from email.js: service_28abtbq
    //api key from email.js: qbyhQVnAB6vPZ1ifL

    emailjs
      .send(
        "service_28abtbq",
        "template_hn5qowi",
        {
          from_name: form.name,
          to_name: "Eva Goetzke",
          from_email: form.email,
          to_email: "eva.goetzke@gmail.com",
          message: form.message,
        },
        "api_key_qbyhQVnAB6vPZ1ifL"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.log(error);
          alert("Oh no, something went wrong. Please try again!");
          setLoading(false);
        }
      );
  }

  return (
    <div className="xl:flex-row flex-col-reverse flex gap-10 overflow-hidden pb-10">
      <div className="flex-[0.75]">
        <div>
          {/* <motion.div variants={textVariant()}> */}
          <p className={styles.sectionSubText}>Get in touch</p>
          <h2 className={styles.sectionHeadText}>Contact.</h2>
          {/* </motion.div> */}
        </div>

        <div>
          {/* <motion.div variants={slideIn("left", "tween", 0.2, 1)}> */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-black-200/50 p-8 rounded-2xl border-none"
          >
            <label className="flex flex-col">
              <span className="text-tertiary font-medium mb-2">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-tertiary font-medium mb-2">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-tertiary font-medium mb-2">
                Your Message
              </span>
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
              />
            </label>
            <button
              type="submit"
              className="bg-tertiary hover:text-primary hover:bg-black-200 py-3 px-10 outline-none w-fit text-black-100 font-bold
            shadow-mg shadow-primary rounded-xl self-end"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
          {/* </motion.div> */}
        </div>
      </div>
      <div className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        {/* <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
          > */}
        <SatelliteCanvas />
        {/* </motion.div> */}
      </div>
    </div>
  );
}

export default SectionWrapper(Contact, 'contact')