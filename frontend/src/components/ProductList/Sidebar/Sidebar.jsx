import { BsArrowLeft, BsFilter } from "react-icons/bs";
import Category from "../Category/Category";
import Price from "../Price/Price";
import "./Sidebar.css";

const Sidebar = ({ handleChange, ShowProductFilterSidebar, setShowProductFilterSidebar }) => {
  return (
    <>
      <section className={`products-sidebar ${ShowProductFilterSidebar && 'show-nav'}`}>
        <div className="logo-container">
          {ShowProductFilterSidebar ? <BsArrowLeft size={28} onClick={(e) => setShowProductFilterSidebar(false)} /> : <BsFilter size={28} />}
          Filters Products
        </div>
        <Category handleChange={handleChange} />
        <Price handleChange={handleChange} />
        {/* <Colors handleChange={handleChange} /> */}
      </section>
    </>
  );
};

export default Sidebar;