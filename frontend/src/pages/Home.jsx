import { useState } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import CustomerReviews from "../components/CustomerReviews";
import FAQ from "../components/FAQ";
import HaveAQuestion from "../components/HaveAQuestion";
import Chatbot from "../components/Chatbot";
import GoToTop from "../components/GoToTop";
import PreLoader from "../components/PreLoader";
import CalculatePrice from "../components/CalculatePrice";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <div>
      <PreLoader />
      <Hero />
      <Services />
      <CalculatePrice />
      <WhyChooseUs />
      <CustomerReviews />
      <HaveAQuestion />
      <FAQ toggleChatbox={toggleChatbox} />
      <Chatbot isOpen={isChatOpen} toggleChatbox={toggleChatbox}/>
      <GoToTop />
    </div>
  );
}