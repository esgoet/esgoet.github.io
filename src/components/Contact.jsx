import {useState, useRef} from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { SatelliteCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn, textVariant } from '../utils/motion';

 const Input = (props) => (
   <input
     type={props.type}
     name={props.name}
     id={props.name}
     onChange={props.handleChange}
     placeholder={props.placeholder}
     className={props.className}
   />
 );

 const Textarea = (props) => (
   <textarea
     rows="5"
     name={props.name}
     id={props.name}
     onChange={props.handleChange}
     placeholder={props.placeholder}
     className={props.className}
   />
 );

const ContactFormElement = (
 props
) => {
  const elementClasses =
    "bg-primary py-3 sm:py-4 px-3 sm:px-6 placeholder:text-secondary text-white-100 rounded-lg outlined-none border-none font-medium z-30";

  return (
    <label htmlFor={props.name} className="flex flex-col">
      <span className="text-tertiary font-medium mb-1 sm:mb-2">{props.label}</span>
      {props.type === "textarea" ? (
        <Textarea {...props} className={elementClasses} />
      ) : (
        <Input {...props} className={elementClasses} />
      )}
    </label>
  );
};


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form, 
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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
        "qbyhQVnAB6vPZ1ifL"
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
    <>
      {/* <div> */}
      <motion.div variants={textVariant()} className="mt-8 2xl:mt-0 2xl:place-self-start">
        <p className="sectionSubText">Get in touch</p>
        <h2 className="sectionHeadText">Contact.</h2>
      </motion.div>
      {/* </div> */}
      <div className="flex lg:flex-row flex-col-reverse justify-between w-full items-center 2xl:place-self-start">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="lg:max-w-[70vw] w-full min-w-[35vw] lg:w-1/2"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-black-100/50 p-8 rounded-2xl border-none"
          >
            <ContactFormElement
              label={"Your Name"}
              placeholder={"What's your name?"}
              handleChange={handleChange}
              name={"name"}
              type={"text"}
            />
            <ContactFormElement
              label={"Your Email"}
              placeholder={"What's your email?"}
              handleChange={handleChange}
              name={"email"}
              type={"email"}
            />
            <ContactFormElement
              label={"Your Message"}
              placeholder={"What's your message?"}
              handleChange={handleChange}
              name={"message"}
              type={"textarea"}
            />
            <button
              type="submit"
              className="bg-tertiary hover:text-primary hover:bg-black-300 py-2 px-6 sm:py-3 sm:px-10 outline-none w-fit text-black-200 font-bold
            shadow-mg shadow-primary rounded-xl self-end"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 h-[300px] sm:h-[500px] mx-auto sm:m-0"
        >
          <SatelliteCanvas />
        </motion.div>
        {/* </div> */}
      </div>
    </>
  );
}

export default SectionWrapper(Contact, 'contact')